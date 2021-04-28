import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrateFromSynchronize1619586998217 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        --
-- PostgreSQL database dump
--

-- Dumped from database version 13.1 (Debian 13.1-1.pgdg100+1)
-- Dumped by pg_dump version 13.2

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
-- Name: challenge; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.challenge (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    version_id integer NOT NULL,
    season_id integer
);


ALTER TABLE public.challenge OWNER TO postgres;

--
-- Name: challenge_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.challenge_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.challenge_id_seq OWNER TO postgres;

--
-- Name: challenge_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.challenge_id_seq OWNED BY public.challenge.id;


--
-- Name: challenge_users_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.challenge_users_user (
    challenge_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.challenge_users_user OWNER TO postgres;

--
-- Name: draft; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.draft (
    id integer NOT NULL,
    pool_size integer NOT NULL,
    live_pool_pokemon_index integer DEFAULT '-1'::integer NOT NULL,
    challenge_id integer
);


ALTER TABLE public.draft OWNER TO postgres;

--
-- Name: COLUMN draft.pool_size; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.draft.pool_size IS 'The amount of pokemon this draft should have.';


--
-- Name: COLUMN draft.live_pool_pokemon_index; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.draft.live_pool_pokemon_index IS 'Index for tracking a live pool feed of the draft.';


--
-- Name: draft_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.draft_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.draft_id_seq OWNER TO postgres;

--
-- Name: draft_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.draft_id_seq OWNED BY public.draft.id;


--
-- Name: draft_pokemon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.draft_pokemon (
    id integer NOT NULL,
    pokemon_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    draft_id integer
);


ALTER TABLE public.draft_pokemon OWNER TO postgres;

--
-- Name: draft_pokemon_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.draft_pokemon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.draft_pokemon_id_seq OWNER TO postgres;

--
-- Name: draft_pokemon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.draft_pokemon_id_seq OWNED BY public.draft_pokemon.id;


--
-- Name: league; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.league (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.league OWNER TO postgres;

--
-- Name: league_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.league_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.league_id_seq OWNER TO postgres;

--
-- Name: league_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.league_id_seq OWNED BY public.league.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: season; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.season (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    league_id integer
);


ALTER TABLE public.season OWNER TO postgres;

--
-- Name: season_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.season_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.season_id_seq OWNER TO postgres;

--
-- Name: season_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.season_id_seq OWNED BY public.season.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    access_key uuid NOT NULL,
    nickname character varying NOT NULL,
    password character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    token_version integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: COLUMN "user".token_version; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".token_version IS 'Used to version refresh tokens and much more easily revoke out-in-the-wild access/refresh tokens';


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: version_denied_pokemon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.version_denied_pokemon (
    id integer NOT NULL,
    version_id integer NOT NULL,
    pokemon_id integer NOT NULL
);


ALTER TABLE public.version_denied_pokemon OWNER TO postgres;

--
-- Name: version_denied_pokemon_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.version_denied_pokemon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.version_denied_pokemon_id_seq OWNER TO postgres;

--
-- Name: version_denied_pokemon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.version_denied_pokemon_id_seq OWNED BY public.version_denied_pokemon.id;


--
-- Name: challenge id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.challenge ALTER COLUMN id SET DEFAULT nextval('public.challenge_id_seq'::regclass);


--
-- Name: draft id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.draft ALTER COLUMN id SET DEFAULT nextval('public.draft_id_seq'::regclass);


--
-- Name: draft_pokemon id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.draft_pokemon ALTER COLUMN id SET DEFAULT nextval('public.draft_pokemon_id_seq'::regclass);


--
-- Name: league id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.league ALTER COLUMN id SET DEFAULT nextval('public.league_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: season id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.season ALTER COLUMN id SET DEFAULT nextval('public.season_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: version_denied_pokemon id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.version_denied_pokemon ALTER COLUMN id SET DEFAULT nextval('public.version_denied_pokemon_id_seq'::regclass);


--
-- Data for Name: challenge; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.challenge (id, name, description, created_at, updated_at, version_id, season_id) FROM stdin;
\\.


--
-- Data for Name: challenge_users_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.challenge_users_user (challenge_id, user_id) FROM stdin;
\\.


--
-- Data for Name: draft; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.draft (id, pool_size, live_pool_pokemon_index, challenge_id) FROM stdin;
\\.


--
-- Data for Name: draft_pokemon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.draft_pokemon (id, pokemon_id, created_at, updated_at, draft_id) FROM stdin;
\\.


--
-- Data for Name: league; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.league (id, name, description, created_at, updated_at) FROM stdin;
\\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
\\.


--
-- Data for Name: season; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.season (id, name, description, created_at, updated_at, league_id) FROM stdin;
\\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, access_key, nickname, password, created_at, updated_at, token_version) FROM stdin;
\\.


--
-- Data for Name: version_denied_pokemon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.version_denied_pokemon (id, version_id, pokemon_id) FROM stdin;
\\.


--
-- Name: challenge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.challenge_id_seq', 1, false);


--
-- Name: draft_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.draft_id_seq', 1, false);


--
-- Name: draft_pokemon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.draft_pokemon_id_seq', 1, false);


--
-- Name: league_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.league_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, false);


--
-- Name: season_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.season_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- Name: version_denied_pokemon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.version_denied_pokemon_id_seq', 1, false);


--
-- Name: draft PK_0b2b03d3f2c998450423648bc65; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.draft
    ADD CONSTRAINT "PK_0b2b03d3f2c998450423648bc65" PRIMARY KEY (id);


--
-- Name: league PK_0bd74b698f9e28875df738f7864; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.league
    ADD CONSTRAINT "PK_0bd74b698f9e28875df738f7864" PRIMARY KEY (id);


--
-- Name: challenge PK_5f31455ad09ea6a836a06871b7a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.challenge
    ADD CONSTRAINT "PK_5f31455ad09ea6a836a06871b7a" PRIMARY KEY (id);


--
-- Name: challenge_users_user PK_84974b6c610c867031c0769464a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.challenge_users_user
    ADD CONSTRAINT "PK_84974b6c610c867031c0769464a" PRIMARY KEY (challenge_id, user_id);


--
-- Name: season PK_8ac0d081dbdb7ab02d166bcda9f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.season
    ADD CONSTRAINT "PK_8ac0d081dbdb7ab02d166bcda9f" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: draft_pokemon PK_d85df1cf783be1d6a52ce2da6e7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.draft_pokemon
    ADD CONSTRAINT "PK_d85df1cf783be1d6a52ce2da6e7" PRIMARY KEY (id);


--
-- Name: version_denied_pokemon PK_d8e5d15304e781067df3ff78b5e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.version_denied_pokemon
    ADD CONSTRAINT "PK_d8e5d15304e781067df3ff78b5e" PRIMARY KEY (id);


--
-- Name: draft REL_7f8870791c03c754b2a5c06f25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.draft
    ADD CONSTRAINT "REL_7f8870791c03c754b2a5c06f25" UNIQUE (challenge_id);


--
-- Name: user UQ_0e506cf94cbfce8d6978e274e27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_0e506cf94cbfce8d6978e274e27" UNIQUE (access_key);


--
-- Name: version_denied_pokemon UQ_607435aeee65de21de737086cb8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.version_denied_pokemon
    ADD CONSTRAINT "UQ_607435aeee65de21de737086cb8" UNIQUE (version_id, pokemon_id);


--
-- Name: draft_pokemon UQ_753a9539325eb84cb18044ea537; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.draft_pokemon
    ADD CONSTRAINT "UQ_753a9539325eb84cb18044ea537" UNIQUE (draft_id, pokemon_id);


--
-- Name: IDX_8d514baa622230d19664f7ad7d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_8d514baa622230d19664f7ad7d" ON public.challenge_users_user USING btree (challenge_id);


--
-- Name: IDX_c0221c88ddbda4f31b74f5be94; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_c0221c88ddbda4f31b74f5be94" ON public.challenge_users_user USING btree (user_id);


--
-- Name: challenge FK_101a93b618219100e80c34d560e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.challenge
    ADD CONSTRAINT "FK_101a93b618219100e80c34d560e" FOREIGN KEY (season_id) REFERENCES public.season(id);


--
-- Name: draft FK_7f8870791c03c754b2a5c06f25f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.draft
    ADD CONSTRAINT "FK_7f8870791c03c754b2a5c06f25f" FOREIGN KEY (challenge_id) REFERENCES public.challenge(id);


--
-- Name: challenge_users_user FK_8d514baa622230d19664f7ad7dd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.challenge_users_user
    ADD CONSTRAINT "FK_8d514baa622230d19664f7ad7dd" FOREIGN KEY (challenge_id) REFERENCES public.challenge(id) ON DELETE CASCADE;


--
-- Name: season FK_af08d05f7f111c6f2a31bb88514; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.season
    ADD CONSTRAINT "FK_af08d05f7f111c6f2a31bb88514" FOREIGN KEY (league_id) REFERENCES public.league(id);


--
-- Name: challenge_users_user FK_c0221c88ddbda4f31b74f5be94f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.challenge_users_user
    ADD CONSTRAINT "FK_c0221c88ddbda4f31b74f5be94f" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: draft_pokemon FK_ed0b77b5ba45915a96f11cee7b3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.draft_pokemon
    ADD CONSTRAINT "FK_ed0b77b5ba45915a96f11cee7b3" FOREIGN KEY (draft_id) REFERENCES public.draft(id);


--
-- PostgreSQL database dump complete
--


      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("SELECT 'Cannot down this migration'");
  }
}
