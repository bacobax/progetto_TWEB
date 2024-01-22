--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 15.2

-- Started on 2024-01-22 10:13:45 CET

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
-- TOC entry 215 (class 1259 OID 23234)
-- Name: clubs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clubs (
    club_id bigint NOT NULL,
    average_age character varying(255),
    club_code character varying(255),
    coach_name character varying(255),
    domestic_competition_id character varying(255),
    foreigners_number character varying(255),
    foreigners_percentage character varying(255),
    last_season character varying(255),
    name character varying(255),
    national_team_players character varying(255),
    net_transfer_record character varying(255),
    squad_size character varying(255),
    stadium_name character varying(255),
    stadium_seats character varying(255),
    total_market_value bigint,
    url character varying(255)
);


ALTER TABLE public.clubs OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 23233)
-- Name: clubs_club_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clubs_club_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clubs_club_id_seq OWNER TO postgres;

--
-- TOC entry 3621 (class 0 OID 0)
-- Dependencies: 214
-- Name: clubs_club_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clubs_club_id_seq OWNED BY public.clubs.club_id;


--
-- TOC entry 216 (class 1259 OID 23242)
-- Name: competitions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competitions (
    competition_code character varying(255),
    competition_id character varying(255) NOT NULL,
    confederation character varying(255),
    country_id character varying(255),
    country_name character varying(255),
    domestic_league_code character varying(255),
    name character varying(255),
    sub_type character varying(255),
    type character varying(255),
    url character varying(255)
);


ALTER TABLE public.competitions OWNER TO postgres;

--
-- TOC entry 3465 (class 2604 OID 23237)
-- Name: clubs club_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clubs ALTER COLUMN club_id SET DEFAULT nextval('public.clubs_club_id_seq'::regclass);


