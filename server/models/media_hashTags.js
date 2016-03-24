const db = require('./../db/database')

module.exports = {
  submitFeedback: (userId, mediaId, feedback) => {
    console.log('info', userId, mediaId, feedback);
    return (
      db.raw(`
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
            )
      `)

    )
  },
}