const pg = require('../db/database')
const Promise = require('bluebird')

const query = require('../config/utilities/media.utility')
const { isInt } = query

exports.fetch = ({ artist, user = 0, page = 0 }) => {
  if (isInt(user) && artist && isInt(page)) {
    return pg.raw(`
      SELECT array_to_json(array_agg(row_to_json(a))) AS artist
      FROM (
        SELECT
          u.id, u.username, u.name, u.email, u.facebook_url as facebook, u.twitter_url as twitter, u.avatar_url as avatar, u.media, u.about, u.website
        FROM users u
        WHERE u.username = '${ artist }'
      ) a;

      SELECT array_to_json(array_agg(row_to_json(d))) AS data
      FROM (
        SELECT ${ query.media(user) }
        FROM ${ query.artist }
        WHERE m.user_id = u.id AND u.username = '${ artist }'
        ORDER BY m.created_at
        OFFSET ${ 18 * page } LIMIT 18
      ) d;

      SELECT COUNT(*) as total_records
      FROM media m
        INNER JOIN users u
        ON (m.user_id = u.id)
      WHERE m.user_id = u.id AND u.username = '${ artist }';
    `)
  } else {
    return Promise.reject(`User ID must be number, not ${typeof parseInt(page)}`)
  }
}