--
-- TOC entry 3614 (class 0 OID 23234)
-- Dependencies: 215
-- Data for Name: clubs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clubs (club_id, average_age, club_code, coach_name, domestic_competition_id, foreigners_number, foreigners_percentage, last_season, name, national_team_players, net_transfer_record, squad_size, stadium_name, stadium_seats, total_market_value, url) FROM stdin;
1082	26.1	losc-lille	\N	FR1	17	70.8	2023	Lille Olympique Sporting Club Lille Métropole	7	+€8.10m	24	Decathlon Arena-Stade Pierre-Mauroy	50186	250325000	https://www.transfermarkt.co.uk/losc-lille/startseite/verein/1082
192	24.0	roda-jc-kerkrade	\N	NL1	9	36.0	2017	Roda JC Kerkrade	0	+€1.30m	25	Parkstad Limburg Stadion	19979	7400000	https://www.transfermarkt.co.uk/roda-jc-kerkrade/startseite/verein/192
1894	27.1	hvidovre-if	\N	DK1	4	13.3	2023	Hvidovre Idrætsforening	2	+€335k	30	PRO VENTILATION Arena	12000	6775000	https://www.transfermarkt.co.uk/hvidovre-if/startseite/verein/1894
4795	24.3	fc-ingolstadt-04	\N	L1	8	28.6	2016	FC Ingolstadt 04	1	+€1.55m	28	Audi Sportpark	15800	5425000	https://www.transfermarkt.co.uk/fc-ingolstadt-04/startseite/verein/4795
190	25.4	fc-kopenhagen	\N	DK1	14	50.0	2023	Football Club København	8	+€9.63m	28	Parken	38065	87510000	https://www.transfermarkt.co.uk/fc-kopenhagen/startseite/verein/190
989	26.4	afc-bournemouth	\N	GB1	20	69.0	2023	Association Football Club Bournemouth	14	€-126.19m	29	Vitality Stadium	11329	368750000	https://www.transfermarkt.co.uk/afc-bournemouth/startseite/verein/989
4102	23.6	carpi-fc-1909	\N	IT1	6	24.0	2015	AC Carpi	1	+-0	25	Sandro Cabassi	5510	575000	https://www.transfermarkt.co.uk/carpi-fc-1909/startseite/verein/4102
1160	25.4	nimes-olympique	\N	FR1	12	46.2	2020	Nîmes Olympique	3	+€2.50m	26	Stade des Antonins	8033	23225000	https://www.transfermarkt.co.uk/nimes-olympique/startseite/verein/1160
5358	27.5	sd-huesca	\N	ES1	8	33.3	2020	SD Huesca	2	+€1.43m	24	El Alcoraz	9128	11600000	https://www.transfermarkt.co.uk/sd-huesca/startseite/verein/5358
2457	24.2	belenenses-sad	\N	PO1	13	52.0	2021	B SAD	4	+€1.80m	25	Estádio Nacional do Jamor	37593	15300000	https://www.transfermarkt.co.uk/belenenses-sad/startseite/verein/2457
2414	25.1	ac-horsens	\N	DK1	9	47.4	2022	AC Horsens	4	+-0	19	Nordstern Arena Horsens	10400	13600000	https://www.transfermarkt.co.uk/ac-horsens/startseite/verein/2414
157	25.7	kaa-gent	\N	BE1	13	52.0	2023	Koninklijke Atletiek Associatie Gent	8	+€2.52m	25	Ghelamco Arena	19999	105825000	https://www.transfermarkt.co.uk/kaa-gent/startseite/verein/157
124	27.4	glasgow-rangers	\N	SC1	22	73.3	2023	Rangers Football Club	8	€-2.85m	30	Ibrox Stadium	50987	151225000	https://www.transfermarkt.co.uk/glasgow-rangers/startseite/verein/124
903	27.5	hibernian-fc	\N	SC1	19	79.2	2023	Hibernian Football Club	5	+€510k	24	Easter Road Stadium	20250	35800000	https://www.transfermarkt.co.uk/hibernian-fc/startseite/verein/903
2727	24.9	oud-heverlee-leuven	\N	BE1	16	59.3	2023	Oud-Heverlee Leuven	3	+-0	27	King Power at Den Dreef Stadion	10020	51425000	https://www.transfermarkt.co.uk/oud-heverlee-leuven/startseite/verein/2727
12	27.4	as-rom	\N	IT1	17	65.4	2023	Associazione Sportiva Roma	17	+€65.20m	26	Olimpico di Roma	73261	418155000	https://www.transfermarkt.co.uk/as-rom/startseite/verein/12
6996	\N	goverla-uzhgorod	\N	UKR1	0	\N	2015	Goverla Uzhgorod (- 2016)	0	+-0	0	Avangard	10640	1425000	https://www.transfermarkt.co.uk/goverla-uzhgorod/startseite/verein/6996
60551	26.9	sk-dnipro-1	\N	UKR1	5	18.5	2023	Sport Klub Dnipro-1	4	+€5.62m	27	Dnipro-Arena	31003	36050000	https://www.transfermarkt.co.uk/sk-dnipro-1/startseite/verein/60551
21957	\N	ao-platanias	\N	GR1	0	\N	2017	AO Platanias	0	+-0	0	Dimotiko Gipedo Perivolia	3700	3185000	https://www.transfermarkt.co.uk/ao-platanias/startseite/verein/21957
2990	25.2	academica-coimbra	\N	PO1	6	23.1	2015	Académica Coimbra	0	+€150k	26	Estádio Cidade de Coimbra	29744	2375000	https://www.transfermarkt.co.uk/academica-coimbra/startseite/verein/2990
993	27.9	fc-cordoba	\N	ES1	4	16.7	2014	Córdoba CF	0	+-0	24	Nuevo Arcángel	21822	1300000	https://www.transfermarkt.co.uk/fc-cordoba/startseite/verein/993
19789	22.9	yeni-malatyaspor	\N	TR1	1	10.0	2021	Yeni Malatyaspor	0	+€778k	10	Yeni Malatya Stadyumu	25745	28160000	https://www.transfermarkt.co.uk/yeni-malatyaspor/startseite/verein/19789
1025	25.3	fc-bologna	\N	IT1	18	69.2	2023	Bologna Football Club 1909	13	€-18.50m	26	Stadio Renato Dall’Ara	36462	205690000	https://www.transfermarkt.co.uk/fc-bologna/startseite/verein/1025
11688	22.5	giresunspor	\N	TR1	1	5.9	2022	Giresunspor	1	+-0	17	Çotanak Spor Kompleksi	21500	23275000	https://www.transfermarkt.co.uk/giresunspor/startseite/verein/11688
603	25.5	cardiff-city	\N	GB1	24	85.7	2018	Cardiff City	8	€-655k	28	Cardiff City Stadium	33280	14675000	https://www.transfermarkt.co.uk/cardiff-city/startseite/verein/603
2079	24.3	veria-nps	\N	GR1	4	13.8	2016	Veria NPS	0	+-0	29	Dimotiko Stadio Verias	6350	1225000	https://www.transfermarkt.co.uk/veria-nps/startseite/verein/2079
105	26.4	sv-darmstadt-98	\N	L1	11	36.7	2023	Sportverein Darmstadt 1898 e. V.	1	€-1.60m	30	Merck-Stadion am Böllenfalltor	17810	36875000	https://www.transfermarkt.co.uk/sv-darmstadt-98/startseite/verein/105
28643	26.8	waasland-beveren	\N	BE1	16	59.3	2020	SK Beveren	3	€-350k	27	Freethielstadion	13290	13635000	https://www.transfermarkt.co.uk/waasland-beveren/startseite/verein/28643
3057	24.6	standard-luttich	\N	BE1	16	61.5	2023	Royal Standard Club de Liège	10	+€1.30m	26	Maurice Dufrasne Stadion	27670	86700000	https://www.transfermarkt.co.uk/standard-luttich/startseite/verein/3057
3690	25.7	ska-khabarovsk	\N	RU1	4	14.8	2017	SKA Khabarovsk	0	€-93k	27	Lenin Stadion	15200	1350000	https://www.transfermarkt.co.uk/ska-khabarovsk/startseite/verein/3690
511	25.9	dundee-fc	\N	SC1	13	54.2	2023	Dundee Football Club	3	+-0	24	Kilmac Stadium at Dens Park	11850	18700000	https://www.transfermarkt.co.uk/dundee-fc/startseite/verein/511
969	25.7	montpellier-hsc	\N	FR1	12	52.2	2023	Montpellier Hérault Sport Club	6	+€31.80m	23	Stade de la Mosson	32939	120125000	https://www.transfermarkt.co.uk/montpellier-hsc/startseite/verein/969
2578	26.9	st-johnstone-fc	\N	SC1	16	57.1	2023	Saint Johnstone Football Club	3	+-0	28	McDiarmid Park	10696	24250000	https://www.transfermarkt.co.uk/st-johnstone-fc/startseite/verein/2578
11127	28.2	ural-ekaterinburg	\N	RU1	13	52.0	2023	FK Ural Yekaterinburg	5	€-770k	25	Yekaterinburg Arena	23000	37150000	https://www.transfermarkt.co.uk/ural-ekaterinburg/startseite/verein/11127
868	27.3	mke-ankaragucu	\N	TR1	17	60.7	2023	Makina ve Kimya Endüstrisi Ankaragücü Spor Kulübü	6	€-3.35m	28	Eryaman Stadyumu	20560	49700000	https://www.transfermarkt.co.uk/mke-ankaragucu/startseite/verein/868
1124	28.0	fakel-voronezh	\N	RU1	3	11.5	2023	FK Fakel Voronezh	1	€-30k	26	Central Stadium of Profsoyuzes	21793	14650000	https://www.transfermarkt.co.uk/fakel-voronezh/startseite/verein/1124
1108	25.8	deportivo-alaves	\N	ES1	9	39.1	2023	Deportivo Alavés S.A.D.	3	€-6.30m	23	Mendizorroza	19840	85550000	https://www.transfermarkt.co.uk/deportivo-alaves/startseite/verein/1108
4	25.2	1-fc-nurnberg	\N	L1	7	21.2	2018	1.FC Nuremberg	2	+€2.63m	33	Max-Morlock-Stadion	50000	12325000	https://www.transfermarkt.co.uk/1-fc-nurnberg/startseite/verein/4
31	26.2	fc-liverpool	\N	GB1	21	80.8	2023	Liverpool Football Club	17	€-111.30m	26	Anfield	54074	968650000	https://www.transfermarkt.co.uk/fc-liverpool/startseite/verein/31
449	25.8	trabzonspor	\N	TR1	16	50.0	2023	Trabzonspor Kulübü	15	€-13.11m	32	Papara Park	40782	157650000	https://www.transfermarkt.co.uk/trabzonspor/startseite/verein/449
595	27.6	sc-bastia	\N	FR1	8	32.0	2016	SC Bastia	6	+€480k	25	Stade Armand-Cesari	16480	4250000	https://www.transfermarkt.co.uk/sc-bastia/startseite/verein/595
3008	25.0	hull-city	\N	GB1	17	60.7	2016	Hull City	6	+€7.50m	28	MKM Stadium	25586	4875000	https://www.transfermarkt.co.uk/hull-city/startseite/verein/3008
4128	26.0	amkar-perm	\N	RU1	0	\N	2017	Amkar Perm	0	+-0	26	Zvezda	17000	4250000	https://www.transfermarkt.co.uk/amkar-perm/startseite/verein/4128
273	24.7	fc-stade-rennes	\N	FR1	10	40.0	2023	Stade Rennais Football Club	7	+€85.60m	25	Roazhon Park	29778	319150000	https://www.transfermarkt.co.uk/fc-stade-rennes/startseite/verein/273
2477	\N	karpaty-lviv	\N	UKR1	0	\N	2019	Karpaty Lviv (-2021)	0	+-0	0	Stadion Ukraina	28051	7110000	https://www.transfermarkt.co.uk/karpaty-lviv/startseite/verein/2477
55686	26.4	metalist-1925-kharkiv	\N	UKR1	3	10.3	2023	TOV FK Metalist 1925 Kharkiv	0	€-175k	29	Livyi Bereg Arena	4700	10575000	https://www.transfermarkt.co.uk/metalist-1925-kharkiv/startseite/verein/55686
1010	26.3	fc-watford	\N	GB1	24	80.0	2021	Watford FC	12	+€42.02m	30	Vicarage Road	21577	61275000	https://www.transfermarkt.co.uk/fc-watford/startseite/verein/1010
13	29.3	atletico-madrid	\N	ES1	14	58.3	2023	Club Atlético de Madrid S.A.D.	15	+€57.30m	24	Civitas Metropolitano	67829	519325000	https://www.transfermarkt.co.uk/atletico-madrid/startseite/verein/13
133	23.1	sc-cambuur-leeuwarden	\N	NL1	4	25.0	2022	SC Cambuur Leeuwarden	3	+-0	16	Cambuurstadion	10250	19225000	https://www.transfermarkt.co.uk/sc-cambuur-leeuwarden/startseite/verein/133
2036	26.2	1-fc-heidenheim-1846	\N	L1	6	21.4	2023	1. Fußballclub Heidenheim 1846	1	€-2.30m	28	Voith-Arena	15000	29000000	https://www.transfermarkt.co.uk/1-fc-heidenheim-1846/startseite/verein/2036
6890	26.1	istanbul-basaksehir-fk	\N	TR1	16	47.1	2023	İstanbul Başakşehir Futbol Kulübü	6	+-0	34	Başakşehir Fatih Terim	17156	72750000	https://www.transfermarkt.co.uk/istanbul-basaksehir-fk/startseite/verein/6890
336	25.0	sporting-lissabon	\N	PO1	13	48.1	2023	Sporting Clube de Portugal	8	+€69.50m	27	Estádio José Alvalade XXI	50095	315125000	https://www.transfermarkt.co.uk/sporting-lissabon/startseite/verein/336
18105	18.3	pfk-lviv	\N	UKR1	0	\N	2022	PFK Lviv	0	+-0	3	Stadion SKIF	3742	11400000	https://www.transfermarkt.co.uk/pfk-lviv/startseite/verein/18105
131	26.7	fc-barcelona	\N	ES1	10	47.6	2023	Futbol Club Barcelona	16	+€102.00m	21	Olímpic Lluís Companys	49472	929500000	https://www.transfermarkt.co.uk/fc-barcelona/startseite/verein/131
83678	26.1	metal-kharkiv	\N	UKR1	7	28.0	2022	Metalist Kharkiv	0	+€300k	25	Avangard	10640	4625000	https://www.transfermarkt.co.uk/metal-kharkiv/startseite/verein/83678
41231	26.9	fk-sochi	\N	RU1	11	40.7	2023	FK Sochi	2	+€3.05m	27	Fisht Olympic Stadium	45994	36725000	https://www.transfermarkt.co.uk/fk-sochi/startseite/verein/41231
1411	\N	raec-mons	\N	BE1	0	\N	2013	RAEC Mons (- 2015)	0	+-0	0	Stade Charles Tondreau	12662	200000	https://www.transfermarkt.co.uk/raec-mons/startseite/verein/1411
2553	25.8	kilmarnock-fc	\N	SC1	11	47.8	2023	Kilmarnock Football Club	2	+-0	23	BBSP Stadium, Rugby Park	18128	20000000	https://www.transfermarkt.co.uk/kilmarnock-fc/startseite/verein/2553
1465	24.8	gd-estoril-praia	\N	PO1	17	58.6	2023	Grupo Desportivo Estoril Praia	2	+€8.00m	29	Estádio António Coimbra da Mota	5000	39850000	https://www.transfermarkt.co.uk/gd-estoril-praia/startseite/verein/1465
4603	24.2	ae-larisa	\N	GR1	6	21.4	2020	AE Larisa	0	+-0	28	Stadio Alkazar	13108	14025000	https://www.transfermarkt.co.uk/ae-larisa/startseite/verein/4603
3911	26.0	stade-brest-29	\N	FR1	7	28.0	2023	Stade brestois 29	3	+€5.10m	25	Stade Francis-Le Blé	15220	96475000	https://www.transfermarkt.co.uk/stade-brest-29/startseite/verein/3911
169	23.5	panionios-athen	\N	GR1	4	11.8	2019	Panionios Athens	0	+-0	34	Stadio Neas Smyrnis	11700	9100000	https://www.transfermarkt.co.uk/panionios-athen/startseite/verein/169
2672	27.5	apo-levadiakos	\N	GR1	17	58.6	2022	APO Levadiakos	0	+-0	31	Stadio Livadias	5915	14375000	https://www.transfermarkt.co.uk/apo-levadiakos/startseite/verein/2672
932	24.5	lokomotiv-moskau	\N	RU1	3	11.1	2023	Футбольный клуб "Локомотив" Москва	9	+€3.48m	27	RZD Arena	27084	112650000	https://www.transfermarkt.co.uk/lokomotiv-moskau/startseite/verein/932
18	25.7	borussia-monchengladbach	\N	L1	17	54.8	2023	Borussia Verein für Leibesübungen 1900 Mönchengladbach	8	€-4.28m	31	Stadion im Borussia-Park	54042	204075000	https://www.transfermarkt.co.uk/borussia-monchengladbach/startseite/verein/18
141	25.9	galatasaray-istanbul	\N	TR1	16	53.3	2023	Galatasaray Spor Kulübü	13	€-11.79m	30	Ali Sami Yen Spor Kompleksi RAMS Park	52223	263450000	https://www.transfermarkt.co.uk/galatasaray-istanbul/startseite/verein/141
7185	24.3	panthrakikos-komotini	\N	GR1	3	10.3	2015	Panthrakikos Komotini	0	+-0	29	Stadio Komotinis OPAP	5601	1350000	https://www.transfermarkt.co.uk/panthrakikos-komotini/startseite/verein/7185
566	\N	beerschot-ac	\N	BE1	0	\N	2012	Beerschot AC	0	+-0	0	Olympisch Stadion	12771	200000	https://www.transfermarkt.co.uk/beerschot-ac/startseite/verein/566
1177	24.0	silkeborg-if	\N	DK1	5	20.0	2023	Silkeborg Idrætsforening	4	+€2.50m	25	JYSK Park	10000	24375000	https://www.transfermarkt.co.uk/silkeborg-if/startseite/verein/1177
3325	26.5	gd-chaves	\N	PO1	15	53.6	2023	Grupo Desportivo de Chaves	4	+€450k	28	Estádio Municipal Eng.º Manuel Branco Teixeira	9000	25025000	https://www.transfermarkt.co.uk/gd-chaves/startseite/verein/3325
3327	27.9	fc-penafiel	\N	PO1	4	14.3	2014	FC Penafiel	0	+-0	28	Estádio Municipal 25 de Abril	5230	\N	https://www.transfermarkt.co.uk/fc-penafiel/startseite/verein/3327
5572	27.2	niki-volou	\N	GR1	7	26.9	2014	Niki Volou	2	+-0	26	Panthessaliko Stadio	22700	\N	https://www.transfermarkt.co.uk/niki-volou/startseite/verein/5572
3426	22.7	esbjerg-fb	\N	DK1	10	37.0	2019	Esbjerg fB	2	+-0	27	Blue Water Arena	16942	8075000	https://www.transfermarkt.co.uk/esbjerg-fb/startseite/verein/3426
1237	26.3	brighton-amp-hove-albion	\N	GB1	19	73.1	2023	Brighton and Hove Albion Football Club	14	+€89.85m	26	AMEX Stadium	31800	510525000	https://www.transfermarkt.co.uk/brighton-amp-hove-albion/startseite/verein/1237
5220	23.3	gs-ergotelis	\N	GR1	0	\N	2014	GS Ergotelis	0	+-0	3	Pankritio Stadio	25780	2050000	https://www.transfermarkt.co.uk/gs-ergotelis/startseite/verein/5220
366	27.2	real-valladolid	\N	ES1	11	50.0	2022	Real Valladolid CF	6	+€2.50m	22	Nuevo José Zorrilla	27618	55575000	https://www.transfermarkt.co.uk/real-valladolid/startseite/verein/366
43	26.7	heart-of-midlothian-fc	\N	SC1	16	57.1	2023	Heart of Midlothian Football Club	6	+€150k	28	Tynecastle Park	19852	30475000	https://www.transfermarkt.co.uk/heart-of-midlothian-fc/startseite/verein/43
6195	26.5	ssc-neapel	\N	IT1	17	63.0	2023	Società Sportiva Calcio Napoli	16	€-26.50m	27	Stadio Diego Armando Maradona	54726	611160000	https://www.transfermarkt.co.uk/ssc-neapel/startseite/verein/6195
458	25.6	palermo-fc	\N	IT1	7	25.0	2016	Palermo FC	4	€-7.94m	28	Comunale Renzo Barbera "La Favorita"	36365	8950000	https://www.transfermarkt.co.uk/palermo-fc/startseite/verein/458
46	29.0	inter-mailand	\N	IT1	16	64.0	2023	Football Club Internazionale Milano S.p.A.	19	+€65.20m	25	Giuseppe Meazza	75923	638810000	https://www.transfermarkt.co.uk/inter-mailand/startseite/verein/46
589	26.5	antalyaspor	\N	TR1	15	44.1	2023	Antalyaspor	5	+€9.43m	34	Corendon Airlines Park Antalya Stadı	32537	57110000	https://www.transfermarkt.co.uk/antalyaspor/startseite/verein/589
1003	27.1	leicester-city	\N	GB1	14	56.0	2022	Leicester City	11	+€26.00m	25	King Power Stadium	32273	192700000	https://www.transfermarkt.co.uk/leicester-city/startseite/verein/1003
4750	23.4	sc-olhanense	\N	PO1	5	50.0	2013	SC Olhanense	0	+-0	10	Estádio José Arcanjo	10080	1500000	https://www.transfermarkt.co.uk/sc-olhanense/startseite/verein/4750
2969	25.8	dijon-fco	\N	FR1	14	48.3	2020	Dijon FCO	4	+€1.50m	29	Stade Gaston-Gérard	16098	22950000	https://www.transfermarkt.co.uk/dijon-fco/startseite/verein/2969
173	24.9	odense-boldklub	\N	DK1	14	53.8	2023	Odense Boldklub	5	+€9.59m	26	Nature Energy Park	15790	25375000	https://www.transfermarkt.co.uk/odense-boldklub/startseite/verein/173
5817	24.0	sonderjyske	\N	DK1	9	30.0	2021	SönderjyskE	1	+€1.80m	30	Sydbank Park	10000	11100000	https://www.transfermarkt.co.uk/sonderjyske/startseite/verein/5817
1436	26.6	sc-beira-mar	\N	PO1	8	30.8	2012	SC Beira-Mar	0	+-0	26	Estádio Municipal de Aveiro	32830	850000	https://www.transfermarkt.co.uk/sc-beira-mar/startseite/verein/1436
1455	23.3	fc-dordrecht	\N	NL1	12	41.4	2014	FC Dordrecht	1	+-0	29	Matchoholic Stadion	4235	825000	https://www.transfermarkt.co.uk/fc-dordrecht/startseite/verein/1455
206	25.9	brondby-if	\N	DK1	11	45.8	2023	Brøndby Idrætsforening	2	+€3.61m	24	Brøndby Stadion	28000	72475000	https://www.transfermarkt.co.uk/brondby-if/startseite/verein/206
16239	\N	desna-chernigiv	\N	UKR1	0	\N	2021	Desna Chernigiv	0	+-0	0	Stadion im. Yuriya Gagarina	12060	3810000	https://www.transfermarkt.co.uk/desna-chernigiv/startseite/verein/16239
39722	26.1	buyuksehir-belediye-erzurumspor	\N	TR1	7	25.0	2020	Erzurumspor FK	1	+€70k	28	Erzurum Kazım Karabekir	23700	11675000	https://www.transfermarkt.co.uk/buyuksehir-belediye-erzurumspor/startseite/verein/39722
200	25.4	fc-utrecht	\N	NL1	14	51.9	2023	Football Club Utrecht	2	+€8.65m	27	Stadion "Galgenwaard"	23750	69325000	https://www.transfermarkt.co.uk/fc-utrecht/startseite/verein/200
995	26.0	fc-nantes	\N	FR1	15	53.6	2023	Football Club de Nantes	8	€-450k	28	Stade de la Beaujoire	37463	150300000	https://www.transfermarkt.co.uk/fc-nantes/startseite/verein/995
41274	23.9	beerschot-v-a-	\N	BE1	12	46.2	2021	Beerschot V.A.	2	+€395k	26	Olympisch Stadion	12771	9450000	https://www.transfermarkt.co.uk/beerschot-v-a-/startseite/verein/41274
82	24.8	vfl-wolfsburg	\N	L1	19	65.5	2023	Verein für Leibesübungen Wolfsburg	12	€-400k	29	Volkswagen Arena	28917	258225000	https://www.transfermarkt.co.uk/vfl-wolfsburg/startseite/verein/82
39097	27.3	fk-obolon-kiew	\N	UKR1	1	4.3	2023	FK Obolon Kyiv	0	€-80k	23	Obolon-Arena	5103	5300000	https://www.transfermarkt.co.uk/fk-obolon-kiew/startseite/verein/39097
2715	23.5	rfc-seraing	\N	BE1	13	59.1	2022	RFC Seraing	2	+€400k	22	Stade du Paray	6744	10000000	https://www.transfermarkt.co.uk/rfc-seraing/startseite/verein/2715
14589	25.7	fk-orenburg	\N	RU1	14	50.0	2023	FC Orenburg	7	€-3.40m	28	Gazovik	10046	31750000	https://www.transfermarkt.co.uk/fk-orenburg/startseite/verein/14589
28956	\N	ael-kalloni	\N	GR1	0	\N	2015	AEL Kalloni	0	+-0	0	Stadio Mytilinis	4000	500000	https://www.transfermarkt.co.uk/ael-kalloni/startseite/verein/28956
1519	24.7	dundee-united-fc	\N	SC1	8	34.8	2022	Dundee United FC	2	+€350k	25	Tannadice Park	14223	17400000	https://www.transfermarkt.co.uk/dundee-united-fc/startseite/verein/1519
4294	28.0	sc-farense	\N	PO1	15	53.6	2023	Sporting Clube Farense	2	+-0	28	Estádio São Luís	7000	22250000	https://www.transfermarkt.co.uk/sc-farense/startseite/verein/4294
6	23.9	adanaspor	\N	TR1	4	40.0	2016	Adanaspor	0	+-0	10	Yeni Adana Stadyumu	33000	1310000	https://www.transfermarkt.co.uk/adanaspor/startseite/verein/6
47	24.3	iraklis-thessaloniki	\N	GR1	9	33.3	2016	Iraklis Thessaloniki	0	+-0	27	Kaftanzoglio Stadio	27770	1450000	https://www.transfermarkt.co.uk/iraklis-thessaloniki/startseite/verein/47
605	28.7	aris-thessaloniki	\N	GR1	24	80.0	2023	Aris Thessalonikis	3	+€7.05m	30	Gipedo "Kleanthis Vikelidis"	22800	50825000	https://www.transfermarkt.co.uk/aris-thessaloniki/startseite/verein/605
3609	23.9	rotor-volgograd	\N	RU1	2	7.4	2020	Rotor Volgograd	0	€-13k	27	Volgograd Arena	45568	6525000	https://www.transfermarkt.co.uk/rotor-volgograd/startseite/verein/3609
3691	\N	tom-tomsk	\N	RU1	0	\N	2016	Tom Tomsk	0	+-0	0	Trud	10028	2775000	https://www.transfermarkt.co.uk/tom-tomsk/startseite/verein/3691
1110	26.7	huddersfield-town	\N	GB1	12	36.4	2018	Huddersfield Town	3	+€11.28m	33	John Smith's Stadium	24500	20075000	https://www.transfermarkt.co.uk/huddersfield-town/startseite/verein/1110
703	27.1	nottingham-forest	\N	GB1	27	84.4	2023	Nottingham Forest Football Club	20	€-57.23m	32	The City Ground	30445	428025000	https://www.transfermarkt.co.uk/nottingham-forest/startseite/verein/703
1071	24.0	wigan-athletic	\N	GB1	8	30.8	2012	Wigan Athletic	2	+€290k	26	DW Stadium	25133	1250000	https://www.transfermarkt.co.uk/wigan-athletic/startseite/verein/1071
6676	26.8	asteras-tripolis	\N	GR1	17	58.6	2023	A.G.S Asteras Tripolis	1	+€100k	29	Gipedo Theodoros Kolokotronis	7423	20935000	https://www.transfermarkt.co.uk/asteras-tripolis/startseite/verein/6676
1159	25.7	as-nancy-lorraine	\N	FR1	5	18.5	2016	AS Nancy-Lorraine	0	+-0	27	Stade Marcel-Picot	20087	1200000	https://www.transfermarkt.co.uk/as-nancy-lorraine/startseite/verein/1159
475	23.8	vv-st-truiden	\N	BE1	14	48.3	2023	Koninklijke Sint-Truidense Voetbalvereniging	5	€-60k	29	Daio Wasabi Stayen Stadium	14600	43225000	https://www.transfermarkt.co.uk/vv-st-truiden/startseite/verein/475
1304	24.3	heracles-almelo	\N	NL1	14	46.7	2023	Heracles Almelo	1	+-0	30	Erve Asito	12080	25710000	https://www.transfermarkt.co.uk/heracles-almelo/startseite/verein/1304
370	25.4	aberdeen-fc	\N	SC1	18	69.2	2023	Aberdeen Football Club	5	+€2.37m	26	Pittodrie Stadium	22199	34625000	https://www.transfermarkt.co.uk/aberdeen-fc/startseite/verein/370
1096	25.1	royal-antwerpen-fc	\N	BE1	14	50.0	2023	Royal Antwerp Football Club	4	+€11.35m	28	De Bosuil	16144	113975000	https://www.transfermarkt.co.uk/royal-antwerpen-fc/startseite/verein/1096
20698	22.0	balikesirspor	\N	TR1	1	4.5	2014	Balikesirspor	0	+-0	22	Balıkesir Atatürk	15800	325000	https://www.transfermarkt.co.uk/balikesirspor/startseite/verein/20698
11126	\N	mordovia-saransk	\N	RU1	0	\N	2015	Mordovia Saransk (-2020)	0	+-0	0	Mordovia Arena	44442	1025000	https://www.transfermarkt.co.uk/mordovia-saransk/startseite/verein/11126
524	\N	gaziantepspor	\N	TR1	0	\N	2016	Gaziantepspor (- 2020)	0	+-0	0	Gaziantep Stadyumu	33502	2525000	https://www.transfermarkt.co.uk/gaziantepspor/startseite/verein/524
2722	26.0	spal	\N	IT1	8	25.0	2019	SPAL	2	+€2.75m	32	Paolo Mazza	16134	13575000	https://www.transfermarkt.co.uk/spal/startseite/verein/2722
20	21.4	bursaspor	\N	TR1	0	\N	2018	Bursaspor	0	+-0	26	Bursa Büyükşehir Belediye Stadyumu	43361	4050000	https://www.transfermarkt.co.uk/bursaspor/startseite/verein/20
130	24.9	parma-calcio-1913	\N	IT1	23	76.7	2020	Parma Calcio 1913	6	€-4.37m	30	Ennio Tardini	22352	38235000	https://www.transfermarkt.co.uk/parma-calcio-1913/startseite/verein/130
1429	26.0	cesena-fc	\N	IT1	4	14.3	2014	Cesena FC	0	+€335k	28	Orogel Stadium - Dino Manuzzi	23860	750000	https://www.transfermarkt.co.uk/cesena-fc/startseite/verein/1429
1031	27.9	luton-town	\N	GB1	12	46.2	2023	Luton Town Football Club	8	€-22.75m	26	Kenilworth Road	11050	87200000	https://www.transfermarkt.co.uk/luton-town/startseite/verein/1031
976	\N	cf-uniao-madeira	\N	PO1	0	\N	2015	CF União Madeira (-2021)	0	+-0	0	Centro Desportivo da Madeira	2500	1800000	https://www.transfermarkt.co.uk/cf-uniao-madeira/startseite/verein/976
12438	\N	volga-nizhniy-novgorod	\N	RU1	0	\N	2013	Volga Nizhniy Novgorod (- 2016)	0	+-0	0	Zentralstadion Lokomotiv	17856	1650000	https://www.transfermarkt.co.uk/volga-nizhniy-novgorod/startseite/verein/12438
20100	\N	fc-vestsjaelland	\N	DK1	0	\N	2014	FC Vestsjaelland	0	+-0	0	Harboe Arena	10000	300000	https://www.transfermarkt.co.uk/fc-vestsjaelland/startseite/verein/20100
553	28.4	ionikos-nikeas	\N	GR1	11	64.7	2022	Ionikos Nikeas	0	+-0	17	Dimotiko Gipedo Neapolis	5500	9350000	https://www.transfermarkt.co.uk/ionikos-nikeas/startseite/verein/553
1423	23.6	fc-valenciennes	\N	FR1	15	50.0	2013	Valenciennes FC	5	+€2.52m	30	Stade du Hainaut	25000	750000	https://www.transfermarkt.co.uk/fc-valenciennes/startseite/verein/1423
642	23.7	de-graafschap-doetinchem	\N	NL1	6	20.0	2018	De Graafschap Doetinchem	0	+-0	30	Stadion "De Vijverberg"	12600	5325000	https://www.transfermarkt.co.uk/de-graafschap-doetinchem/startseite/verein/642
80	27.7	vfl-bochum	\N	L1	14	46.7	2023	Verein für Leibesübungen Bochum 1848 – Fußballgemeinschaft	3	€-2.45m	30	Vonovia Ruhrstadion	26000	67900000	https://www.transfermarkt.co.uk/vfl-bochum/startseite/verein/80
2323	20.0	orduspor	\N	TR1	0	\N	2012	Orduspor	0	+-0	3	19 Eylül Stadyum	11024	0	https://www.transfermarkt.co.uk/orduspor/startseite/verein/2323
16247	\N	pfk-stal-kamyanske	\N	UKR1	0	\N	2017	PFK Stal Kamyanske (-2018)	0	+-0	0	Obolon	5100	2375000	https://www.transfermarkt.co.uk/pfk-stal-kamyanske/startseite/verein/16247
1147	27.5	ac-ajaccio	\N	FR1	11	45.8	2022	AC Ajaccio	6	+-0	24	Stade François-Coty	10446	24000000	https://www.transfermarkt.co.uk/ac-ajaccio/startseite/verein/1147
3329	23.9	fc-famalicao	\N	PO1	19	70.4	2023	Futebol Clube de Famalicão	4	+€10.80m	27	Estádio Municipal de Famalicão	5305	78550000	https://www.transfermarkt.co.uk/fc-famalicao/startseite/verein/3329
15	24.7	bayer-04-leverkusen	\N	L1	21	77.8	2023	Bayer 04 Leverkusen Fußball	19	€-12.10m	27	BayArena	30210	475985000	https://www.transfermarkt.co.uk/bayer-04-leverkusen/startseite/verein/15
1421	25.2	stade-reims	\N	FR1	18	75.0	2023	Stade de Reims	11	+€10.55m	24	Stade Auguste-Delaune	21684	139850000	https://www.transfermarkt.co.uk/stade-reims/startseite/verein/1421
498	\N	ksc-lokeren	\N	BE1	0	\N	2018	KSC Lokeren (- 2020)	0	+-0	0	Daknamstadion	12000	9325000	https://www.transfermarkt.co.uk/ksc-lokeren/startseite/verein/498
162	24.2	as-monaco	\N	FR1	27	100.0	2023	Association sportive de Monaco Football Club	15	€-26.00m	27	Stade Louis-II	17000	377345000	https://www.transfermarkt.co.uk/as-monaco/startseite/verein/162
276	25.8	hellas-verona	\N	IT1	22	66.7	2023	Verona Hellas Football Club	8	+€43.46m	33	Marcantonio Bentegodi	39211	131620000	https://www.transfermarkt.co.uk/hellas-verona/startseite/verein/276
1050	29.1	fc-villarreal	\N	ES1	9	37.5	2023	Villarreal Club de Fútbol S.A.D.	7	+€97.00m	24	La Cerámica	23500	230675000	https://www.transfermarkt.co.uk/fc-villarreal/startseite/verein/1050
6414	\N	metalist-kharkiv	\N	UKR1	0	\N	2015	Metalist Kharkiv (- 2016)	0	+-0	0	OSK Metalist	38685	1150000	https://www.transfermarkt.co.uk/metalist-kharkiv/startseite/verein/6414
3558	26.8	gfc-ajaccio	\N	FR1	1	20.0	2015	GFC Ajaccio	1	+-0	5	Stade Ange-Casanova	4050	900000	https://www.transfermarkt.co.uk/gfc-ajaccio/startseite/verein/3558
2423	25.4	cd-santa-clara	\N	PO1	20	52.6	2022	CD Santa Clara	2	+-0	38	Estádio de São Miguel	12500	35950000	https://www.transfermarkt.co.uk/cd-santa-clara/startseite/verein/2423
1148	26.1	fc-brentford	\N	GB1	20	69.0	2023	Brentford Football Club	16	€-54.76m	29	Gtech Community Stadium	17250	391450000	https://www.transfermarkt.co.uk/fc-brentford/startseite/verein/1148
2288	24.8	swansea-city	\N	GB1	17	77.3	2017	Swansea City	4	+€8.35m	22	Swansea.com Stadium	21088	12525000	https://www.transfermarkt.co.uk/swansea-city/startseite/verein/2288
1186	25.6	torpedo-moskau	\N	RU1	6	23.1	2022	Torpedo Moscow	3	€-2.05m	28	Luzhniki Stadium	81000	16275000	https://www.transfermarkt.co.uk/torpedo-moskau/startseite/verein/1186
24	24.6	eintracht-frankfurt	\N	L1	20	55.6	2023	Eintracht Frankfurt Fußball AG	9	+€85.85m	36	Deutsche Bank Park	56500	202585000	https://www.transfermarkt.co.uk/eintracht-frankfurt/startseite/verein/24
142	26.0	real-saragossa	\N	ES1	6	26.1	2012	Real Zaragoza	1	+€30k	23	La Romareda	33608	500000	https://www.transfermarkt.co.uk/real-saragossa/startseite/verein/142
2381	29.1	sivasspor	\N	TR1	13	46.4	2023	Sivasspor Kulübü	4	+€400k	28	Yeni 4 Eylül Stadı	27532	43675000	https://www.transfermarkt.co.uk/sivasspor/startseite/verein/2381
762	27.7	newcastle-united	\N	GB1	14	48.3	2023	Newcastle United Football Club	12	€-108.60m	29	St James' Park	52338	712925000	https://www.transfermarkt.co.uk/newcastle-united/startseite/verein/762
3709	28.1	fc-getafe	\N	ES1	13	56.5	2023	Getafe Club de Fútbol S.A.D. Team Dubai	6	€-5.00m	23	Coliseum	16800	129500000	https://www.transfermarkt.co.uk/fc-getafe/startseite/verein/3709
10690	23.9	zorya-lugansk	\N	UKR1	5	16.1	2023	FK Zarya Lugansk	2	+€1.75m	31	Livyi Bereg Arena	4700	35025000	https://www.transfermarkt.co.uk/zorya-lugansk/startseite/verein/10690
202	22.9	fc-groningen	\N	NL1	10	34.5	2022	FC Groningen	1	€-586k	29	Euroborg	22555	33850000	https://www.transfermarkt.co.uk/fc-groningen/startseite/verein/202
237	28.7	rcd-mallorca	\N	ES1	11	47.8	2023	Real Club Deportivo Mallorca S.A.D.	6	€-2.30m	23	Mallorca Son Moix	20500	110900000	https://www.transfermarkt.co.uk/rcd-mallorca/startseite/verein/237
16	26.0	borussia-dortmund	\N	L1	13	46.4	2023	Borussia Dortmund	17	+€47.85m	28	SIGNAL IDUNA PARK	81365	482250000	https://www.transfermarkt.co.uk/borussia-dortmund/startseite/verein/16
3336	\N	desportivo-aves	\N	PO1	0	\N	2019	Desportivo Aves (- 2020)	0	+-0	0	Estádio CD das Aves	5441	12500000	https://www.transfermarkt.co.uk/desportivo-aves/startseite/verein/3336
610	23.3	ajax-amsterdam	\N	NL1	16	55.2	2023	AFC Ajax Amsterdam	12	+€47.10m	29	Johan Cruijff ArenA	55600	186050000	https://www.transfermarkt.co.uk/ajax-amsterdam/startseite/verein/610
1162	25.7	sm-caen	\N	FR1	12	44.4	2018	SM Caen	4	+€3.05m	27	Stade Michel-d'Ornano	20500	5325000	https://www.transfermarkt.co.uk/sm-caen/startseite/verein/1162
6993	\N	fk-mariupol	\N	UKR1	0	\N	2021	FK Mariupol	0	+€100k	0	Stadion im. Volodymyra Boyko	12680	4640000	https://www.transfermarkt.co.uk/fk-mariupol/startseite/verein/6993
750	23.0	fc-sochaux-montbeliard	\N	FR1	9	31.0	2013	FC Sochaux-Montbéliard	1	+€6.30m	29	Stade Auguste-Bonal	20005	2600000	https://www.transfermarkt.co.uk/fc-sochaux-montbeliard/startseite/verein/750
499	23.8	vitesse-arnheim	\N	NL1	11	40.7	2023	Stichting Betaald Voetbal Vitesse Arnhem	5	+€750k	27	GelreDome	21248	48550000	https://www.transfermarkt.co.uk/vitesse-arnheim/startseite/verein/499
2832	27.1	gaziantep-fk	\N	TR1	15	46.9	2023	Gaziantep Futbol Kulübü A.Ş.	5	€-585k	32	Kalyon Stadyumu	33502	31200000	https://www.transfermarkt.co.uk/gaziantep-fk/startseite/verein/2832
1283	25.6	fc-emmen	\N	NL1	6	35.3	2022	FC Emmen	0	+-0	17	De Oude Meerdijk	8309	21475000	https://www.transfermarkt.co.uk/fc-emmen/startseite/verein/1283
383	25.2	psv-eindhoven	\N	NL1	14	51.9	2023	Eindhovense Voetbalvereniging Philips Sport Vereniging	11	€-3.53m	27	Philips Stadion	35000	213750000	https://www.transfermarkt.co.uk/psv-eindhoven/startseite/verein/383
2441	28.3	aek-athen	\N	GR1	22	71.0	2023	Athlitiki Enosi Konstantinoupoleos	15	€-9.35m	31	OPAP Arena	32500	91600000	https://www.transfermarkt.co.uk/aek-athen/startseite/verein/2441
1184	23.4	krc-genk	\N	BE1	18	69.2	2023	Koninklijke Racing Club Genk	10	€-13.75m	26	Cegeka Arena	24956	128100000	https://www.transfermarkt.co.uk/krc-genk/startseite/verein/1184
1084	27.9	fc-malaga	\N	ES1	8	29.6	2017	Málaga CF	0	+€950k	27	La Rosaleda	30044	3800000	https://www.transfermarkt.co.uk/fc-malaga/startseite/verein/1084
3060	26.4	atromitos-athen	\N	GR1	16	53.3	2023	APS Atromitos Athinon	3	+-0	30	Stadio Peristeriou	9050	30800000	https://www.transfermarkt.co.uk/atromitos-athen/startseite/verein/3060
265	29.1	panathinaikos-athen	\N	GR1	23	79.3	2023	Panathinaikos Athlitikos Omilos	9	€-7.00m	29	Apostolos Nikolaidis	15000	76825000	https://www.transfermarkt.co.uk/panathinaikos-athen/startseite/verein/265
331	28.4	ca-osasuna	\N	ES1	4	16.7	2023	Club Atlético Osasuna	3	€-6.50m	24	El Sadar	23576	137560000	https://www.transfermarkt.co.uk/ca-osasuna/startseite/verein/331
1041	25.3	olympique-lyon	\N	FR1	15	55.6	2023	Olympique Lyonnais	4	+€87.87m	27	Groupama Stadium	59186	248250000	https://www.transfermarkt.co.uk/olympique-lyon/startseite/verein/1041
2425	27.9	rio-ave-fc	\N	PO1	11	44.0	2023	Rio Ave Futebol Clube	0	+-0	25	Estádio dos Arcos	5300	28725000	https://www.transfermarkt.co.uk/rio-ave-fc/startseite/verein/2425
2861	23.3	kv-oostende	\N	BE1	14	50.0	2022	KV Oostende	2	+-0	26	Diaz Arena	8432	25550000	https://www.transfermarkt.co.uk/kv-oostende/startseite/verein/2861
2451	24.5	inverness-caledonian-thistle-fc	\N	SC1	9	34.6	2016	Inverness Caledonian Thistle FC	0	+-0	26	Tulloch Caledonian Stadium	7750	2175000	https://www.transfermarkt.co.uk/inverness-caledonian-thistle-fc/startseite/verein/2451
128	\N	ao-xanthi	\N	GR1	0	\N	2019	AO Xanthi	0	+-0	0	Xanthi Arena	7361	4975000	https://www.transfermarkt.co.uk/ao-xanthi/startseite/verein/128
42	25.0	hannover-96	\N	L1	6	21.4	2018	Hannover 96	1	€-300k	28	Heinz-von-Heiden-Arena	49000	8300000	https://www.transfermarkt.co.uk/hannover-96/startseite/verein/42
3216	\N	mersin-idmanyurdu	\N	TR1	0	\N	2015	Mersin Talimyurdu SK	0	+-0	0	Mersin Stadyumu	25000	1150000	https://www.transfermarkt.co.uk/mersin-idmanyurdu/startseite/verein/3216
41	23.6	hamburger-sv	\N	L1	15	50.0	2017	Hamburger SV	4	€-6.00m	30	Volksparkstadion	57000	8185000	https://www.transfermarkt.co.uk/hamburger-sv/startseite/verein/41
1531	27.3	fc-elche	\N	ES1	5	27.8	2022	Elche CF	0	+€1.00m	18	Manuel Martínez Valero	31388	50075000	https://www.transfermarkt.co.uk/fc-elche/startseite/verein/1531
244	26.0	olympique-marseille	\N	FR1	21	84.0	2023	Olympique de Marseille	15	€-30.60m	25	Orange Vélodrome	67394	290175000	https://www.transfermarkt.co.uk/olympique-marseille/startseite/verein/244
2431	26.9	cf-estrela-amadora-sad	\N	PO1	19	70.4	2023	Club Football Estrela da Amadora	3	+-0	27	Estádio José Gomes	9288	11125000	https://www.transfermarkt.co.uk/cf-estrela-amadora-sad/startseite/verein/2431
1123	26.0	norwich-city	\N	GB1	17	68.0	2021	Norwich City	12	€-10.33m	25	Carrow Road	27244	54450000	https://www.transfermarkt.co.uk/norwich-city/startseite/verein/1123
367	29.3	rayo-vallecano	\N	ES1	11	45.8	2023	Rayo Vallecano de Madrid S.A.D.	6	€-11.60m	24	Campo de Fútbol de Vallecas	15105	105450000	https://www.transfermarkt.co.uk/rayo-vallecano/startseite/verein/367
1032	23.1	fc-reading	\N	GB1	14	46.7	2012	Reading FC	5	+€3.06m	30	Select Car Leasing Stadium	24161	425000	https://www.transfermarkt.co.uk/fc-reading/startseite/verein/1032
667	24.8	rc-strassburg-alsace	\N	FR1	14	51.9	2023	Racing Club de Strasbourg Alsace	9	€-23.00m	27	Stade de la Meinau	26109	162950000	https://www.transfermarkt.co.uk/rc-strassburg-alsace/startseite/verein/667
2293	27.2	konyaspor	\N	TR1	12	41.4	2023	Konyaspor	4	+€1.80m	29	Medaş Konya Büyükşehir Stadyumu	42000	47975000	https://www.transfermarkt.co.uk/konyaspor/startseite/verein/2293
964	26.9	zenit-st-petersburg	\N	RU1	12	48.0	2023	AO FK Zenit Sankt-Peterburg	8	+€35.12m	25	Gazprom Arena	63026	236425000	https://www.transfermarkt.co.uk/zenit-st-petersburg/startseite/verein/964
2282	24.8	fc-brugge	\N	BE1	18	62.1	2023	Club Brugge Koninklijke Voetbalvereniging	10	+€21.85m	29	Jan-Breydel-Stadion	29062	135025000	https://www.transfermarkt.co.uk/fc-brugge/startseite/verein/2282
1268	23.5	ado-den-haag	\N	NL1	9	26.5	2020	ADO Den Haag	4	+-0	34	Bingoal Stadion	15000	14850000	https://www.transfermarkt.co.uk/ado-den-haag/startseite/verein/1268
5724	25.4	randers-fc	\N	DK1	13	46.4	2023	Randers Fodbold Club	2	+€950k	28	Cepheus Park Randers	10300	30225000	https://www.transfermarkt.co.uk/randers-fc/startseite/verein/5724
3508	25.2	sv-zulte-waregem	\N	BE1	13	52.0	2022	SV Zulte Waregem	3	+€4.00m	25	Elindus Arena	12250	32435000	https://www.transfermarkt.co.uk/sv-zulte-waregem/startseite/verein/3508
40426	\N	fk-tosno	\N	RU1	0	\N	2017	FC Tosno (-2018)	0	+-0	0	Petrovsky	20985	1800000	https://www.transfermarkt.co.uk/fk-tosno/startseite/verein/40426
1244	28.6	cd-leganes	\N	ES1	8	34.8	2019	CD Leganés	3	+€1.00m	23	Butarque	12454	10650000	https://www.transfermarkt.co.uk/cd-leganes/startseite/verein/1244
29228	\N	royal-excel-mouscron	\N	BE1	0	\N	2020	Royal Excel Mouscron (-2022)	0	+€40k	0	Le Canonnier	10830	18775000	https://www.transfermarkt.co.uk/royal-excel-mouscron/startseite/verein/29228
16704	25.1	fk-krasnodar	\N	RU1	13	56.5	2023	FK Krasnodar	11	€-1.63m	23	Stadion Krasnodar	35179	122700000	https://www.transfermarkt.co.uk/fk-krasnodar/startseite/verein/16704
641	26.1	fc-middlesbrough	\N	GB1	8	32.0	2016	Middlesbrough FC	6	+€16.68m	25	Riverside Stadium	33746	10300000	https://www.transfermarkt.co.uk/fc-middlesbrough/startseite/verein/641
23611	\N	olimpik-donetsk	\N	UKR1	0	\N	2020	Olimpik Donetsk	0	+-0	0	NTK im. B. M. Bannikova	1678	3825000	https://www.transfermarkt.co.uk/olimpik-donetsk/startseite/verein/23611
354	24.8	kv-mechelen	\N	BE1	9	33.3	2023	Yellow-Red Koninklijke Voetbalclub Mechelen	2	€-900k	27	AFAS Stadion	16672	39775000	https://www.transfermarkt.co.uk/kv-mechelen/startseite/verein/354
19771	21.0	akhisarspor	\N	TR1	0	\N	2018	Akhisarspor	0	+€5k	14	Spor Toto Akhisar Stadyumu	12139	4130000	https://www.transfermarkt.co.uk/akhisarspor/startseite/verein/19771
443	26.0	vejle-boldklub	\N	DK1	18	72.0	2023	Vejle Boldklub	3	+-0	25	Vejle Stadion	10418	19950000	https://www.transfermarkt.co.uk/vejle-boldklub/startseite/verein/443
14171	27.4	thonon-evian-grand-geneve-fc	\N	FR1	6	22.2	2014	Thonon Évian Grand Genève FC	1	+-0	27	Stade Camille Fournier	2500	2625000	https://www.transfermarkt.co.uk/thonon-evian-grand-geneve-fc/startseite/verein/14171
681	25.4	real-sociedad-san-sebastian	\N	ES1	7	26.9	2023	Real Sociedad de Fútbol S.A.D.	11	€-10.60m	26	Reale Arena	39313	459925000	https://www.transfermarkt.co.uk/real-sociedad-san-sebastian/startseite/verein/681
86	27.0	sv-werder-bremen	\N	L1	10	41.7	2023	Sportverein Werder Bremen von 1899	7	+€23.31m	24	Wohninvest-Weserstadion	42100	113475000	https://www.transfermarkt.co.uk/sv-werder-bremen/startseite/verein/86
380	27.1	us-salernitana-1919	\N	IT1	21	77.8	2023	U.S. Salernitana 1919 S.r.l.	10	€-24.69m	27	Arechi	29739	114300000	https://www.transfermarkt.co.uk/us-salernitana-1919/startseite/verein/380
1506	\N	kardemir-karabukspor	\N	TR1	0	\N	2017	Kardemir Karabükspor	0	+-0	0	Dr. Necmettin Şeyhoğlu	12400	2475000	https://www.transfermarkt.co.uk/kardemir-karabukspor/startseite/verein/1506
1039	25.9	queens-park-rangers	\N	GB1	15	57.7	2014	Queens Park Rangers	8	+€900k	26	Loftus Road Stadium	18360	525000	https://www.transfermarkt.co.uk/queens-park-rangers/startseite/verein/1039
2698	26.8	rubin-kazan	\N	RU1	14	45.2	2023	FC Rubin Kazan	6	€-6.81m	31	Ak Bars Arena	45379	38650000	https://www.transfermarkt.co.uk/rubin-kazan/startseite/verein/2698
601	24.8	kv-kortrijk	\N	BE1	19	65.5	2023	Koninklijke Voetbalclub Kortrijk	5	+€6.00m	29	Guldensporenstadion	9399	41850000	https://www.transfermarkt.co.uk/kv-kortrijk/startseite/verein/601
873	26.4	crystal-palace	\N	GB1	12	44.4	2023	Crystal Palace Football Club	8	€-38.70m	27	Selhurst Park	26047	385450000	https://www.transfermarkt.co.uk/crystal-palace/startseite/verein/873
931	27.9	fc-fulham	\N	GB1	24	92.3	2023	Fulham Football Club	14	€-15.87m	26	Craven Cottage	25700	352500000	https://www.transfermarkt.co.uk/fc-fulham/startseite/verein/931
968	24.9	kvc-westerlo	\N	BE1	19	61.3	2023	Koninklijke Voetbal Club Westerlo	6	€-16.04m	31	Het Kuipje	8035	42750000	https://www.transfermarkt.co.uk/kvc-westerlo/startseite/verein/968
621	27.7	athletic-bilbao	\N	ES1	1	4.0	2023	Athletic Club Bilbao	4	+-0	25	San Mamés	53289	240775000	https://www.transfermarkt.co.uk/athletic-bilbao/startseite/verein/621
2944	23.8	ankaraspor	\N	TR1	1	3.3	2017	Ankaraspor	0	+-0	30	Osmanlı Stadı	19626	1460000	https://www.transfermarkt.co.uk/ankaraspor/startseite/verein/2944
28095	24.4	fk-ufa	\N	RU1	3	11.5	2021	FK Ufa	0	+€4.84m	26	Neftyanik	15132	15025000	https://www.transfermarkt.co.uk/fk-ufa/startseite/verein/28095
338	24.3	dynamo-kiew	\N	UKR1	3	11.1	2023	Futbolniy Klub Dynamo Kyiv	8	+€1.20m	27	Valeriy Lobanovsky Stadion	16873	88725000	https://www.transfermarkt.co.uk/dynamo-kiew/startseite/verein/338
11282	25.9	alanyaspor	\N	TR1	13	44.8	2023	Alanyaspor	5	+€800k	29	Kırbıyık Holding Stadyumu	10128	52800000	https://www.transfermarkt.co.uk/alanyaspor/startseite/verein/11282
1132	25.1	fc-burnley	\N	GB1	25	75.8	2023	Burnley Football Club	15	€-107.25m	33	Turf Moor	21994	273125000	https://www.transfermarkt.co.uk/fc-burnley/startseite/verein/1132
65	24.0	spvgg-greuther-furth	\N	L1	11	39.3	2021	SpVgg Greuther Fürth	2	+€3.97m	28	Sportpark Ronhof | Thomas Sommer	16626	19275000	https://www.transfermarkt.co.uk/spvgg-greuther-furth/startseite/verein/65
468	25.0	sparta-rotterdam	\N	NL1	13	54.2	2023	Sparta Rotterdam	4	€-650k	24	Sparta-stadion - Het Kasteel	11026	41050000	https://www.transfermarkt.co.uk/sparta-rotterdam/startseite/verein/468
618	25.1	as-saint-etienne	\N	FR1	8	27.6	2021	AS Saint-Étienne	3	+€12.85m	29	Stade Geoffroy-Guichard	42000	51975000	https://www.transfermarkt.co.uk/as-saint-etienne/startseite/verein/618
2410	24.8	zska-moskau	\N	RU1	8	33.3	2023	PFK CSKA Moskva	6	+€1.70m	24	VEB Arena	30114	96625000	https://www.transfermarkt.co.uk/zska-moskau/startseite/verein/2410
1083	25.2	fk-rostov	\N	RU1	2	7.7	2023	FK Rostov	6	+€3.10m	26	Rostov Arena	45415	68550000	https://www.transfermarkt.co.uk/fk-rostov/startseite/verein/1083
723	25.2	almere-city-fc	\N	NL1	14	51.9	2023	Almere City Football Club	1	+-0	27	Yanmar Stadion	4500	14575000	https://www.transfermarkt.co.uk/almere-city-fc/startseite/verein/723
2700	\N	anzhi-makhachkala	\N	RU1	0	\N	2018	Anzhi Makhachkala ( -2022)	0	+-0	0	RDYuSSh MinObrNauki RD Politekh Makhachkala	1600	9375000	https://www.transfermarkt.co.uk/anzhi-makhachkala/startseite/verein/2700
2671	25.9	pas-giannina	\N	GR1	14	43.8	2023	Panipirotikos Athlitikos Syllogos Giannina	0	+-0	32	Stadio Zosimades	7652	19975000	https://www.transfermarkt.co.uk/pas-giannina/startseite/verein/2671
2999	22.8	hamilton-academical-fc	\N	SC1	9	32.1	2020	Hamilton Academical FC	0	+-0	28	Fountain of Youth Stadium	6018	8300000	https://www.transfermarkt.co.uk/hamilton-academical-fc/startseite/verein/2999
506	26.7	juventus-turin	\N	IT1	14	53.8	2023	Juventus Football Club	16	€-21.60m	26	Allianz Stadium	41507	450625000	https://www.transfermarkt.co.uk/juventus-turin/startseite/verein/506
3368	27.5	ud-levante	\N	ES1	6	26.1	2021	Levante UD	0	+€7.80m	23	Ciutat de València	26354	31375000	https://www.transfermarkt.co.uk/ud-levante/startseite/verein/3368
385	25.6	fortuna-sittard	\N	NL1	17	70.8	2023	Fortuna Sittardia Combinatie	3	€-500k	24	Fortuna Sittard Stadion	12500	39375000	https://www.transfermarkt.co.uk/fortuna-sittard/startseite/verein/385
1435	24.7	go-ahead-eagles-deventer	\N	NL1	10	37.0	2023	Go Ahead Eagles	2	€-850k	27	De Adelaarshorst	9909	23125000	https://www.transfermarkt.co.uk/go-ahead-eagles-deventer/startseite/verein/1435
6646	27.4	fatih-karagumruk	\N	TR1	16	57.1	2023	Fatih Karagümrük Sportif Faaliyetler San. Tic. A.Ş.	6	+€2.50m	28	Atatürk Olimpiyat	74753	46050000	https://www.transfermarkt.co.uk/fatih-karagumruk/startseite/verein/6646
2760	27.9	partick-thistle-fc	\N	SC1	1	5.3	2017	Partick Thistle FC	0	+-0	19	The Energy Check Stadium at Firhill	10102	4075000	https://www.transfermarkt.co.uk/partick-thistle-fc/startseite/verein/2760
820	26.1	genclerbirligi-ankara	\N	TR1	10	29.4	2020	Genclerbirligi Ankara	1	+€195k	34	Eryaman Stadyumu	20560	13375000	https://www.transfermarkt.co.uk/genclerbirligi-ankara/startseite/verein/820
583	25.7	fc-paris-saint-germain	\N	FR1	17	58.6	2023	Paris Saint-Germain Football Club	19	€-146.50m	29	Parc des Princes	49691	1221900000	https://www.transfermarkt.co.uk/fc-paris-saint-germain/startseite/verein/583
924	25.9	istanbulspor	\N	TR1	14	46.7	2023	İstanbulspor A.Ş.	5	€-400k	30	Esenyurt Necmi Kadıoğlu Stadyumu	7500	17950000	https://www.transfermarkt.co.uk/istanbulspor/startseite/verein/924
985	26.4	manchester-united	\N	GB1	22	71.0	2023	Manchester United Football Club	22	€-148.06m	31	Old Trafford	74879	939675000	https://www.transfermarkt.co.uk/manchester-united/startseite/verein/985
371	25.6	celtic-glasgow	\N	SC1	26	78.8	2023	The Celtic Football Club	17	+€12.50m	33	Celtic Park	60832	169400000	https://www.transfermarkt.co.uk/celtic-glasgow/startseite/verein/371
150	28.5	real-betis-sevilla	\N	ES1	14	53.8	2023	Real Betis Balompié S.A.D.	7	+€43.50m	26	Benito Villamarín	60721	264050000	https://www.transfermarkt.co.uk/real-betis-sevilla/startseite/verein/150
6992	25.7	chornomorets-odessa	\N	UKR1	5	23.8	2023	ZAO FK Chornomorets Odessa	0	+-0	21	Stadion Chornomorets (2011)	34164	13960000	https://www.transfermarkt.co.uk/chornomorets-odessa/startseite/verein/6992
26459	27.3	nk-veres-rivne	\N	UKR1	2	7.7	2023	NK Veres Rivne	0	+-0	26	Stadion Avangard (2022)	7122	8925000	https://www.transfermarkt.co.uk/nk-veres-rivne/startseite/verein/26459
152	26.9	samsunspor	\N	TR1	15	48.4	2023	Samsunspor	5	€-3.85m	31	Samsun Yeni 19 Mayıs Stadyumu	33919	34500000	https://www.transfermarkt.co.uk/samsunspor/startseite/verein/152
683	26.9	olympiakos-piraus	\N	GR1	23	71.9	2023	Olympiakos Syndesmos Filathlon Peiraios	8	+€8.07m	32	Stadio Georgios Karaiskakis	32115	176425000	https://www.transfermarkt.co.uk/olympiakos-piraus/startseite/verein/683
18303	23.9	fk-oleksandriya	\N	UKR1	3	10.7	2023	FK Oleksandriya	1	+€1.32m	28	KSK Nika	7000	12075000	https://www.transfermarkt.co.uk/fk-oleksandriya/startseite/verein/18303
4171	26.7	benevento-calcio	\N	IT1	16	51.6	2020	Benevento Calcio	2	€-1.93m	31	Ciro Vigorito	16867	18470000	https://www.transfermarkt.co.uk/benevento-calcio/startseite/verein/4171
22110	24.6	fc-helsingor	\N	DK1	4	17.4	2017	FC Helsingör	1	+€320k	23	Helsingør Ny Stadion	4000	1500000	https://www.transfermarkt.co.uk/fc-helsingor/startseite/verein/22110
121	25.8	dinamo-moskau	\N	RU1	11	40.7	2023	FK Dinamo Moskva	9	+€7.60m	27	VTB-Arena	25716	91700000	https://www.transfermarkt.co.uk/dinamo-moskau/startseite/verein/121
7179	22.8	cd-tondela	\N	PO1	12	46.2	2021	CD Tondela	2	+€50k	26	Estádio João Cardoso	5000	20525000	https://www.transfermarkt.co.uk/cd-tondela/startseite/verein/7179
2921	24.6	delfino-pescara-1936	\N	IT1	6	21.4	2016	Delfino Pescara 1936	1	+€4.60m	28	Adriatico	20476	6375000	https://www.transfermarkt.co.uk/delfino-pescara-1936/startseite/verein/2921
317	24.5	fc-twente-enschede	\N	NL1	10	38.5	2023	Football Club Twente	3	+€7.10m	26	De Grolsch Veste	30205	70000000	https://www.transfermarkt.co.uk/fc-twente-enschede/startseite/verein/317
89	27.5	1-fc-union-berlin	\N	L1	16	57.1	2023	1. FC Union Berlin	11	€-29.90m	28	Stadion An der Alten Försterei	22012	211675000	https://www.transfermarkt.co.uk/1-fc-union-berlin/startseite/verein/89
16245	\N	fk-sevastopol	\N	UKR1	0	\N	2013	FK Sevastopol (- 2014)	0	+-0	0	SK Sevastopol	5826	425000	https://www.transfermarkt.co.uk/fk-sevastopol/startseite/verein/16245
6574	26.5	us-sassuolo	\N	IT1	15	55.6	2023	Unione Sportiva Sassuolo Calcio	8	+€40.52m	27	Mapei Stadium - Città del Tricolore	21584	193150000	https://www.transfermarkt.co.uk/us-sassuolo/startseite/verein/6574
24245	25.8	umraniyespor	\N	TR1	3	30.0	2022	Ümraniyespor	1	+-0	12	Ümraniye Belediyesi Şehir Stadı	3513	9175000	https://www.transfermarkt.co.uk/umraniyespor/startseite/verein/24245
940	26.7	celta-vigo	\N	ES1	11	45.8	2023	Real Club Celta de Vigo S. A. D.	8	+€19.50m	24	Abanca Balaídos	29000	183600000	https://www.transfermarkt.co.uk/celta-vigo/startseite/verein/940
2919	27.0	ac-monza	\N	IT1	11	36.7	2023	Associazione Calcio Monza	3	€-41.50m	30	U-Power Stadium - Brianteo	16917	115400000	https://www.transfermarkt.co.uk/ac-monza/startseite/verein/2919
2703	\N	spartak-vladikavkaz	\N	RU1	0	\N	2012	Spartak Vladikavkaz (-2020)	0	+-0	0	Republican Stadium Spartak	32464	475000	https://www.transfermarkt.co.uk/spartak-vladikavkaz/startseite/verein/2703
1416	24.1	amiens-sc	\N	FR1	10	41.7	2019	Amiens SC	7	+€700k	24	Stade Crédit Agricole la Licorne	12999	11975000	https://www.transfermarkt.co.uk/amiens-sc/startseite/verein/1416
2420	25.3	vitoria-guimaraes-sc	\N	PO1	13	43.3	2023	Vitória Sport Clube	3	+€16.26m	30	Estádio D. Afonso Henriques	30029	76025000	https://www.transfermarkt.co.uk/vitoria-guimaraes-sc/startseite/verein/2420
2439	\N	kuban-krasnodar	\N	RU1	0	\N	2015	Kuban Krasnodar (-2018)	0	+-0	0	Kuban Stadium	31654	4075000	https://www.transfermarkt.co.uk/kuban-krasnodar/startseite/verein/2439
398	27.4	lazio-rom	\N	IT1	17	58.6	2023	Società Sportiva Lazio S.p.A.	11	+€10.44m	29	Olimpico di Roma	73261	344420000	https://www.transfermarkt.co.uk/lazio-rom/startseite/verein/398
3524	27.0	clermont-foot-63	\N	FR1	15	62.5	2023	Clermont Foot 63	6	€-2.10m	24	Stade Gabriel-Montpied	13000	67500000	https://www.transfermarkt.co.uk/clermont-foot-63/startseite/verein/3524
3	25.6	1-fc-koln	\N	L1	8	25.8	2023	1. Fußball-Club Köln	6	+€200k	31	RheinEnergieSTADION	50000	120175000	https://www.transfermarkt.co.uk/1-fc-koln/startseite/verein/3
418	27.7	real-madrid	\N	ES1	15	65.2	2023	Real Madrid Club de Fútbol	19	€-122.50m	23	Santiago Bernabéu	81044	1080375000	https://www.transfermarkt.co.uk/real-madrid/startseite/verein/418
3209	29.7	pendikspor	\N	TR1	13	48.1	2023	Pendikspor	3	€-3.10m	27	Pendik Stadı	2500	24850000	https://www.transfermarkt.co.uk/pendikspor/startseite/verein/3209
1420	24.2	sco-angers	\N	FR1	12	44.4	2022	Angers SCO	5	+€3.50m	27	Stade Raymond Kopa	19350	49675000	https://www.transfermarkt.co.uk/sco-angers/startseite/verein/1420
1095	23.1	es-troyes-ac	\N	FR1	16	57.1	2022	ESTAC Troyes	5	+-0	29	Stade de l'Aube	21877	32900000	https://www.transfermarkt.co.uk/es-troyes-ac/startseite/verein/1095
720	26.6	fc-porto	\N	PO1	18	64.3	2023	Futebol Clube do Porto	9	+€34.10m	28	Estádio do Dragão	50033	360000000	https://www.transfermarkt.co.uk/fc-porto/startseite/verein/720
339	\N	dnipro-dnipropetrovsk	\N	UKR1	0	\N	2016	Dnipro Dnipropetrovsk (-2020)	0	+-0	0	Meteor	24381	1575000	https://www.transfermarkt.co.uk/dnipro-dnipropetrovsk/startseite/verein/339
2696	25.6	krylya-sovetov-samara	\N	RU1	7	25.9	2023	PFK Krylya Sovetov Samara	5	€-1.23m	27	Solidarnost Samara Arena	42347	48900000	https://www.transfermarkt.co.uk/krylya-sovetov-samara/startseite/verein/2696
167	25.2	fc-augsburg	\N	L1	20	62.5	2023	FC Augsburg 1907	6	+€17.45m	32	WWK ARENA	30660	139625000	https://www.transfermarkt.co.uk/fc-augsburg/startseite/verein/167
1467	23.3	goztepe	\N	TR1	10	32.3	2021	Göztepe	0	+€1.60m	31	Gürsel Aksel Stadyumu	19713	15660000	https://www.transfermarkt.co.uk/goztepe/startseite/verein/1467
1387	25.5	acn-siena-1904	\N	IT1	2	10.0	2012	Siena FC	0	+-0	20	Artemio Franchi	15373	45000	https://www.transfermarkt.co.uk/acn-siena-1904/startseite/verein/1387
23826	25.5	rasenballsport-leipzig	\N	L1	18	66.7	2023	RasenBallsport Leipzig	19	+€88.20m	27	Red Bull Arena	47069	424050000	https://www.transfermarkt.co.uk/rasenballsport-leipzig/startseite/verein/23826
2424	24.9	gil-vicente-fc	\N	PO1	17	60.7	2023	Gil Vicente Futebol Clube	3	+€7.90m	28	Estádio Cidade de Barcelos	12046	44375000	https://www.transfermarkt.co.uk/gil-vicente-fc/startseite/verein/2424
1390	27.5	cagliari-calcio	\N	IT1	14	46.7	2023	Cagliari Calcio	8	€-8.60m	30	Unipol Domus	16416	94510000	https://www.transfermarkt.co.uk/cagliari-calcio/startseite/verein/1390
289	23.5	afc-sunderland	\N	GB1	12	46.2	2016	Sunderland AFC	6	€-6.06m	26	Stadium of Light	48707	13575000	https://www.transfermarkt.co.uk/afc-sunderland/startseite/verein/289
738	25.5	ac-le-havre	\N	FR1	17	56.7	2023	Le Havre Athletic Club	7	€-2.90m	30	Stade Océane	25178	55400000	https://www.transfermarkt.co.uk/ac-le-havre/startseite/verein/738
2687	29.1	fc-cadiz	\N	ES1	8	28.6	2023	Cádiz Club de Fútbol S.A.D	2	+€3.50m	28	Nuevo Mirandilla	21094	77650000	https://www.transfermarkt.co.uk/fc-cadiz/startseite/verein/2687
281	27.2	manchester-city	\N	GB1	17	70.8	2023	Manchester City Football Club	21	€-126.60m	24	Etihad Stadium	55017	1328575000	https://www.transfermarkt.co.uk/manchester-city/startseite/verein/281
39	27.0	1-fsv-mainz-05	\N	L1	12	48.0	2023	1. Fußball- und Sportverein Mainz 05	6	+€14.55m	25	Mewa Arena	33305	141800000	https://www.transfermarkt.co.uk/1-fsv-mainz-05/startseite/verein/39
1627	26.0	catania-calcio	\N	IT1	5	18.5	2013	Catania FC	0	€-101k	27	Cibali - Angelo Massimino	20204	1685000	https://www.transfermarkt.co.uk/catania-calcio/startseite/verein/1627
3719	24.7	fk-khimki	\N	RU1	7	26.9	2022	FK Khimki	1	€-595k	26	Arena Khimki	18636	22485000	https://www.transfermarkt.co.uk/fk-khimki/startseite/verein/3719
63007	28.7	lnz-lebedyn	\N	UKR1	0	\N	2023	LNZ Cherkasy	0	€-150k	26	Cherkasy-Arena	10321	7050000	https://www.transfermarkt.co.uk/lnz-lebedyn/startseite/verein/63007
3302	25.4	ud-almeria	\N	ES1	14	53.8	2023	Unión Deportiva Almería S.A.D.	6	€-8.90m	26	Power Horse Stadium	18331	108800000	https://www.transfermarkt.co.uk/ud-almeria/startseite/verein/3302
61825	25.5	fk-minaj	\N	UKR1	1	3.7	2023	FK Minaj	0	€-60k	27	Minaj-Arena	1312	12575000	https://www.transfermarkt.co.uk/fk-minaj/startseite/verein/61825
826	26.2	rc-lens	\N	FR1	15	51.7	2023	Racing Club de Lens	12	+€3.64m	29	Stade Bollaert-Delelis	38223	262100000	https://www.transfermarkt.co.uk/rc-lens/startseite/verein/826
5219	28.1	aok-kerkyra	\N	GR1	1	12.5	2017	AOK Kerkyra	0	+-0	8	Ethniko Stadio Kerkyras	3000	5550000	https://www.transfermarkt.co.uk/aok-kerkyra/startseite/verein/5219
678	25.0	aarhus-gf	\N	DK1	11	39.3	2023	Aarhus Gymnastik Forening	3	+€11.93m	28	Ceres Park	19433	39250000	https://www.transfermarkt.co.uk/aarhus-gf/startseite/verein/678
441	27.3	apollon-smyrnis	\N	GR1	15	55.6	2021	Apollon Smyrnis	0	+-0	27	Stadio Neas Smyrnis	11700	11675000	https://www.transfermarkt.co.uk/apollon-smyrnis/startseite/verein/441
660	24.1	shakhtar-donetsk	\N	UKR1	11	32.4	2023	FC Shakhtar Donetsk	16	€-2.05m	34	Arena Lviv	34725	153025000	https://www.transfermarkt.co.uk/shakhtar-donetsk/startseite/verein/660
2227	\N	sk-tavriya-simferopol	\N	UKR1	0	\N	2013	SK Tavriya Simferopol ( - 2022)	0	+-0	0	RS Lokomotiv	19978	635000	https://www.transfermarkt.co.uk/sk-tavriya-simferopol/startseite/verein/2227
60	26.5	sc-freiburg	\N	L1	9	33.3	2023	Sport-Club Freiburg	9	+€35.30m	27	Europa-Park Stadion	34700	180200000	https://www.transfermarkt.co.uk/sc-freiburg/startseite/verein/60
3840	27.5	adana-demirspor	\N	TR1	16	51.6	2023	Adana Demirspor Kulübü	7	+€750k	31	Yeni Adana Stadyumu	33000	69050000	https://www.transfermarkt.co.uk/adana-demirspor/startseite/verein/3840
5818	24.8	hobro-ik	\N	DK1	4	18.2	2019	Hobro IK	2	+-0	22	DS Arena	7500	2350000	https://www.transfermarkt.co.uk/hobro-ik/startseite/verein/5818
60949	26.4	volos-nps	\N	GR1	16	55.2	2023	Neos Podosferikos Syllogos Volou	1	+-0	29	Panthessaliko Stadio	22700	30425000	https://www.transfermarkt.co.uk/volos-nps/startseite/verein/60949
1063	23.4	viborg-ff	\N	DK1	14	56.0	2023	Viborg Fodsports Forening	2	+€6.49m	25	Viborg Stadion	10000	20525000	https://www.transfermarkt.co.uk/viborg-ff/startseite/verein/1063
512	26.7	stoke-city	\N	GB1	9	37.5	2017	Stoke City	6	+€17.00m	24	bet365 Stadium	30089	6875000	https://www.transfermarkt.co.uk/stoke-city/startseite/verein/512
543	26.1	wolverhampton-wanderers	\N	GB1	22	84.6	2023	Wolverhampton Wanderers Football Club	14	+€75.20m	26	Molineux Stadium	32050	386475000	https://www.transfermarkt.co.uk/wolverhampton-wanderers/startseite/verein/543
5	26.3	ac-mailand	\N	IT1	22	75.9	2023	Associazione Calcio Milan	15	€-47.40m	29	Giuseppe Meazza	75923	559825000	https://www.transfermarkt.co.uk/ac-mailand/startseite/verein/5
8838	27.4	zirka-kropyvnytskyi	\N	UKR1	0	\N	2017	Zirka Kropyvnytskyi	0	+-0	7	Zirka	14628	3275000	https://www.transfermarkt.co.uk/zirka-kropyvnytskyi/startseite/verein/8838
16795	28.3	fc-granada	\N	ES1	7	29.2	2023	Granada Club de Fútbol S.A.D.	4	€-6.50m	24	Nuevo Los Cármenes	19336	102300000	https://www.transfermarkt.co.uk/fc-granada/startseite/verein/16795
987	26.3	motherwell-fc	\N	SC1	15	68.2	2023	Motherwell Football Club	5	+€586k	22	Fir Park	13750	25935000	https://www.transfermarkt.co.uk/motherwell-fc/startseite/verein/987
4482	\N	volyn-lutsk	\N	UKR1	0	\N	2016	Volyn Lutsk	0	+-0	0	Stadion Avangard	12080	1100000	https://www.transfermarkt.co.uk/volyn-lutsk/startseite/verein/4482
3729	27.4	arsenal-tula	\N	RU1	2	7.4	2021	Arsenal Tula	1	+€1.80m	27	Arsenal	19241	16275000	https://www.transfermarkt.co.uk/arsenal-tula/startseite/verein/3729
3999	28.8	pas-lamia-1964	\N	GR1	19	55.9	2023	PAS Lamia 1964	3	+-0	34	Stadio Lamia "Athanasios Diakos"	5500	22010000	https://www.transfermarkt.co.uk/pas-lamia-1964/startseite/verein/3999
126	24.6	caykur-rizespor	\N	TR1	18	50.0	2023	Çaykur Rizespor Kulübü	6	€-3.41m	36	Çaykur Didi	15332	47295000	https://www.transfermarkt.co.uk/caykur-rizespor/startseite/verein/126
430	25.2	ac-florenz	\N	IT1	16	51.6	2023	Associazione Calcio Fiorentina	10	+€17.42m	31	Artemio Franchi	43147	299400000	https://www.transfermarkt.co.uk/ac-florenz/startseite/verein/430
7775	24.9	hatayspor	\N	TR1	15	50.0	2023	Hatayspor Futbol Kulübü	6	+€7.19m	30	Mersin Stadyumu	25000	50350000	https://www.transfermarkt.co.uk/hatayspor/startseite/verein/7775
11	25.8	fc-arsenal	\N	GB1	18	72.0	2023	Arsenal Football Club	20	€-167.04m	25	Emirates Stadium	60704	1127100000	https://www.transfermarkt.co.uk/fc-arsenal/startseite/verein/11
405	27.2	aston-villa	\N	GB1	19	73.1	2023	Aston Villa Football Club	17	€-60.45m	26	Villa Park	42682	681525000	https://www.transfermarkt.co.uk/aston-villa/startseite/verein/405
897	27.7	deportivo-la-coruna	\N	ES1	3	12.5	2017	Deportivo de La Coruña	0	€-435k	24	Abanca Riazor	32912	10800000	https://www.transfermarkt.co.uk/deportivo-la-coruna/startseite/verein/897
204	\N	lierse-sk	\N	BE1	0	\N	2014	Lierse SK (- 2018)	0	+-0	0	Herman Vanderpoortenstadion	14538	3125000	https://www.transfermarkt.co.uk/lierse-sk/startseite/verein/204
252	27.0	genua-cfc	\N	IT1	20	74.1	2023	Genoa Cricket and Football Club	9	€-17.38m	27	Luigi Ferraris	34901	138760000	https://www.transfermarkt.co.uk/genua-cfc/startseite/verein/252
2239	25.4	us-cremonese	\N	IT1	9	30.0	2022	US Cremonese	2	+€5.00m	29	Giovanni Zini	16003	46175000	https://www.transfermarkt.co.uk/us-cremonese/startseite/verein/2239
7378	24.7	portimonense-sc	\N	PO1	20	74.1	2023	Portimonense Futebol SAD	2	+€3.45m	27	Portimonense Estádio	6000	52175000	https://www.transfermarkt.co.uk/portimonense-sc/startseite/verein/7378
8970	25.4	frosinone-calcio	\N	IT1	17	56.7	2023	Frosinone Calcio S.r.l.	3	+€8.85m	30	Benito Stirpe	16227	75125000	https://www.transfermarkt.co.uk/frosinone-calcio/startseite/verein/8970
3592	25.2	kryvbas-kryvyi-rig	\N	UKR1	8	25.0	2023	FK Kryvbas Kryvyi Rig	3	+€560k	32	Girnyk	2500	10200000	https://www.transfermarkt.co.uk/kryvbas-kryvyi-rig/startseite/verein/3592
9007	\N	arsenal-kiew	\N	UKR1	0	\N	2018	Arsenal Kyiv	0	+-0	0	NSK Olimpisky	70050	2100000	https://www.transfermarkt.co.uk/arsenal-kiew/startseite/verein/9007
350	25.9	sheffield-united	\N	GB1	18	60.0	2023	Sheffield United Football Club	8	€-33.55m	30	Bramall Lane	32702	164400000	https://www.transfermarkt.co.uk/sheffield-united/startseite/verein/350
1426	22.9	vvv-venlo	\N	NL1	7	25.0	2020	VVV-Venlo	0	+-0	28	Covebo Stadion - De Koel	8000	9525000	https://www.transfermarkt.co.uk/vvv-venlo/startseite/verein/1426
41201	\N	pfk-tambov	\N	RU1	0	\N	2020	PFK Tambov (-2021)	0	+-0	0	Mordovia Arena	44149	8650000	https://www.transfermarkt.co.uk/pfk-tambov/startseite/verein/41201
1245	24.3	kas-eupen	\N	BE1	19	65.5	2023	Königliche Allgemeine Sportvereinigung Eupen	7	+€1.10m	29	Kehrweg-Stadion	8331	48760000	https://www.transfermarkt.co.uk/kas-eupen/startseite/verein/1245
714	25.4	espanyol-barcelona	\N	ES1	6	23.1	2022	RCD Espanyol Barcelona	4	+€5.50m	26	RCDE Stadium	40500	70750000	https://www.transfermarkt.co.uk/espanyol-barcelona/startseite/verein/714
23	25.6	eintracht-braunschweig	\N	L1	11	36.7	2013	Eintracht Braunschweig	2	+€750k	30	EINTRACHT-Stadion	23325	1300000	https://www.transfermarkt.co.uk/eintracht-braunschweig/startseite/verein/23
1210	24.1	as-livorno	\N	IT1	5	17.2	2013	US Livorno 1915	0	+-0	29	Armando Picchi	19238	6725000	https://www.transfermarkt.co.uk/as-livorno/startseite/verein/1210
33	26.4	fc-schalke-04	\N	L1	12	44.4	2022	FC Schalke 04	4	+€10.30m	27	Veltins-Arena	62271	30125000	https://www.transfermarkt.co.uk/fc-schalke-04/startseite/verein/33
862	\N	chievo-verona	\N	IT1	0	\N	2018	Chievo Verona	0	+-0	0	Marcantonio Bentegodi	31045	10935000	https://www.transfermarkt.co.uk/chievo-verona/startseite/verein/862
369	25.7	lyngby-bk	\N	DK1	8	33.3	2023	Lyngby Boldklubben af 1921	4	+€2.20m	24	Lyngby Stadion	10000	16725000	https://www.transfermarkt.co.uk/lyngby-bk/startseite/verein/369
2783	\N	metalurg-donetsk	\N	UKR1	0	\N	2014	Metalurg Donetsk (- 2015)	0	+-0	0	Metalurg	5090	200000	https://www.transfermarkt.co.uk/metalurg-donetsk/startseite/verein/2783
6912	25.4	fc-vizela	\N	PO1	19	73.1	2023	Futebol Clube de Vizela	3	+€1.80m	26	Estádio do Vizela	6565	28125000	https://www.transfermarkt.co.uk/fc-vizela/startseite/verein/6912
127	25.7	sc-paderborn-07	\N	L1	5	19.2	2019	SC Paderborn 07	1	€-450k	26	Home Deluxe Arena	15000	11875000	https://www.transfermarkt.co.uk/sc-paderborn-07/startseite/verein/127
3725	27.3	akhmat-grozny	\N	RU1	12	44.4	2023	RFK Akhmat Grozny	5	€-950k	27	Akhmat-Arena	30200	40725000	https://www.transfermarkt.co.uk/akhmat-grozny/startseite/verein/3725
1038	24.3	sampdoria-genua	\N	IT1	5	15.6	2022	UC Sampdoria	4	+€1.75m	33	Luigi Ferraris	36348	66995000	https://www.transfermarkt.co.uk/sampdoria-genua/startseite/verein/1038
1533	28.3	sd-eibar	\N	ES1	5	19.2	2020	SD Eibar	0	+€2.60m	26	Ipurua	8164	21300000	https://www.transfermarkt.co.uk/sd-eibar/startseite/verein/1533
520	23.6	cercle-brugge	\N	BE1	15	62.5	2023	Cercle Brugge Koninklijke Sportvereniging	4	+€12.00m	24	Jan-Breydel-Stadion	29062	45225000	https://www.transfermarkt.co.uk/cercle-brugge/startseite/verein/520
653	28.4	ofi-kreta	\N	GR1	15	57.7	2023	Omilos Filathlon Irakliou FC	4	+€1.80m	26	Gipedo Theodoros Vardinogiannis	9088	24450000	https://www.transfermarkt.co.uk/ofi-kreta/startseite/verein/653
2448	26.2	sporting-gijon	\N	ES1	10	35.7	2016	Sporting Gijón	2	+€5.23m	28	El Molinón - Enrique Castro Quini	29029	3650000	https://www.transfermarkt.co.uk/sporting-gijon/startseite/verein/2448
1005	24.0	us-lecce	\N	IT1	23	74.2	2023	Unione Sportiva Lecce	7	+€3.78m	31	Ettore Giardiniero	31559	105905000	https://www.transfermarkt.co.uk/us-lecce/startseite/verein/1005
1091	27.2	paok-thessaloniki	\N	GR1	21	72.4	2023	Panthessalonikios Athlitikos Omilos Konstantinoupoliton	9	+€6.55m	29	Toumba Stadium	28703	98875000	https://www.transfermarkt.co.uk/paok-thessaloniki/startseite/verein/1091
12321	27.2	fc-girona	\N	ES1	11	44.0	2023	Girona Fútbol Club S. A. D.	7	€-4.35m	25	Montilivi	13286	177100000	https://www.transfermarkt.co.uk/fc-girona/startseite/verein/12321
180	24.5	fc-southampton	\N	GB1	20	69.0	2022	Southampton FC	13	+€2.40m	29	St Mary's Stadium	32384	178300000	https://www.transfermarkt.co.uk/fc-southampton/startseite/verein/180
1241	27.6	livingston-fc	\N	SC1	16	55.2	2023	Livingston Football Club	2	+-0	29	Tony Macaroni Arena	9512	20825000	https://www.transfermarkt.co.uk/livingston-fc/startseite/verein/1241
2375	25.3	altay-sk	\N	TR1	3	9.7	2021	Altay SK	0	+€1.42m	31	Alsancak Mustafa Denizli Stadı	15000	8975000	https://www.transfermarkt.co.uk/altay-sk/startseite/verein/2375
19	25.1	brescia-calcio	\N	IT1	12	42.9	2019	Brescia Calcio	1	+€3.65m	28	Mario Rigamonti	19550	20875000	https://www.transfermarkt.co.uk/brescia-calcio/startseite/verein/19
798	23.6	sbv-excelsior-rotterdam	\N	NL1	12	41.4	2023	Excelsior Rotterdam	1	+€173k	29	Van Donge & De Roo Stadion - Woudestein	4400	24175000	https://www.transfermarkt.co.uk/sbv-excelsior-rotterdam/startseite/verein/798
6418	26.0	panetolikos-gfs	\N	GR1	12	41.4	2023	Panetolikos Agrinio	3	+-0	29	Gipedo Panetolikou	7321	27825000	https://www.transfermarkt.co.uk/panetolikos-gfs/startseite/verein/6418
982	25.0	cd-nacional	\N	PO1	12	44.4	2020	CD Nacional	2	+-0	27	Estádio da Madeira	5586	14950000	https://www.transfermarkt.co.uk/cd-nacional/startseite/verein/982
19657	25.1	vendsyssel-ff	\N	DK1	7	29.2	2018	Vendsyssel FF	0	€-20k	24	Nord Energi Arena	10000	2150000	https://www.transfermarkt.co.uk/vendsyssel-ff/startseite/verein/19657
2741	27.1	baltika-kaliningrad	\N	RU1	11	44.0	2023	FK Baltika	2	€-1.05m	25	Rostech Arena	35000	16450000	https://www.transfermarkt.co.uk/baltika-kaliningrad/startseite/verein/2741
1269	25.5	pec-zwolle	\N	NL1	11	42.3	2023	Prins Hendrik Ende Desespereert Nimmer Combinatie Zwolle	0	+€4.75m	26	MAC³PARK stadion	14000	26900000	https://www.transfermarkt.co.uk/pec-zwolle/startseite/verein/1269
48332	27.1	kolos-kovalivka	\N	UKR1	4	14.3	2023	FK Kolos Kovalivka	0	+€300k	28	Kolos	5050	14250000	https://www.transfermarkt.co.uk/kolos-kovalivka/startseite/verein/48332
467	24.3	nec-nijmegen	\N	NL1	11	39.3	2023	Nijmegen Eendracht Combinatie	1	+€2.68m	28	Goffertstadion	12500	38110000	https://www.transfermarkt.co.uk/nec-nijmegen/startseite/verein/467
44	24.1	hertha-bsc	\N	L1	14	38.9	2022	Hertha BSC	7	+€6.70m	36	Olympiastadion Berlin	74667	39325000	https://www.transfermarkt.co.uk/hertha-bsc/startseite/verein/44
865	25.7	fc-midtjylland	\N	DK1	18	69.2	2023	Fodbold Club Midtjylland	8	€-3.63m	26	MCH Arena	11535	79060000	https://www.transfermarkt.co.uk/fc-midtjylland/startseite/verein/865
4083	27.0	fc-crotone	\N	IT1	6	24.0	2020	FC Crotone	1	+€3.90m	25	Ezio Scida	16640	11610000	https://www.transfermarkt.co.uk/fc-crotone/startseite/verein/4083
1053	24.5	aalborg-bk	\N	DK1	10	37.0	2022	Aalborg BK	0	+€350k	27	Aalborg Portland Park	13800	27750000	https://www.transfermarkt.co.uk/aalborg-bk/startseite/verein/1053
38	25.9	fortuna-dusseldorf	\N	L1	12	41.4	2019	Fortuna Düsseldorf	2	+€600k	29	MERKUR SPIEL-ARENA	54600	17000000	https://www.transfermarkt.co.uk/fortuna-dusseldorf/startseite/verein/38
347	25.3	fc-metz	\N	FR1	22	73.3	2023	Football Club de Metz	10	+€23.10m	30	Stade Saint-Symphorien	28786	68800000	https://www.transfermarkt.co.uk/fc-metz/startseite/verein/347
132	23.7	nac-breda	\N	NL1	10	31.3	2018	NAC Breda	2	+€115k	32	Rat Verlegh Stadion	19000	6650000	https://www.transfermarkt.co.uk/nac-breda/startseite/verein/132
10484	25.8	kasimpasa	\N	TR1	11	44.0	2023	Kasımpaşa Spor Kulübü	3	€-1.00m	25	Recep Tayyip Erdoğan Stadyumu	13856	47175000	https://www.transfermarkt.co.uk/kasimpasa/startseite/verein/10484
1075	27.8	sc-braga	\N	PO1	15	57.7	2023	Sporting Clube de Braga	8	€-6.70m	26	Estádio Municipal de Braga	30286	150250000	https://www.transfermarkt.co.uk/sc-braga/startseite/verein/1075
631	23.8	fc-chelsea	\N	GB1	20	66.7	2023	Chelsea Football Club	20	€-192.70m	30	Stamford Bridge	40853	1077975000	https://www.transfermarkt.co.uk/fc-chelsea/startseite/verein/631
416	25.4	fc-turin	\N	IT1	21	80.8	2023	Torino Calcio	12	€-33.40m	26	Stadio Olimpico Grande Torino	28177	211285000	https://www.transfermarkt.co.uk/fc-turin/startseite/verein/416
1049	25.1	fc-valencia	\N	ES1	9	39.1	2023	Valencia Club de Fútbol S. A. D.	7	+€14.00m	23	Mestalla	49430	199025000	https://www.transfermarkt.co.uk/fc-valencia/startseite/verein/1049
306	24.7	sc-heerenveen	\N	NL1	11	47.8	2023	Sportclub Heerenveen	5	+€3.10m	23	Abe Lenstra Stadion	27224	54400000	https://www.transfermarkt.co.uk/sc-heerenveen/startseite/verein/306
3948	25.3	royale-union-saint-gilloise	\N	BE1	19	76.0	2023	Royale Union Saint-Gilloise	6	+€19.15m	25	Stade Joseph Mariën	8000	42725000	https://www.transfermarkt.co.uk/royale-union-saint-gilloise/startseite/verein/3948
3205	26.0	kayserispor	\N	TR1	14	46.7	2023	Kayserispor Kulübü	6	+-0	30	RHG Enertürk Enerji Stadyumu	32864	44260000	https://www.transfermarkt.co.uk/kayserispor/startseite/verein/3205
399	24.6	leeds-united	\N	GB1	18	66.7	2022	Leeds United	9	+€930k	27	Elland Road	37890	181700000	https://www.transfermarkt.co.uk/leeds-united/startseite/verein/399
290	24.3	aj-auxerre	\N	FR1	15	55.6	2022	AJ Auxerre	6	+-0	26	Stade de l'Abbé-Deschamps	18541	25400000	https://www.transfermarkt.co.uk/aj-auxerre/startseite/verein/290
3385	26.4	panserraikos	\N	GR1	14	41.2	2023	Panserraikos Serres	5	+-0	34	Dimotiko Gipedo Serron	9500	10300000	https://www.transfermarkt.co.uk/panserraikos/startseite/verein/3385
2292	25.3	elazigspor	\N	TR1	0	\N	2013	Elazigspor	0	+-0	28	Elazığ Stadyumu	23000	125000	https://www.transfermarkt.co.uk/elazigspor/startseite/verein/2292
30120	27.3	ae-kifisias	\N	GR1	14	50.0	2023	Athlitiki Enosi Kifisias	2	+-0	28	Gipedo Kesarianis "Michalis Kritikopoulos"	0	9125000	https://www.transfermarkt.co.uk/ae-kifisias/startseite/verein/30120
29	27.3	fc-everton	\N	GB1	11	44.0	2023	Everton Football Club	6	+€42.30m	25	Goodison Park	39571	431725000	https://www.transfermarkt.co.uk/fc-everton/startseite/verein/29
27	26.8	fc-bayern-munchen	\N	L1	13	52.0	2023	FC Bayern München	17	+€23.25m	25	Allianz Arena	75024	944625000	https://www.transfermarkt.co.uk/fc-bayern-munchen/startseite/verein/27
465	26.5	st-mirren-fc	\N	SC1	17	77.3	2023	Saint Mirren Football Club	6	€-146k	22	The SMISA Stadium	8023	19090000	https://www.transfermarkt.co.uk/st-mirren-fc/startseite/verein/465
749	26.0	fc-empoli	\N	IT1	12	41.4	2023	Empoli Football Club S.r.l.	8	+€40.80m	29	Carlo Castellani	19847	123685000	https://www.transfermarkt.co.uk/fc-empoli/startseite/verein/749
53646	26.8	fk-polissya-zhytomyr	\N	UKR1	6	22.2	2023	FK Polissya Zhytomyr	1	€-750k	27	Tsentralnyi Polissya	5928	10050000	https://www.transfermarkt.co.uk/fk-polissya-zhytomyr/startseite/verein/53646
10	25.3	arminia-bielefeld	\N	L1	15	55.6	2021	Arminia Bielefeld	4	+€5.90m	27	SchücoArena	26515	20175000	https://www.transfermarkt.co.uk/arminia-bielefeld/startseite/verein/10
2759	26.3	ross-county-fc	\N	SC1	15	55.6	2023	Ross County Football Club	1	€-70k	27	Global Energy Stadium	6541	26100000	https://www.transfermarkt.co.uk/ross-county-fc/startseite/verein/2759
2778	22.6	fc-nordsjaelland	\N	DK1	13	43.3	2023	Fodbold Club Nordsjælland	3	+€17.35m	30	Right to Dream Park	10300	54675000	https://www.transfermarkt.co.uk/fc-nordsjaelland/startseite/verein/2778
3268	25.9	casa-pia-ac	\N	PO1	15	55.6	2023	Casa Pia Atlético Clube	5	+€2.28m	27	Estádio Municipal de Rio Maior	6925	20425000	https://www.transfermarkt.co.uk/casa-pia-ac/startseite/verein/3268
415	23.4	fc-toulouse	\N	FR1	23	76.7	2023	Toulouse Football Club	10	+€200k	30	Stadium Municipal	33150	104375000	https://www.transfermarkt.co.uk/fc-toulouse/startseite/verein/415
833	25.8	denizlispor	\N	TR1	3	11.1	2020	Denizlispor	1	+-0	27	Denizli Atatürk Stadı	18745	5650000	https://www.transfermarkt.co.uk/denizlispor/startseite/verein/833
3349	25.0	cd-feirense	\N	PO1	11	45.8	2018	CD Feirense	2	+€325k	24	Estádio Marcolino de Castro	5401	4625000	https://www.transfermarkt.co.uk/cd-feirense/startseite/verein/3349
232	25.6	spartak-moskau	\N	RU1	9	33.3	2023	FK Spartak Moskva	13	€-19.50m	27	Otkrytie Bank Arena	44571	118250000	https://www.transfermarkt.co.uk/spartak-moskau/startseite/verein/232
379	28.4	west-ham-united	\N	GB1	18	72.0	2023	West Ham United Football Club	14	+€18.84m	25	London Stadium	62500	501300000	https://www.transfermarkt.co.uk/west-ham-united/startseite/verein/379
417	24.2	ogc-nizza	\N	FR1	15	50.0	2023	Olympique Gymnaste Club Nice Côte d'Azur	12	€-27.10m	30	Allianz Riviera	36178	262100000	https://www.transfermarkt.co.uk/ogc-nizza/startseite/verein/417
6994	\N	metalurg-zaporizhya-bis-2016-	\N	UKR1	0	\N	2015	Metalurg Zaporizhya (-2016)	0	+-0	0	Slavutych Arena	11883	675000	https://www.transfermarkt.co.uk/metalurg-zaporizhya-bis-2016-/startseite/verein/6994
48726	23.9	rukh-lviv	\N	UKR1	5	15.6	2023	FC Rukh Lviv	1	+-0	32	Arena Lviv	34725	14550000	https://www.transfermarkt.co.uk/rukh-lviv/startseite/verein/48726
2995	25.5	fc-pacos-de-ferreira	\N	PO1	17	50.0	2022	FC Paços de Ferreira	1	+-0	32	Estádio Capital do Móvel	9076	33850000	https://www.transfermarkt.co.uk/fc-pacos-de-ferreira/startseite/verein/2995
825	23.9	eskisehirspor	\N	TR1	1	2.4	2015	Eskisehirspor	0	+-0	41	Eskişehir Yeni Stadyum	34930	5975000	https://www.transfermarkt.co.uk/eskisehirspor/startseite/verein/825
148	26.2	tottenham-hotspur	\N	GB1	21	72.4	2023	Tottenham Hotspur Football Club	22	€-130.40m	29	Tottenham Hotspur Stadium	62062	786650000	https://www.transfermarkt.co.uk/tottenham-hotspur/startseite/verein/148
403	25.9	willem-ii-tilburg	\N	NL1	7	25.9	2021	Willem II Tilburg	0	+€385k	27	Koning Willem II Stadion	14700	21350000	https://www.transfermarkt.co.uk/willem-ii-tilburg/startseite/verein/403
1090	23.5	az-alkmaar	\N	NL1	10	34.5	2023	Alkmaar Zaanstreek	5	+€48.17m	29	AFAS Stadion	19478	87575000	https://www.transfermarkt.co.uk/az-alkmaar/startseite/verein/1090
1158	25.1	fc-lorient	\N	FR1	14	46.7	2023	Football Club Lorient-Bretagne Sud	10	+€37.70m	30	Stade du Moustoir	19010	124325000	https://www.transfermarkt.co.uk/fc-lorient/startseite/verein/1158
855	25.4	ea-guingamp	\N	FR1	7	25.9	2018	EA Guingamp	1	+€3.70m	27	Stade du Roudourou	18120	8100000	https://www.transfermarkt.co.uk/ea-guingamp/startseite/verein/855
172	24.9	rsc-charleroi	\N	BE1	20	66.7	2023	Royal Charleroi Sporting Club	8	+€850k	30	Stade du Pays de Charleroi	15000	49275000	https://www.transfermarkt.co.uk/rsc-charleroi/startseite/verein/172
58	26.1	rsc-anderlecht	\N	BE1	14	53.8	2023	Royal Sporting Club Anderlecht	10	+€9.50m	26	Lotto Park	21500	135850000	https://www.transfermarkt.co.uk/rsc-anderlecht/startseite/verein/58
6894	\N	kayseri-erciyesspor	\N	TR1	0	\N	2014	Kayseri Erciyesspor	0	+-0	0	Kayseri Atatürk Spor Kompleksi Yan Açık Saha	2000	225000	https://www.transfermarkt.co.uk/kayseri-erciyesspor/startseite/verein/6894
49702	26.1	fk-nizhny-novgorod	\N	RU1	9	36.0	2023	FK Nizhny Novgorod	4	+€1.03m	25	Nizhny Novgorod Stadium	44242	26025000	https://www.transfermarkt.co.uk/fk-nizhny-novgorod/startseite/verein/49702
368	29.0	fc-sevilla	\N	ES1	18	66.7	2023	Sevilla Fútbol Club S.A.D.	8	€-5.50m	27	Ramón Sánchez-Pizjuán	43883	237075000	https://www.transfermarkt.co.uk/fc-sevilla/startseite/verein/368
8024	25.9	fc-arouca	\N	PO1	21	75.0	2023	Futebol Clube de Arouca	1	+€5.24m	28	Estádio Municipal de Arouca	5600	33375000	https://www.transfermarkt.co.uk/fc-arouca/startseite/verein/8024
2740	24.8	vorskla-poltava	\N	UKR1	8	32.0	2023	Vorskla Poltava	1	+€900k	25	Vorskla im. Oleksiy Butovskyi	23842	23235000	https://www.transfermarkt.co.uk/vorskla-poltava/startseite/verein/2740
234	24.3	feyenoord-rotterdam	\N	NL1	14	51.9	2023	Feyenoord Rotterdam	16	€-500k	27	Stadion Feyenoord "De Kuip"	47500	234450000	https://www.transfermarkt.co.uk/feyenoord-rotterdam/startseite/verein/234
724	22.8	fc-volendam	\N	NL1	14	48.3	2023	Football Club Volendam	3	+€1.80m	29	Kras Stadion	7384	16575000	https://www.transfermarkt.co.uk/fc-volendam/startseite/verein/724
1301	27.2	cs-maritimo	\N	PO1	19	65.5	2022	CS Marítimo	2	+€200k	29	Estádio do Marítimo	10600	33150000	https://www.transfermarkt.co.uk/cs-maritimo/startseite/verein/1301
235	25.7	rkc-waalwijk	\N	NL1	13	48.1	2023	Rooms Katholieke Combinatie Waalwijk	3	+-0	27	Mandemakers Stadion	7508	21450000	https://www.transfermarkt.co.uk/rkc-waalwijk/startseite/verein/235
79	24.0	vfb-stuttgart	\N	L1	11	37.9	2023	Verein für Bewegungsspiele Stuttgart 1893	6	+€27.55m	29	MHPArena Stuttgart	60449	134175000	https://www.transfermarkt.co.uk/vfb-stuttgart/startseite/verein/79
979	26.0	moreirense-fc	\N	PO1	17	65.4	2023	Moreirense Futebol Clube	2	€-2.05m	26	Estádio C. J. de Almeida Freitas	6153	35625000	https://www.transfermarkt.co.uk/moreirense-fc/startseite/verein/979
3522	24.4	spezia-calcio	\N	IT1	25	78.1	2022	Spezia Calcio	11	€-3.95m	32	Alberto Picco	11676	59660000	https://www.transfermarkt.co.uk/spezia-calcio/startseite/verein/3522
114	27.4	besiktas-istanbul	\N	TR1	16	50.0	2023	Beşiktaş Jimnastik Kulübü	13	€-14.50m	32	Tüpraş Stadyumu	42590	161460000	https://www.transfermarkt.co.uk/besiktas-istanbul/startseite/verein/114
2503	24.6	boavista-porto-fc	\N	PO1	14	50.0	2023	Boavista Futebol Clube	4	€-2.60m	28	Estádio do Bessa Século XXI	28263	56210000	https://www.transfermarkt.co.uk/boavista-porto-fc/startseite/verein/2503
800	27.2	atalanta-bergamo	\N	IT1	17	68.0	2023	Atalanta Bergamasca Calcio S.p.a.	15	+€87.00m	25	Gewiss Stadium	21747	385365000	https://www.transfermarkt.co.uk/atalanta-bergamo/startseite/verein/800
607	25.6	venezia-fc	\N	IT1	17	63.0	2021	Venezia FC	5	+€4.83m	27	Pier Luigi Penzo	11150	29525000	https://www.transfermarkt.co.uk/venezia-fc/startseite/verein/607
984	27.8	west-bromwich-albion	\N	GB1	8	32.0	2020	West Bromwich Albion	4	€-1.35m	25	The Hawthorns	26850	61185000	https://www.transfermarkt.co.uk/west-bromwich-albion/startseite/verein/984
68608	25.7	cf-os-belenenses	\N	PO1	5	16.7	2017	CF Os Belenenses	0	+-0	30	Estádio do Restelo	19980	4450000	https://www.transfermarkt.co.uk/cf-os-belenenses/startseite/verein/68608
533	26.2	tsg-1899-hoffenheim	\N	L1	13	43.3	2023	TSG 1899 Hoffenheim Fußball-Spielbetriebs GmbH	13	€-7.30m	30	PreZero Arena	30150	171450000	https://www.transfermarkt.co.uk/tsg-1899-hoffenheim/startseite/verein/533
1085	26.0	vitoria-setubal-fc	\N	PO1	10	34.5	2019	Vitória Setúbal FC	0	+-0	29	Estádio do Bonfim	18642	11300000	https://www.transfermarkt.co.uk/vitoria-setubal-fc/startseite/verein/1085
54189	25.2	rwd-molenbeek	\N	BE1	18	56.3	2023	Racing White Daring Molenbeek	2	€-25.45m	32	Edmond Machtensstadion	11000	21600000	https://www.transfermarkt.co.uk/rwd-molenbeek/startseite/verein/54189
410	25.1	udinese-calcio	\N	IT1	31	86.1	2023	Udinese Calcio	8	+€5.56m	36	Bluenergy Stadium	25144	186960000	https://www.transfermarkt.co.uk/udinese-calcio/startseite/verein/410
3714	25.6	enisey-krasnoyarsk	\N	RU1	2	7.7	2018	Enisey Krasnoyarsk	1	+€601k	26	Zentralstadion Krasnoyarsk	15000	4110000	https://www.transfermarkt.co.uk/enisey-krasnoyarsk/startseite/verein/3714
472	27.1	ud-las-palmas	\N	ES1	8	30.8	2023	Unión Deportiva Las Palmas S.A.D.	3	€-4.80m	26	Estadio de Gran Canaria	32400	59950000	https://www.transfermarkt.co.uk/ud-las-palmas/startseite/verein/472
40	22.7	fc-girondins-bordeaux	\N	FR1	13	50.0	2021	FC Girondins Bordeaux	6	+€12.70m	26	Matmut Atlantique	42115	30025000	https://www.transfermarkt.co.uk/fc-girondins-bordeaux/startseite/verein/40
49364	25.7	ingulets-petrove	\N	UKR1	2	8.3	2022	Ingulets Petrove	0	+€100k	23	Stadion Ingulets	1720	6235000	https://www.transfermarkt.co.uk/ingulets-petrove/startseite/verein/49364
294	25.7	benfica-lissabon	\N	PO1	15	60.0	2023	Sport Lisboa e Benfica	12	€-49.42m	25	Estádio da Luz	64642	422500000	https://www.transfermarkt.co.uk/benfica-lissabon/startseite/verein/294
36	27.8	fenerbahce-istanbul	\N	TR1	16	55.2	2023	Fenerbahçe Spor Kulübü	16	€-1.36m	29	Ülker Stadyumu FB Şükrü Saraçoğlu Spor Kompleksi	47834	240625000	https://www.transfermarkt.co.uk/fenerbahce-istanbul/startseite/verein/36
\.


