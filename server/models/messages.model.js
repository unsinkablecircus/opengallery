const db = require('./../db/database')






module.exports = { 
  submitMessage: (user1_id, user2_id, message, sender, time) => {
    return db.raw(`
      INSERT INTO messages (user1_id, user2_id, messages, sender, time)
      VALUES (
        ${user1_id},
        ${user2_id},
        '${message}',
        ${user1_id},
        '${time}'
      );
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


    `)
  }


}