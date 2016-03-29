const db = require('./../db/database')

module.exports = {
  submitFeedback: (userId, mediaId, feedback) => {
    return (
      db.raw(`
        WITH
          UserMedia AS (
            SELECT * FROM media_hashtags
              WHERE (
                user_id = ${userId} AND media_id = ${mediaId}
              )
            )
          UPDATE media_hashtag_totals
            SET total = total - 1
            WHERE media_id = ${mediaId} AND hashtag_id = (SELECT hashtag_id FROM UserMedia);

        WITH
        new_row AS(
          INSERT INTO hashtags (hashtag_text)
          SELECT '${feedback}'
          WHERE NOT EXISTS (SELECT * FROM hashtags WHERE hashtag_text='${feedback}')
          RETURNING *
        ),
        combine AS (
          SELECT * FROM new_row
          UNION
          SELECT * FROM hashtags WHERE hashtag_text='${feedback}'
        ),
        upsert AS (
          UPDATE media_hashtags
              SET hashtag_id = (SELECT id FROM combine)
          WHERE user_id = ${userId} AND media_id=${mediaId}
          RETURNING *
        ),
        UpdateHashTagTotals AS (
          UPDATE media_hashtag_totals
              SET total = total + 1
              WHERE
                hashtag_id = (SELECT id FROM combine) AND media_id = ${mediaId}
         RETURNING *
        ),
        InsertHashTagTotals AS (
          INSERT INTO media_hashtag_totals (media_id, hashtag_id, total)
          SELECT ${mediaId}, (SELECT id FROM combine), 1
          WHERE NOT EXISTS (
            SELECT * FROM media_hashtag_totals
            WHERE (
              media_id = ${mediaId} AND
              hashtag_id = (SELECT id FROM combine)
            )
          )
        )
        INSERT INTO media_hashtags (media_id, user_id, hashtag_id)
          SELECT ${mediaId}, ${userId}, (SELECT id FROM combine)
            WHERE NOT EXISTS (
              SELECT * FROM media_hashtags
              WHERE (
                user_id = ${userId} AND
                media_id = ${mediaId}
              )
            );
        DELETE FROM media_hashtag_totals WHERE total = 0;

        SELECT array_to_json(array_agg(row_to_json(f))) AS feedback
        FROM (
          SELECT mht.hashtag_id AS id, h.hashtag_text AS tag, mht.total AS count
          FROM media_hashtag_totals mht
          INNER JOIN hashtags h
          ON h.id = mht.hashtag_id
          WHERE media_id = ${mediaId}
        ) f;

        SELECT mh.hashtag_id AS user_feedback_id
        FROM media_hashtags mh
        WHERE mh.media_id = ${mediaId}
        AND mh.user_id = ${userId}
      `)
    )
  },
}



/*
  Right now, the query will 1) Find the media hashtag id from the word (create it in the table if it doesn't already exist)
  Update what the user says about a picture in media_hashtags, if they said anything before
  Insert an entry into media media_hashtags, if they haven't said anything before
  Insert/Upate the media_hashtag_totals

  Problem is that there is no control in the media_hashtag_totals. With the current implementation, the user can only
  comment once on a picture
  So, I need to 1. check to see if the user has commented on this before.
    If so, find what he commented on before, decrement that value
    Increment the total count, if it exists in media_hashtag_totals
    If it does not exist, create a row in that table where the count is 1.

*/
