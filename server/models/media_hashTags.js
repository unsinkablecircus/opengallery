const db = require('./../db/database');
const format = require('pg-format');

module.exports = {
  submitFeedback: (userId, mediaId, feedback) => {
    var userId = format.literal(userId);
    var mediaId = format.literal(mediaId);
    var feedback = format.literal(feedback);

    return (
      db.raw(`
        WITH
          UserMedia AS (
            SELECT * FROM media_tags
            WHERE user_id = ${userId} 
            AND media_id = ${mediaId}
            AND tag_type = 'hashtag'
          )
          UPDATE media_hashtag_totals
            SET total = total - 1
            WHERE media_id = ${mediaId} 
            AND hashtag_id = (SELECT tag_id FROM UserMedia);
        WITH
          User_Media AS (
            SELECT * FROM media_tags
            WHERE user_id = ${userId} 
            AND media_id = ${mediaId}
            AND tag_type = 'hashtag'
          )
          UPDATE media_tag_totals
            SET total = total - 1
            WHERE media_id = ${mediaId} 
            AND tag_id = (SELECT tag_id FROM User_Media);

        WITH
        new_row AS (
          INSERT INTO tags (text)
          SELECT ${feedback}
          WHERE NOT EXISTS (SELECT * FROM tags WHERE text=${feedback})
          RETURNING *
        ),
        combine AS (
          SELECT * FROM new_row
          UNION
          SELECT * FROM tags WHERE text=${feedback}
        ),
        update_data AS (
          UPDATE media_tags
            SET tag_id = (SELECT id FROM combine)
          WHERE user_id = ${userId} 
            AND media_id = ${mediaId}
            AND tag_type = 'hashtag'
          RETURNING *
        ),
        update_hashtag_totals AS (
          UPDATE media_hashtag_totals
            SET total = total + 1
          WHERE hashtag_id = (SELECT id FROM combine) 
            AND media_id = ${mediaId}
         RETURNING *
        ),
        update_tag_totals AS (
          UPDATE media_tag_totals
            SET total = total + 1
          WHERE tag_id = (SELECT id FROM combine) 
            AND media_id = ${mediaId}
         RETURNING *
        ),
        insert_hashtag_totals AS (
          INSERT INTO media_hashtag_totals (media_id, hashtag_id, total)
          SELECT ${mediaId}, (SELECT id FROM combine), 1
          WHERE NOT EXISTS (
            SELECT * 
            FROM media_hashtag_totals
            WHERE media_id = ${mediaId} 
              AND hashtag_id = (SELECT id FROM combine)
          )
        ),
        insert_tag_totals AS (
          INSERT INTO media_tag_totals (media_id, tag_id, total)
          SELECT ${mediaId}, (SELECT id FROM combine), 1
          WHERE NOT EXISTS (
            SELECT * 
            FROM media_tag_totals
            WHERE media_id = ${mediaId} 
              AND tag_id = (SELECT id FROM combine)
          )
        )
        INSERT INTO media_tags (media_id, user_id, tag_id, tag_type)
          SELECT ${mediaId}, ${userId}, (SELECT id FROM combine), 'hashtag'
            WHERE NOT EXISTS (
              SELECT * FROM media_tags
              WHERE user_id = ${userId} 
                AND media_id = ${mediaId}
                AND tag_type = 'hashtag'
            );
        DELETE FROM media_hashtag_totals WHERE total = 0;
        DELETE FROM media_tag_totals WHERE total = 0;
        
        SELECT array_to_json(array_agg(row_to_json(f))) AS feedback
        FROM (
          SELECT mht.hashtag_id AS id, t.text AS tag, mht.total AS count
          FROM media_hashtag_totals mht
            INNER JOIN tags t
            ON t.id = mht.hashtag_id
          WHERE mht.media_id = ${mediaId}
        ) f;

        SELECT mt.tag_id AS user_feedback_id
        FROM media_tags mt
        WHERE mt.media_id = ${mediaId}
        AND mt.user_id = ${userId}
        AND tag_type = 'hashtag'
      `)
    )
  },
}