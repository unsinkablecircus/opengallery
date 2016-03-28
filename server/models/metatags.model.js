const pg = require('../db/database')
const query = require('../config/utilities/media.utility')
const { isInt } = query
const Promise = require('bluebird')

exports.fetch = ({ tags = [], user = 0, page = 0 }) => {
  if (Array.isArray(tags) && tags.length) {
    return pg.raw(`
      SELECT * FROM (
        SELECT array_to_json(array_agg(row_to_json(some_tags))) AS data
        FROM (
          SELECT DISTINCT ON (m.id) ${ query.media(user) }
          FROM ${ query.metatags}
          WHERE t.tag_text ~* ANY ('{[${ tags.join(',') }}'::text[])
          ORDER BY m.id
          OFFSET ${ 18 * page } LIMIT 18
        ) some_tags
      ) page
    `)
  } else {
    return pg.raw(`
      SELECT * FROM (
        SELECT array_to_json(array_agg(row_to_json(some_tags))) AS data
        FROM (
          SELECT DISTINCT ON (m.id) ${ query.media(user) }
          FROM ${ query.metatags}
          ORDER BY m.id DESC
          OFFSET ${ 18 * page } LIMIT 18
        ) some_tags
      ) page
    `)
  }
}

exports.insert = tags => {
  if (Array.isArray(tags)) {
    return pg.raw(`
      BEGIN;
      LOCK TABLE tags IN SHARE ROW EXCLUSIVE MODE;

      WITH meta_tags (tag_text) AS (
        VALUES ${
          tags.map(t => `('${t}')`).join(',')
        }
      )
      INSERT INTO tags (tag_text)
      SELECT m.tag_text FROM meta_tags m
      WHERE NOT EXISTS (
        SELECT 1 FROM tags t
        WHERE t.tag_text = m.tag_text
      );

      SELECT * FROM tags
      WHERE tag_text = ANY ('{${ tags.join(',') }}'::text[]);

      COMMIT;
    `)
  } else {
    return Promise.reject(`Metatags must be posted as array, not as ${typeof tags}`)
  }
}
