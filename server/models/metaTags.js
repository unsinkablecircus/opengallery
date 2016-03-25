`BEGIN;
LOCK TABLE tags IN SHARE ROW EXCLUSIVE MODE;

WITH meta_tags (tag_text) AS (
  VALUES ${
    tags.map(t => `('${t}')`).join(',')
  }
)
INSERT INTO tags (tag_text)
SELECT m.tag_text
FROM meta_tags m
WHERE NOT EXISTS (
  SELECT 1 FROM tags t
  WHERE t.tag_text = m.tag_text);

COMMIT;`
