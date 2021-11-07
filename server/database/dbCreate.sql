
create table public."proizvod"(
	id serial,
	naziv varchar(1000),
	opis varchar(1000) null,
	rod int2,
	moda boolean,
	novo boolean,
	cena int4,
	defaultSlika varchar(1000) null,
	slike int2,
	CONSTRAINT "PK_proizvod" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "proizvod_pkey" ON public."proizvod" USING btree (id);

create table public."velicineSifrarnik"(
	id serial,
	naziv varchar(10),
	CONSTRAINT "PK_velicineSifrarnik" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "velicineSifrarnik_pkey" ON public."velicineSifrarnik" USING btree (id);
CREATE UNIQUE INDEX "velicineSifrarnik_naziv" ON public."velicineSifrarnik" USING btree (naziv);

create table public."proizvodVelicina"(
	id serial,
	forVelicina int2,
	CONSTRAINT "PK_proizvodVelicina" PRIMARY KEY (id),
	CONSTRAINT "FK_proizvodVelicina_forVelicina" FOREIGN KEY (forVelicina) references public."velicineSifrarnik"(id) ON UPDATE CASCADE ON DELETE CASCADE

);
CREATE UNIQUE INDEX "proizvodVelicina_pkey" ON public."proizvodVelicina" USING btree (id);

create table public."bojaSifrarnik"(
	id serial,
	naziv varchar(100),
	CONSTRAINT "PK_bojaSifrarnik" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "bojaSifrarnik_pkey" ON public."bojaSifrarnik" USING btree (id);

create table public."proizvodBoja"(
	id serial,
	forBoja int2,
	forProizvod int4,
	CONSTRAINT "PK_proizvodBoja" PRIMARY KEY (id),
	CONSTRAINT "FK_proizvodBoja_forBoja" FOREIGN KEY (forBoja) references public."bojaSifrarnik"(id) ON UPDATE CASCADE ON DELETE cascade,
	CONSTRAINT "FK_proizvodBoja_forProizvod" FOREIGN KEY (forProizvod) references public."proizvod"(id) ON UPDATE CASCADE ON DELETE CASCADE	
);
CREATE UNIQUE INDEX "proizvodBoja_pkey" ON public."proizvodBoja" USING btree (id);

-- !!!!!!!!!!! OVAKO NA SVE TABELE
alter table public."proizvodBoja" add column forProizvod int4
alter table public."proizvodBoja" add CONSTRAINT "FK_proizvodBoja_forProizvod" FOREIGN KEY (forProizvod) references public."proizvod"(id) ON UPDATE CASCADE ON DELETE CASCADE	
-- !!!!!!!!!!!

create table public."brendSifrarnik"(
	id serial,
	naziv varchar(100),
	CONSTRAINT "PK_brendSifrarnik" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "brendSifrarnik_pkey" ON public."brendSifrarnik" USING btree (id);


create table public."proizvodBrend"(
	id serial,
	forBrend int2,
	CONSTRAINT "PK_proizvodBrend" PRIMARY KEY (id),
	CONSTRAINT "FK_proizvodBrend_forBrend" FOREIGN KEY (forBrend) references public."brendSifrarnik"(id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE UNIQUE INDEX "proizvodBrend_pkey" ON public."proizvodBrend" USING btree (id);


create table public."kategorijeSifrarnik"(
	id serial,
	naziv varchar(100),
	CONSTRAINT "PK_kategorijeSifrarnik" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "kategorijeSifrarnik_pkey" ON public."kategorijeSifrarnik" USING btree (id);


create table public."tipSifrarnik"(
	id serial,
	naziv varchar(100),
	CONSTRAINT "PK_tipSifrarnik" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "tipSifrarnik_pkey" ON public."tipSifrarnik" USING btree (id);


create table public."podtipSifrarnik"(
	id serial,
	naziv varchar(100),
	CONSTRAINT "PK_podtipSifrarnik" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "podtipSifrarnik_pkey" ON public."podtipSifrarnik" USING btree (id);


create table public."proizvodSlike"(
	id serial,
	urlSlike varchar(1000),
	CONSTRAINT "PK_proizvodSlike" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "proizvodSlike_pkey" ON public."proizvodSlike" USING btree (id);


create table public."kategorijaTipPodtip"(
	id serial,
	forKatorija int4,
	forTip int4 null,
	forPodtip int4 null,
	CONSTRAINT "PK_kategorijaTipPodtip" PRIMARY KEY (id),
	CONSTRAINT "FK_kategorijaTipPodtip_forKatorija" FOREIGN KEY (forKatorija) references public."kategorijeSifrarnik"(id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT "FK_kategorijaTipPodtip_forTip" FOREIGN KEY (forTip) REFERENCES public."tipSifrarnik"(id) ON UPDATE CASCADE ON DELETE cascade,
	CONSTRAINT "FK_kategorijaTipPodtip_forPodtip" FOREIGN KEY (forPodtip) references public."podtipSifrarnik"(id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE UNIQUE INDEX "kategorijaTipPodtip_pkey" ON public."kategorijaTipPodtip" USING btree (id);

