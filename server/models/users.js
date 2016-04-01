const db = require('../db/database.js');

module.exports = {

  findUser: (username) => {
    return (
      db.raw(`SELECT * FROM users WHERE username = '${username}'`)
    )
  },

  createUser: (username, hashedPW) => {
    return db.raw(`INSERT INTO users (username, password) VALUES ('${username}', '${hashedPW}') RETURNING id, username`)
  },

  updateUser: (name, email, website, facebook_url, twitter_url, id, about, media) => {
    console.log(name, email, website, facebook_url, twitter_url, id, about, media);
    return (
      db.raw(`UPDATE users 
              SET name='${name}',
                  email='${email}',
                  website='${website}',
                  facebook_url='${facebook_url}',
                  twitter_url='${twitter_url}',
                  about='${about}',
                  media='${media}'
              WHERE id=${id}
              RETURNING *;`)
    )
  }

}

