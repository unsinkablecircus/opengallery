create table users (
  id serial primary key,
  username varchar(20) not null,
  password varchar(20) not null,
  name varchar(50),
  phone_country_code integer,
  phone_area_code integer,
  phone_number integer,
  phone_extension integer,
  email varchar(50),
  facebook_url varchar(60),
  twitter_url varchar(60),
  avatar_url varchar(60),
  media varchar(25),
  bio varchar(255)
);

create table media (
  id serial primary key,
  user_id integer references users (id),
  url_small varchar(200000),
  url_medium varchar(60),
  url_large varchar(60),
  title varchar(60),
  description varchar(255)
);

create table tags (
  id serial primary key,
  tag_text varchar(40)
);

create table media_tags (
  id serial primary key,
  media_id integer references media (id), 
  tag_id integer references tags (id)
);

create table hashtags (
  id serial primary key,
  hashtag_text varchar(40)
);

create table media_hashtag_totals (
  id serial primary key,
  hashtag_id integer references hashtags (id),
  media_id integer references media (id),
  total integer
);

create table media_hashtags (
  id serial primary key,
  media_id integer references media (id),
  user_id integer references users (id),
  hashtag_id integer references hashtags (id)
);

