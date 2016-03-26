const pg = require('../db/database')
const Promise = require('bluebird')

const util = require('../config/helpers')
const { isInt } = util

exports.fetch = ({ user, artist, page }) => {
  if (isInt(user) && isInt(artist) && isInt(page)) {
    return pg.raw(
      `SELECT array_to_json(array_agg(row_to_json(d))) AS data
      FROM (
        SELECT
          m.id AS media_id, m.title, m.media, m.description, m.width, m.height, m.url_small AS url_sm, m.url_medium AS url_md, m.url_large AS url_lg,
          (
            SELECT row_to_json(a)
            FROM (
              SELECT u.id, u.username, u.avatar_url
              FROM users u
              WHERE u.id = m.user_id
            ) a
          ) AS artist,
          (
            SELECT array_agg(tags) AS tags
            FROM (
              SELECT t.tag_text AS tags
              FROM media_tags mt
                INNER JOIN tags t
                ON (mt.tag_id = t.id)
              WHERE mt.media_id = m.id
            ) tags
          ),
          (
            SELECT mh.hashtag_id
            FROM media_hashtags mh
            WHERE mh.media_id = m.id
            AND mh.user_id = ${user}
            LIMIT 1
          ) AS user_feedback_id,
          (
            SELECT array_to_json(array_agg(row_to_json(f)))
            FROM (
              SELECT h.id, h.hashtag_text AS impression, mht.total AS count
              FROM media_hashtag_totals mht
                INNER JOIN hashtags h
                ON (mht.hashtag_id = h.id)
              WHERE mht.media_id = m.id
            ) f
          ) AS feedback,
        COUNT(*) OVER() AS total_data
        FROM media m
          INNER JOIN users u
          ON (m.user_id = u.id)
        WHERE m.user_id = ${artist}
        ORDER BY m.created_at
        OFFSET ${18 * page} LIMIT 18
      ) d`
    )
  } else {
    return Promise.reject(`User ID must be number, not ${typeof parseInt(page)}`)
  }
}
