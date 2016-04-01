CREATE TABLE conversations
(
  id serial NOT NULL,
  user1_id integer,
  user2_id integer,
  CONSTRAINT conversations_pkey PRIMARY KEY (id)
);

CREATE TABLE tags
(
  id serial NOT NULL,
  text character varying(40),
  CONSTRAINT tags_pkey PRIMARY KEY (id)
);

CREATE UNIQUE INDEX tag_text
  ON tags
  USING btree
  (tag_text COLLATE pg_catalog."default");

CREATE TABLE users
(
  id serial NOT NULL,
  username character varying(20) NOT NULL,
  password character varying(65) NOT NULL,
  name character varying(50),
  email character varying(50),
  facebook_url character varying(60),
  twitter_url character varying(60),
  avatar_url character varying(60),
  media character varying(25),
  about character varying(255),
  website character varying(80),
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE media
(
  id serial NOT NULL,
  user_id integer, -- image owner ID
  url_small text, -- base-64 encoded image for progressive image load
  url_medium character varying(60), -- low resolution image link hosted on AWS S3
  url_large character varying(60), -- full resolution image link hosted on AWS S3
  title character varying(60), -- image title
  description character varying(255), -- image description
  width smallint, -- image width (pixels)
  height smallint, -- image height (pixels)
  media character varying(20), -- media type
  mimetype character varying(10), -- media types and subtypes ('image/jpeg', 'media/png', 'media/gif', or 'media/bmp')
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  CONSTRAINT media_pkey PRIMARY KEY (id),
  CONSTRAINT media_user_id_fkey FOREIGN KEY (user_id)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE media_hashtag_totals
(
  id serial NOT NULL,
  hashtag_id integer,
  media_id integer,
  total integer,
  CONSTRAINT media_hashtag_totals_pkey PRIMARY KEY (id),
  CONSTRAINT media_hashtag_totals_hashtag_id_fkey FOREIGN KEY (id)
      REFERENCES tags (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT media_hashtag_totals_media_id_fkey FOREIGN KEY (media_id)
      REFERENCES media (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE media_tag_totals
(
  id serial NOT NULL,
  tag_id integer,
  media_id integer,
  total integer,
  CONSTRAINT media_tag_totals_pkey PRIMARY KEY (id),
  CONSTRAINT media_tag_totals_tag_id_fkey FOREIGN KEY (id)
      REFERENCES tags (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT media_tag_totals_media_id_fkey FOREIGN KEY (media_id)
      REFERENCES media (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE media_tags
(
  id serial NOT NULL,
  media_id integer,
  user_id integer,
  tag_id integer,
  tag_type character varying(20),
  CONSTRAINT media_tags_pkey PRIMARY KEY (id),
  CONSTRAINT media_tags_tag_id_fkey FOREIGN KEY (id)
      REFERENCES tags (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT media_tags_media_id_fkey FOREIGN KEY (media_id)
      REFERENCES media (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT media_tags_user_id_fkey FOREIGN KEY (user_id)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE messages
(
  id serial NOT NULL,
  sender_id integer,
  message text,
  conversation_id integer,
  created_at character varying,
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id)
      REFERENCES conversations (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);


/*
CREATE TABLE conversations
(
  id serial NOT NULL,
  user1_id integer,
  user2_id integer,
  CONSTRAINT conversations_pkey PRIMARY KEY (id)
);

CREATE TABLE hashtags
(
  id serial NOT NULL,
  hashtag_text character varying(40),
  CONSTRAINT hashtags_pkey PRIMARY KEY (id)
);

CREATE UNIQUE INDEX hashtag_text
  ON hashtags
  USING btree
  (hashtag_text COLLATE pg_catalog."default");

CREATE TABLE tags
(
  id serial NOT NULL,
  tag_text character varying(40),
  CONSTRAINT tags_pkey PRIMARY KEY (id)
);

CREATE UNIQUE INDEX tag_text
  ON tags
  USING btree
  (tag_text COLLATE pg_catalog."default");

CREATE TABLE users
(
  id serial NOT NULL,
  username character varying(20) NOT NULL,
  password character varying(65) NOT NULL,
  name character varying(50),
  email character varying(50),
  facebook_url character varying(60),
  twitter_url character varying(60),
  avatar_url character varying(60),
  media character varying(25),
  about character varying(255),
  website character varying(80),
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE media
(
  id serial NOT NULL,
  user_id integer, -- image owner ID
  url_small text, -- base-64 encoded image for progressive image load
  url_medium character varying(60), -- low resolution image link hosted on AWS S3
  url_large character varying(60), -- full resolution image link hosted on AWS S3
  title character varying(60), -- image title
  description character varying(255), -- image description
  width smallint, -- image width (pixels)
  height smallint, -- image height (pixels)
  media character varying(20), -- media type
  mimetype character varying(10), -- media types and subtypes ('image/jpeg', 'media/png', 'media/gif', or 'media/bmp')
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  CONSTRAINT media_pkey PRIMARY KEY (id),
  CONSTRAINT media_user_id_fkey FOREIGN KEY (user_id)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE media_hashtag_totals
(
  id serial NOT NULL,
  hashtag_id integer,
  media_id integer,
  total integer,
  CONSTRAINT media_hashtag_totals_pkey PRIMARY KEY (id),
  CONSTRAINT media_hashtag_totals_hashtag_id_fkey FOREIGN KEY (hashtag_id)
      REFERENCES hashtags (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT media_hashtag_totals_media_id_fkey FOREIGN KEY (media_id)
      REFERENCES media (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE media_hashtags
(
  id serial NOT NULL,
  media_id integer,
  user_id integer,
  hashtag_id integer,
  CONSTRAINT media_hashtags_pkey PRIMARY KEY (id),
  CONSTRAINT media_hashtags_hashtag_id_fkey FOREIGN KEY (hashtag_id)
      REFERENCES hashtags (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT media_hashtags_media_id_fkey FOREIGN KEY (media_id)
      REFERENCES media (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT media_hashtags_user_id_fkey FOREIGN KEY (user_id)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE media_tags
(
  id serial NOT NULL,
  media_id integer,
  tag_id integer,
  CONSTRAINT media_tags_pkey PRIMARY KEY (id),
  CONSTRAINT media_tags_media_id_fkey FOREIGN KEY (media_id)
      REFERENCES media (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT media_tags_tag_id_fkey FOREIGN KEY (tag_id)
      REFERENCES tags (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE messages
(
  id serial NOT NULL,
  sender_id integer,
  message text,
  conversation_id integer,
  created_at character varying,
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id)
      REFERENCES conversations (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE,
  CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id)
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE CASCADE
);
*/