--
-- TOC entry 3615 (class 0 OID 23242)
-- Dependencies: 216
-- Data for Name: competitions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.competitions (competition_code, competition_id, confederation, country_id, country_name, domestic_league_code, name, sub_type, type, url) FROM stdin;
italy-cup	CIT	europa	75	Italy	IT1	italy-cup	domestic_cup	domestic_cup	https://www.transfermarkt.co.uk/italy-cup/startseite/wettbewerb/CIT
johan-cruijff-schaal	NLSC	europa	122	Netherlands	NL1	johan-cruijff-schaal	domestic_super_cup	other	https://www.transfermarkt.co.uk/johan-cruijff-schaal/startseite/wettbewerb/NLSC
kypello-elladas	GRP	europa	56	Greece	GR1	kypello-elladas	domestic_cup	domestic_cup	https://www.transfermarkt.co.uk/kypello-elladas/startseite/wettbewerb/GRP
supertaca-candido-de-oliveira	POSU	europa	136	Portugal	PO1	supertaca-candido-de-oliveira	domestic_super_cup	other	https://www.transfermarkt.co.uk/supertaca-candido-de-oliveira/startseite/wettbewerb/POSU
russian-super-cup	RUSS	europa	141	Russia	RU1	russian-super-cup	domestic_super_cup	other	https://www.transfermarkt.co.uk/russian-super-cup/startseite/wettbewerb/RUSS
supercopa	SUC	europa	157	Spain	ES1	supercopa	domestic_super_cup	other	https://www.transfermarkt.co.uk/supercopa/startseite/wettbewerb/SUC
uefa-super-cup	USC	europa	-1	\N	\N	uefa-super-cup	uefa_super_cup	other	https://www.transfermarkt.co.uk/uefa-super-cup/startseite/pokalwettbewerb/USC
superligaen	DK1	europa	39	Denmark	DK1	superligaen	first_tier	domestic_league	https://www.transfermarkt.co.uk/superligaen/startseite/wettbewerb/DK1
europa-league	EL	europa	-1	\N	\N	europa-league	europa_league	international_cup	https://www.transfermarkt.co.uk/europa-league/startseite/pokalwettbewerb/EL
laliga	ES1	europa	157	Spain	ES1	laliga	first_tier	domestic_league	https://www.transfermarkt.co.uk/laliga/startseite/wettbewerb/ES1
ligue-1	FR1	europa	50	France	FR1	ligue-1	first_tier	domestic_league	https://www.transfermarkt.co.uk/ligue-1/startseite/wettbewerb/FR1
serie-a	IT1	europa	75	Italy	IT1	serie-a	first_tier	domestic_league	https://www.transfermarkt.co.uk/serie-a/startseite/wettbewerb/IT1
eredivisie	NL1	europa	122	Netherlands	NL1	eredivisie	first_tier	domestic_league	https://www.transfermarkt.co.uk/eredivisie/startseite/wettbewerb/NL1
russian-cup	RUP	europa	141	Russia	RU1	russian-cup	domestic_cup	domestic_cup	https://www.transfermarkt.co.uk/russian-cup/startseite/wettbewerb/RUP
liga-portugal-bwin	PO1	europa	136	Portugal	PO1	liga-portugal-bwin	first_tier	domestic_league	https://www.transfermarkt.co.uk/liga-portugal-bwin/startseite/wettbewerb/PO1
belgian-supercup	BESC	europa	19	Belgium	BE1	belgian-supercup	domestic_super_cup	other	https://www.transfermarkt.co.uk/belgian-supercup/startseite/wettbewerb/BESC
premier-league	GB1	europa	189	England	GB1	premier-league	first_tier	domestic_league	https://www.transfermarkt.co.uk/premier-league/startseite/wettbewerb/GB1
europa-league-qualifikation	ELQ	europa	-1	\N	\N	europa-league-qualifikation	europa_league_qualifying	international_cup	https://www.transfermarkt.co.uk/europa-league-qualifikation/startseite/pokalwettbewerb/ELQ
efl-cup	CGB	europa	189	England	GB1	efl-cup	league_cup	other	https://www.transfermarkt.co.uk/efl-cup/startseite/wettbewerb/CGB
sydbank-pokalen	DKP	europa	39	Denmark	DK1	sydbank-pokalen	domestic_cup	domestic_cup	https://www.transfermarkt.co.uk/sydbank-pokalen/startseite/wettbewerb/DKP
uefa-europa-conference-league-qualifikation	ECLQ	europa	-1	\N	\N	uefa-europa-conference-league-qualifikation	uefa_europa_conference_league_qualifiers	international_cup	https://www.transfermarkt.co.uk/uefa-europa-conference-league-qualifikation/startseite/pokalwettbewerb/ECLQ
fa-cup	FAC	europa	189	England	GB1	fa-cup	domestic_cup	domestic_cup	https://www.transfermarkt.co.uk/fa-cup/startseite/wettbewerb/FAC
toto-knvb-beker	NLP	europa	122	Netherlands	NL1	toto-knvb-beker	domestic_cup	domestic_cup	https://www.transfermarkt.co.uk/toto-knvb-beker/startseite/wettbewerb/NLP
ukrainian-super-cup	UKRS	europa	177	Ukraine	UKR1	ukrainian-super-cup	domestic_super_cup	other	https://www.transfermarkt.co.uk/ukrainian-super-cup/startseite/wettbewerb/UKRS
premier-liga	UKR1	europa	177	Ukraine	UKR1	premier-liga	first_tier	domestic_league	https://www.transfermarkt.co.uk/premier-liga/startseite/wettbewerb/UKR1
copa-del-rey	CDR	europa	157	Spain	ES1	copa-del-rey	domestic_cup	domestic_cup	https://www.transfermarkt.co.uk/copa-del-rey/startseite/wettbewerb/CDR
uefa-champions-league	CL	europa	-1	\N	\N	uefa-champions-league	uefa_champions_league	international_cup	https://www.transfermarkt.co.uk/uefa-champions-league/startseite/pokalwettbewerb/CL
super-league-1	GR1	europa	56	Greece	GR1	super-league-1	first_tier	domestic_league	https://www.transfermarkt.co.uk/super-league-1/startseite/wettbewerb/GR1
super-lig	TR1	europa	174	Turkey	TR1	super-lig	first_tier	domestic_league	https://www.transfermarkt.co.uk/super-lig/startseite/wettbewerb/TR1
allianz-cup	POCP	europa	136	Portugal	PO1	allianz-cup	domestic_cup	domestic_cup	https://www.transfermarkt.co.uk/allianz-cup/startseite/wettbewerb/POCP
community-shield	GBCS	europa	189	England	GB1	community-shield	domestic_super_cup	other	https://www.transfermarkt.co.uk/community-shield/startseite/wettbewerb/GBCS
fifa-klub-wm	KLUB	europa	-1	\N	\N	fifa-klub-wm	fifa_club_world_cup	other	https://www.transfermarkt.co.uk/fifa-klub-wm/startseite/pokalwettbewerb/KLUB
bundesliga	L1	europa	40	Germany	L1	bundesliga	first_tier	domestic_league	https://www.transfermarkt.co.uk/bundesliga/startseite/wettbewerb/L1
premier-liga	RU1	europa	141	Russia	RU1	premier-liga	first_tier	domestic_league	https://www.transfermarkt.co.uk/premier-liga/startseite/wettbewerb/RU1
scottish-premiership	SC1	europa	190	Scotland	SC1	scottish-premiership	first_tier	domestic_league	https://www.transfermarkt.co.uk/scottish-premiership/startseite/wettbewerb/SC1
supercoppa-italiana	SCI	europa	75	Italy	IT1	supercoppa-italiana	domestic_super_cup	other	https://www.transfermarkt.co.uk/supercoppa-italiana/startseite/wettbewerb/SCI
jupiler-pro-league	BE1	europa	19	Belgium	BE1	jupiler-pro-league	first_tier	domestic_league	https://www.transfermarkt.co.uk/jupiler-pro-league/startseite/wettbewerb/BE1
uefa-champions-league-qualifikation	CLQ	europa	-1	\N	\N	uefa-champions-league-qualifikation	uefa_champions_league_qualifying	international_cup	https://www.transfermarkt.co.uk/uefa-champions-league-qualifikation/startseite/pokalwettbewerb/CLQ
dfl-supercup	DFL	europa	40	Germany	L1	dfl-supercup	domestic_super_cup	other	https://www.transfermarkt.co.uk/dfl-supercup/startseite/wettbewerb/DFL
sfa-cup	SFA	europa	190	Scotland	SC1	sfa-cup	domestic_cup	domestic_cup	https://www.transfermarkt.co.uk/sfa-cup/startseite/wettbewerb/SFA
ukrainian-cup	UKRP	europa	177	Ukraine	UKR1	ukrainian-cup	domestic_cup	domestic_cup	https://www.transfermarkt.co.uk/ukrainian-cup/startseite/wettbewerb/UKRP
dfb-pokal	DFB	europa	40	Germany	L1	dfb-pokal	domestic_cup	domestic_cup	https://www.transfermarkt.co.uk/dfb-pokal/startseite/wettbewerb/DFB
trophee-des-champions	FRCH	europa	50	France	FR1	trophee-des-champions	domestic_super_cup	other	https://www.transfermarkt.co.uk/trophee-des-champions/startseite/wettbewerb/FRCH
\.


--
-- TOC entry 3622 (class 0 OID 0)
-- Dependencies: 214
-- Name: clubs_club_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clubs_club_id_seq', 1, false);


--
-- TOC entry 3467 (class 2606 OID 23241)
-- Name: clubs clubs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clubs
    ADD CONSTRAINT clubs_pkey PRIMARY KEY (club_id);


--
-- TOC entry 3469 (class 2606 OID 23248)
-- Name: competitions competitions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competitions
    ADD CONSTRAINT competitions_pkey PRIMARY KEY (competition_id);


--
-- TOC entry 3470 (class 2606 OID 23258)
-- Name: clubs fka1file5l5pds6on9h06irmbcu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clubs
    ADD CONSTRAINT fka1file5l5pds6on9h06irmbcu FOREIGN KEY (domestic_competition_id) REFERENCES public.competitions(competition_id);


-- Completed on 2024-01-22 10:13:45 CET

--
-- PostgreSQL database dump complete
--

