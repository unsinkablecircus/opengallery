const pg = require('../db/database')
const Promise = require('bluebird')

const query = require('../config/utilities/media.utility')
const { isInt } = query

exports.fetch = ({ artist, user = 0, page = 0 }) => {
  if (isInt(user) && artist && isInt(page)) {
    return pg.raw(`
      ${ query.artist(artist) }

      SELECT array_to_json(array_agg(row_to_json(d))) AS data
      FROM (
        SELECT ${ query.media(user) }
        FROM ${ query.users }
        WHERE m.user_id = u.id AND u.username = '${ artist }'
        ORDER BY m.created_at
        OFFSET ${ 18 * page } LIMIT 18
      ) d;

      ${ query.total_artist(artist) }
    `)
  } else {
    return Promise.reject(`User ID must be number, not ${typeof parseInt(page)}`)
  }
}
