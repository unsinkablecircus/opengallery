const db = require('./../db/database');
const format = require('pg-format');

module.exports = { 
  submitMessage: (message, user1_id, user2_id, createdAt, currentConversation) => {
    var currentConversation = format.literal(currentConversation);
    var message = format.literal(message);
    var user1_id = format.literal(user1_id);
    var createdAt = format.literal(createdAt);

    return db.raw(`
        INSERT INTO messages (conversation_id, message, sender_id, created_at)
          VALUES (
            ${currentConversation},
            ${message},
            ${user1_id},
            ${createdAt}
          );
        SELECT * FROM messages
        WHERE (
          conversation_id = ${currentConversation}
        )
    `)
  },

  fetchConversations: (self_id) => {
    var self_id = format.literal(self_id);

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
    var self_id = format.literal(self_id);
    var user_id = format.literal(user_id);

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
        convo LEFT JOIN messages
        on convo.id=messages.conversation_id
    `)
  },

  fetchMessages: (conversation_id) => {
    var conversation_id = format.literal(conversation_id);

    return db.raw(`
      SELECT * FROM messages WHERE conversation_id = ${conversation_id}
    `)
  }
}