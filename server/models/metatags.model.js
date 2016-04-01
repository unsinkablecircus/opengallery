const pg = require('../db/database')
const query = require('../config/utilities/media.utility')
const { isInt } = query
const Promise = require('bluebird')

exports.fetch = ({ tags = [], user = 0, page = 0 }) => {
  console.log('tags, user, page: ', tags, user, page, tags.join(','));
  if (Array.isArray(tags) && tags.length) {
    return pg.raw(`
      SELECT * FROM (
        SELECT array_to_json(array_agg(row_to_json(some_tags))) AS data
        FROM (
          SELECT DISTINCT ON (m.id) ${ query.media(user) }
          FROM ${ query.metatags}
          WHERE t.text ~* ANY ('{${ tags.join(',') }}'::text[])
          ORDER BY m.id
          OFFSET ${ 18 * page } LIMIT 18
        ) some_tags
      ) page;

      ${ query.total_tags(tags) }
    `)
  } else {
    return pg.raw(`
      SELECT * FROM (
        SELECT array_to_json(array_agg(row_to_json(some_tags))) AS data
        FROM (
          SELECT DISTINCT ON (m.id) ${ query.media(user) }
          FROM ${ query.metatags}
          WHERE t.text NOTNULL
          ORDER BY m.id DESC
          OFFSET ${ 18 * page } LIMIT 18
        ) some_tags
      ) page;

      ${ query.total }
    `)
  }
}

exports.insert = (tags, mediaId, userId) => {
  if (Array.isArray(tags)) {
    return pg.raw(`
      BEGIN;
      LOCK TABLE tags IN SHARE ROW EXCLUSIVE MODE;

      WITH meta_tags (tag_text) AS (
        VALUES ${
          tags.map(t => `('${t}')`).join(',')
        }
      )
      INSERT INTO tags (text)
      SELECT m.tag_text FROM meta_tags m
      WHERE NOT EXISTS (
        SELECT 1 FROM tags t
        WHERE t.text = m.tag_text
      );

      WITH new_tags AS (
        SELECT ${ mediaId }, t.id, 'metatag', ${ userId } 
        FROM tags t
        WHERE t.text = ANY ('{${ tags.join(',') }}'::text[])
      )
      INSERT INTO media_tags (media_id, tag_id, tag_type, user_id)
      SELECT * FROM new_tags;

      WITH newTags AS (
        SELECT t.id
        FROM tags t
        WHERE t.text = ANY ('{${ tags.join(',') }}'::text[])
      ),
      update_tag_totals AS (
        UPDATE media_tag_totals
          SET total = total + 1 
        WHERE tag_id = ANY (select id from newTags)
          AND media_id = ${mediaId}
      ),
      insert_tag_totals AS (
        INSERT INTO media_tag_totals (media_id, tag_id, total)
        SELECT ${mediaId}, n.id, 1
        FROM newTags n
        WHERE NOT EXISTS (
          SELECT * 
          FROM media_tag_totals
          WHERE media_id = ${mediaId} 
            AND tag_id = ANY (SELECT id FROM newTags)
        )
      )

      SELECT * 
      FROM media_tags mt
      WHERE mt.media_id = ${ mediaId };

      COMMIT;
    `)
  } else {
    return Promise.reject(`Metatags must be posted as array, not as ${typeof tags}`)
  }
}
