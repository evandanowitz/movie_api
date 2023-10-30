--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

-- Started on 2023-10-25 13:23:05 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16485)
-- Name: directors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directors (
    directorid integer NOT NULL,
    name character varying(50) NOT NULL,
    bio character varying(1000),
    birthyear date,
    deathyear date
);


ALTER TABLE public.directors OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16484)
-- Name: directors_directorid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directors_directorid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.directors_directorid_seq OWNER TO postgres;

--
-- TOC entry 3640 (class 0 OID 0)
-- Dependencies: 217
-- Name: directors_directorid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directors_directorid_seq OWNED BY public.directors.directorid;


--
-- TOC entry 216 (class 1259 OID 16476)
-- Name: genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genres (
    genreid integer NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(1000)
);


ALTER TABLE public.genres OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16475)
-- Name: genres_genreid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genres_genreid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.genres_genreid_seq OWNER TO postgres;

--
-- TOC entry 3641 (class 0 OID 0)
-- Dependencies: 215
-- Name: genres_genreid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genres_genreid_seq OWNED BY public.genres.genreid;


--
-- TOC entry 220 (class 1259 OID 16494)
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    movieid integer NOT NULL,
    title character varying(50) NOT NULL,
    description character varying(1000),
    directorid integer NOT NULL,
    genreid integer NOT NULL,
    imageurl character varying(300),
    featured boolean
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16493)
-- Name: movies_movieid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movies_movieid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movies_movieid_seq OWNER TO postgres;

--
-- TOC entry 3642 (class 0 OID 0)
-- Dependencies: 219
-- Name: movies_movieid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movies_movieid_seq OWNED BY public.movies.movieid;


--
-- TOC entry 224 (class 1259 OID 16520)
-- Name: user_movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_movies (
    usermovieid integer NOT NULL,
    userid integer,
    movieid integer
);


ALTER TABLE public.user_movies OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16519)
-- Name: user_movies_usermovieid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_movies_usermovieid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_movies_usermovieid_seq OWNER TO postgres;

--
-- TOC entry 3643 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_movies_usermovieid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_movies_usermovieid_seq OWNED BY public.user_movies.usermovieid;


--
-- TOC entry 222 (class 1259 OID 16513)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    birth_date date
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16512)
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_userid_seq OWNER TO postgres;

--
-- TOC entry 3644 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- TOC entry 3464 (class 2604 OID 16488)
-- Name: directors directorid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directors ALTER COLUMN directorid SET DEFAULT nextval('public.directors_directorid_seq'::regclass);


--
-- TOC entry 3463 (class 2604 OID 16479)
-- Name: genres genreid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres ALTER COLUMN genreid SET DEFAULT nextval('public.genres_genreid_seq'::regclass);


--
-- TOC entry 3465 (class 2604 OID 16497)
-- Name: movies movieid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies ALTER COLUMN movieid SET DEFAULT nextval('public.movies_movieid_seq'::regclass);


--
-- TOC entry 3467 (class 2604 OID 16523)
-- Name: user_movies usermovieid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_movies ALTER COLUMN usermovieid SET DEFAULT nextval('public.user_movies_usermovieid_seq'::regclass);


--
-- TOC entry 3466 (class 2604 OID 16516)
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- TOC entry 3628 (class 0 OID 16485)
-- Dependencies: 218
-- Data for Name: directors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.directors (directorid, name, bio, birthyear, deathyear) VALUES (1, 'Christopher Nolan', 'Christopher Nolan is a visionary director celebrated for his mind-bending, visually stunning films.', '1970-07-30', NULL);
INSERT INTO public.directors (directorid, name, bio, birthyear, deathyear) VALUES (2, 'Jonathan Demme', 'Jonathan Demme was a versatile director best known for being emotionally charged and politically relevant.', '1944-02-22', '2017-04-26');
INSERT INTO public.directors (directorid, name, bio, birthyear, deathyear) VALUES (3, 'Bong Joon Ho', 'Bong Joon Ho is a South Korean auteur renowned for his socially conscious and genre-defying works.', '1969-09-14', NULL);
INSERT INTO public.directors (directorid, name, bio, birthyear, deathyear) VALUES (4, 'Martin Scorsese', 'Martin Scorsese is an iconic American filmmaker known for his gritty, character-driven narratives and masterful storytelling.', '1942-11-17', NULL);
INSERT INTO public.directors (directorid, name, bio, birthyear, deathyear) VALUES (5, 'Peter Weir', 'Peter Weir, an Australian director, is celebrated for his thought-provoking and visually compelling films.', '1944-08-21', NULL);
INSERT INTO public.directors (directorid, name, bio, birthyear, deathyear) VALUES (6, 'Stanley Kubrick', 'Stanley Kubrick was a legendary filmmaker known for his uncompromising vision and cinematic innovation.', '1928-06-26', '1999-03-07');
INSERT INTO public.directors (directorid, name, bio, birthyear, deathyear) VALUES (7, 'William Friedkin', 'William Friedkin is an influential director who has left an indelible mark on the crime and horror genres in cinema.', '1935-08-29', '2023-08-07');
INSERT INTO public.directors (directorid, name, bio, birthyear, deathyear) VALUES (8, 'Ridley Scott', 'Ridley Scott, a British director, is famous for his visually stunning and epic films.', '1937-11-30', NULL);


