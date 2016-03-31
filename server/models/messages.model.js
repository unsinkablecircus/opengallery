const db = require('./../db/database')

module.exports = { 
  submitMessage: (message, user1_id, user2_id, createdAt, currentConversation) => {
    console.log(message, user1_id, user2_id, createdAt, currentConversation);
    return db.raw(`
        INSERT INTO messages (conversation_id, message, sender_id, created_at)
          VALUES (
            ${currentConversation},
            '${message}',
            ${user1_id},
            '${createdAt}'
            )
          RETURNING *
    `)
  },

  fetchConversations: (self_id) => {
    return db.raw(`
    WITH 
    convo AS (
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
      users.id as user_id,
      users.username
    FROM
      users, convo
    WHERE
      convo.user_id = users.id;
    `)
  },

  fetchOrCreateConversation: (self_id, user_id) => {
    // insert if it exists, else fetch it
    return db.raw(`
      INSERT INTO conversations (user1_id, user2_id)
      SELECT ${self_id}, ${user_id}
      WHERE NOT EXISTS (
        SELECT * FROM conversations 
        WHERE (
          user1_id = ${self_id} AND user2_id = ${user_id}
          OR
          user1_id = ${user_id} AND user2_id = ${self_id}
        )
      );
      WITH 
      convo AS (
        SELECT 
          id,
          user1_id AS self_id,
          user2_id AS user_id
        FROM conversations
        WHERE user1_id = ${self_id} AND user2_id = ${user_id}
        UNION
        SELECT 
          id, 
          user2_id AS self_id,
          user1_id AS user_id
        FROM conversations
        WHERE user2_id = ${self_id} AND user1_id = ${user_id}
      )
      SELECT 
        convo.id,
        messages.sender_id,
        messages.created_at,
        messages.message
      FROM 
        messages, convo
      WHERE 
        messages.conversation_id = convo.id
    `)
  },

  fetchMessages: (conversation_id) => {
    return db.raw(`
      SELECT * FROM messages WHERE conversation_id = ${conversation_id}
    `)
  }
}






