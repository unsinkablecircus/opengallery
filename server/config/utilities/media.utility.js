exports.isInt = (val) => {
  int = parseInt(val)
  return Number(int) === int && int % 1 === 0
}

exports.media = (user) => (`
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
    SELECT mt.tag_id
    FROM media_tags mt
    WHERE mt.media_id = m.id
    AND mt.user_id = ${ user }
    AND mt.tag_type = 'hashtag'
    LIMIT 1
  ) AS user_feedback_id,
  (
    SELECT array_to_json(array_agg(row_to_json(f)))
    FROM (
      SELECT t.id, t.text AS tag, mht.total AS count
      FROM media_hashtag_totals mht
        INNER JOIN tags t
        ON (mht.hashtag_id = t.id)
      WHERE mht.media_id = m.id
    ) f
  ) AS feedback
`)

exports.metatags = (`
  media m
    INNER JOIN media_tags mt
    ON (m.id = mt.media_id)
    INNER JOIN tags t
    ON (mt.tag_id = t.id)
`)

exports.users = (`
  media m
    INNER JOIN users u
    ON (m.user_id = u.id)
`)

exports.artist = (artist) => (`
  SELECT array_to_json(array_agg(row_to_json(a))) AS artist
  FROM (
    SELECT
      u.id, u.username, u.name, u.email, u.facebook_url as facebook, u.twitter_url as twitter, u.avatar_url as avatar, u.media, u.about, u.website
    FROM users u
    WHERE u.username = '${ artist }'
  ) a;
`)

exports.total_artist = (artist) => (`
  SELECT COUNT(*) as total_records
  FROM media m
    INNER JOIN users u
    ON (m.user_id = u.id)
  WHERE m.user_id = u.id AND u.username = '${ artist }';
`)

exports.total_tags = (tags) => (`
  SELECT COUNT(*) as total_records
  FROM media m
    INNER JOIN media_tags mt
    ON (m.id = mt.media_id)
    INNER JOIN tags t
    ON (mt.tag_id = t.id)
  WHERE t.tag_text ~* ANY ('{${ tags.join(',') }}'::text[])
`)

exports.total = (`
  SELECT COUNT(*) as total_records
  FROM (
    SELECT DISTINCT m.id
    FROM media m
    INNER JOIN media_tags mt
    ON (m.id = mt.media_id)
    INNER JOIN tags t
    ON (mt.tag_id = t.id)
  ) AS total_records
`)