--
-- TOC entry 3626 (class 0 OID 16476)
-- Dependencies: 216
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.genres (genreid, name, description) VALUES (1, 'Action', 'Action films are built around a core set of characteristics: spectacular physical action; a narrative emphasis on fights, chases, and explosions; and a combination of state-of-the-art special effects and stunt-work.');
INSERT INTO public.genres (genreid, name, description) VALUES (2, 'Comedy', 'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.');
INSERT INTO public.genres (genreid, name, description) VALUES (3, 'Thriller', 'Thrillers tend to be action-packed, page-turners with moments full of tension, anxiety, and fear.');
INSERT INTO public.genres (genreid, name, description) VALUES (4, 'Horror', 'Seek to elicit responses of fear, terror, disgust, shock, suspense, and, of course, horror from their viewers.');


--
-- TOC entry 3630 (class 0 OID 16494)
-- Dependencies: 220
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.movies (movieid, title, description, directorid, genreid, imageurl, featured) VALUES (1, 'The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 1, 1, 'darkknight.png', true);
INSERT INTO public.movies (movieid, title, description, directorid, genreid, imageurl, featured) VALUES (2, 'Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.', 1, 1, 'inception.png', true);
INSERT INTO public.movies (movieid, title, description, directorid, genreid, imageurl, featured) VALUES (3, 'The Silence of the Lambs', 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.', 2, 3, 'silence_of_the_lambs.png', true);
INSERT INTO public.movies (movieid, title, description, directorid, genreid, imageurl, featured) VALUES (5, 'The Departed', 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.', 4, 3, 'thedeparted.png', false);
INSERT INTO public.movies (movieid, title, description, directorid, genreid, imageurl, featured) VALUES (6, 'The Wolf of Wall Street', 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.', 4, 2, 'wolfwallstreet.png', false);
INSERT INTO public.movies (movieid, title, description, directorid, genreid, imageurl, featured) VALUES (7, 'The Truman Show', 'An insurance salesman discovers his whole life is actually a reality TV show.', 5, 2, 'trumanshow.png', false);
INSERT INTO public.movies (movieid, title, description, directorid, genreid, imageurl, featured) VALUES (8, 'The Shining', 'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.', 6, 4, 'theshining.png', true);
INSERT INTO public.movies (movieid, title, description, directorid, genreid, imageurl, featured) VALUES (9, 'The Exorcist', 'When a young girl is possessed by a mysterious entity, her mother seeks the help of two Catholic priests to save her life.', 7, 4, 'exorcist.png', true);
INSERT INTO public.movies (movieid, title, description, directorid, genreid, imageurl, featured) VALUES (10, 'Alien', 'The crew of a commercial spacecraft encounters a deadly lifeform after investigating an unknown transmission.', 8, 4, 'alien.png', false);


--
-- TOC entry 3634 (class 0 OID 16520)
-- Dependencies: 224
-- Data for Name: user_movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_movies (usermovieid, userid, movieid) VALUES (1, 1, 3);
INSERT INTO public.user_movies (usermovieid, userid, movieid) VALUES (2, 2, 5);
INSERT INTO public.user_movies (usermovieid, userid, movieid) VALUES (3, 3, 9);


--
-- TOC entry 3632 (class 0 OID 16513)
-- Dependencies: 222
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (userid, username, password, email, birth_date) VALUES (1, 'dsmith', 'PW123', 'dsmith@gmail.com', '1994-01-01');
INSERT INTO public.users (userid, username, password, email, birth_date) VALUES (3, 'ejones', 'PW789', 'ejones@gmail.com', '1976-08-14');
INSERT INTO public.users (userid, username, password, email, birth_date) VALUES (2, 'bjohnson', 'PW456', 'bjohnson@gmail.com', '1982-03-05');


--
-- TOC entry 3645 (class 0 OID 0)
-- Dependencies: 217
-- Name: directors_directorid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directors_directorid_seq', 8, true);


--
-- TOC entry 3646 (class 0 OID 0)
-- Dependencies: 215
-- Name: genres_genreid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genres_genreid_seq', 4, true);


--
-- TOC entry 3647 (class 0 OID 0)
-- Dependencies: 219
-- Name: movies_movieid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movies_movieid_seq', 10, true);


--
-- TOC entry 3648 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_movies_usermovieid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_movies_usermovieid_seq', 3, true);


--
-- TOC entry 3649 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_userid_seq', 3, true);


--
-- TOC entry 3471 (class 2606 OID 16492)
-- Name: directors directors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directors
    ADD CONSTRAINT directors_pkey PRIMARY KEY (directorid);


--
-- TOC entry 3469 (class 2606 OID 16483)
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (genreid);


--
-- TOC entry 3473 (class 2606 OID 16501)
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (movieid);


--
-- TOC entry 3477 (class 2606 OID 16525)
-- Name: user_movies user_movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_movies
    ADD CONSTRAINT user_movies_pkey PRIMARY KEY (usermovieid);


--
-- TOC entry 3475 (class 2606 OID 16518)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 3478 (class 2606 OID 16507)
-- Name: movies directorkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT directorkey FOREIGN KEY (directorid) REFERENCES public.directors(directorid);


--
-- TOC entry 3479 (class 2606 OID 16502)
-- Name: movies genrekey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT genrekey FOREIGN KEY (genreid) REFERENCES public.genres(genreid);


--
-- TOC entry 3480 (class 2606 OID 16531)
-- Name: user_movies moviekey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_movies
    ADD CONSTRAINT moviekey FOREIGN KEY (movieid) REFERENCES public.movies(movieid);


--
-- TOC entry 3481 (class 2606 OID 16526)
-- Name: user_movies userkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_movies
    ADD CONSTRAINT userkey FOREIGN KEY (userid) REFERENCES public.users(userid);


-- Completed on 2023-10-25 13:23:05 EDT

--
-- PostgreSQL database dump complete
--

