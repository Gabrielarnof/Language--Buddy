drop table if exists user_info cascade;
drop table if exists languages cascade;
drop table if exists language_level cascade;
drop table if exists connection;
drop index if exists idx_connections_requester_responder;

CREATE TABLE languages (
	id serial primary key NOT NULL,
	language_name varchar(30) NOT NULL
	);

CREATE TABLE language_level (
	id serial primary key NOT NULL,
	levels varchar(30) NOT NULL
	);

CREATE TABLE user_info (
	id serial primary key NOT NULL,
	username varchar(30) NOT null UNIQUE,
	email VARCHAR(120) NOT null UNIQUE,
	password varchar(100) NOT null,
	full_name varchar(40) NOT NULL,
	date_of_birth DATE NOT NULL,
	gender varchar(10) NOT NULL,
	nationality varchar(50) NOT NULL,
	language int references languages(id),
	language_level int references language_level(id),
	description varchar(200)
	);

insert into languages (language_name)
values('English');
insert into languages (language_name)
values('Spanish');
insert into languages (language_name)
values('Catalan');
insert into languages (language_name)
values('Arabic');

insert into language_level ("levels")
values('Basic');
insert into language_level ("levels")
values('Intermediate');
insert into language_level ("levels")
values('Advanced');
insert into language_level ("levels")
values('Native');

insert into user_info (username, email, password, full_name, date_of_birth , gender , nationality ,language, language_level, description)
values('mdesi98','miguel.desimone98@gmail.com', 'MAD98', 'Miguel Desimone', '30/04/1998', 'male', 'Argentina', 3, 2,'Hello world');
insert into user_info (username, email, password, full_name, date_of_birth , gender , nationality ,language, language_level, description)
values('abubaker', 'habubakernazir@gmail.com', 'ab99', 'Abubaker Nazir', '23/05/1997', 'male', 'Pakistan', 1, 3, 'World Hello');
insert into user_info (username, email, password, full_name, date_of_birth , gender , nationality ,language, language_level, description)
values( 'agafarno','agafarno@gmail.com', 'gaboarno', 'Gabriel Arno', '01/07/1981', 'male', 'Venezuela',2, 4, ' Goodbye world');

CREATE TABLE connection (
	id serial primary key NOT NULL,
	requester_id int references user_info(id),
    responder_id int references user_info(id),
	status VARCHAR(10) NOT null,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_connections_requester_responder ON connection(requester_id, responder_id);

insert into connection (requester_id, responder_id, status) values( 1, 2, 'pending');
insert into connection (requester_id, responder_id, status) values( 2, 3, 'pending');
insert into connection (requester_id, responder_id, status) values( 3, 4, 'pending');
insert into connection (requester_id, responder_id, status) values( 144, 1, 'pending');
insert into connection (requester_id, responder_id, status) values( 2, 144, 'approved');