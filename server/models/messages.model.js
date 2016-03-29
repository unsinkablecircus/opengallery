const db = require('./../db/database')

module.exports = { 
  submitMessage: (message, user1_id, user2_id, time) => {
    console.log(message, user1_id, user2_id, time);
    return db.raw(`
          INSERT INTO conversations (user1_id, user2_id)
          SELECT ${user1_id}, ${user2_id}
          WHERE NOT EXISTS (
            SELECT * FROM conversations
            WHERE (
              user1_id = ${user1_id} AND
              user2_id = ${user2_id}
            )
            UNION
            SELECT * FROM conversations
            WHERE (
              user1_id = ${user2_id} AND
              user2_id = ${user1_id}
            )
          );
        INSERT INTO messages (conversation_id, message, sender_id, created_at)
          VALUES (
            (SELECT id FROM conversations WHERE (
            user1_id = ${user1_id} AND user2_id = ${user2_id} 
            OR
            user1_id = ${user2_id} AND user2_id = ${user1_id})),
             '${message}',
              ${user1_id},
              '${time}'
            )
          RETURNING *
    `)
  },

  fetchConversations: (self_id) => {
    // send back name, conversation id,
    return db.raw(`
    WITH convo AS (
      SELECT 
        id,
        user1_id AS self_id,
        user2_id AS user_id
      FROM conversations
      WHERE user1_id = ${self_id}
      UNION
      SELECT 
        id, 
        user2_id AS self_id,
        user1_id AS user_id
      FROM conversations
      WHERE user2_id = ${self_id}
    )
    SELECT
      convo.id,
      convo.self_id,
      users.id,
      users.username
    FROM
      users, convo
    WHERE
      convo.user_id = users.id;
    `)
  }
}






