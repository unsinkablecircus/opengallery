const db = require('./../db/database')
const AWS = require('aws-sdk');

// load AWS credentials
const credentials = new AWS.SharedIniFileCredentials({profile: 'opengallery'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'us-west-1'});




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
        upsert as ( 
            update media_hashtags
                set hashtag_id = (SELECT id FROM combine)
            WHERE user_id = ${userId} AND media_id=${mediaId}
            RETURNING *
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

        RETURNING *
      `)
    )
  }

}

// if the user had commented on this picture before, then update the feedback
  // if they have not, insert
// when inserting into media_hashtags, check to see if an entry exists
// with a given userId and mediaId
