const pg = require('../db/database')
const Promise = require('bluebird')

exports.fetch = ({ tags = [], user = 0, page = 0 }) => {
  if (Array.isArray(tags)) {
    return pg.raw(`
      SELECT array_to_json(array_agg(row_to_json(d))) AS data
      FROM (
        SELECT *
        FROM tags tg
        WHERE tg.tag_text ~* ANY ('{${ tags.join(',') }}'::text[])
        OFFSET ${ 18 * page } LIMIT 18
      ) d;
    `)
  } else {
    return Promise.reject(`Metatags query must be an array, not ${typeof tags}`)
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
