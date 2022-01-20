import {MigrationInterface, QueryRunner} from "typeorm";

export class NewDbCreate1642546052579 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `-- public."bojaSifrarnik" definition

-- Drop table

-- DROP TABLE public."bojaSifrarnik";

CREATE TABLE public."bojaSifrarnik" (
\tid serial4 NOT NULL,
\tnaziv varchar(100) NULL,
\tCONSTRAINT "PK_bojaSifrarnik" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "bojaSifrarnik_pkey" ON public."bojaSifrarnik" USING btree (id);


-- public."brendSifrarnik" definition

-- Drop table

-- DROP TABLE public."brendSifrarnik";

CREATE TABLE public."brendSifrarnik" (
\tid serial4 NOT NULL,
\tnaziv varchar(100) NULL,
\tCONSTRAINT "PK_brendSifrarnik" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "brendSifrarnik_pkey" ON public."brendSifrarnik" USING btree (id);


-- public."emailList" definition

-- Drop table

-- DROP TABLE public."emailList";

CREATE TABLE public."emailList" (
\tid serial4 NOT NULL,
\temail varchar(1000) NULL
);


-- public."kategorijeSifrarnik" definition

-- Drop table

-- DROP TABLE public."kategorijeSifrarnik";

CREATE TABLE public."kategorijeSifrarnik" (
\tid serial4 NOT NULL,
\tnaziv varchar(100) NULL,
\tCONSTRAINT "PK_kategorijeSifrarnik" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX kategorijasifrarniknaziv_idx ON public."kategorijeSifrarnik" USING btree (naziv);
CREATE UNIQUE INDEX "kategorijeSifrarnik_pkey" ON public."kategorijeSifrarnik" USING btree (id);


-- public.migrations definition

-- Drop table

-- DROP TABLE public.migrations;

CREATE TABLE public.migrations (
\tid serial4 NOT NULL,
\t"timestamp" int8 NOT NULL,
\tname varchar NOT NULL,
\tCONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id)
);


-- public."podtipSifrarnik" definition

-- Drop table

-- DROP TABLE public."podtipSifrarnik";

CREATE TABLE public."podtipSifrarnik" (
\tid serial4 NOT NULL,
\tnaziv varchar(100) NULL,
\tCONSTRAINT "PK_podtipSifrarnik" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "podtipSifrarnik_pkey" ON public."podtipSifrarnik" USING btree (id);


-- public.proizvod definition

-- Drop table

-- DROP TABLE public.proizvod;

CREATE TABLE public.proizvod (
\tid serial4 NOT NULL,
\tnaziv varchar(1000) NULL,
\topis varchar(1000) NULL,
\trod int2 NULL,
\tmoda bool NULL,
\tnovo bool NULL,
\tcena int4 NULL,
\tdefaultslika varchar(1000) NULL,
\tCONSTRAINT "PK_proizvod" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "emailList_pkey" ON public.proizvod USING btree (id);
CREATE UNIQUE INDEX proizvod_pkey ON public.proizvod USING btree (id);


-- public."tipSifrarnik" definition

-- Drop table

-- DROP TABLE public."tipSifrarnik";

CREATE TABLE public."tipSifrarnik" (
\tid serial4 NOT NULL,
\tnaziv varchar(100) NULL,
\tCONSTRAINT "PK_tipSifrarnik" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "tipSifrarnik_pkey" ON public."tipSifrarnik" USING btree (id);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
\tid serial4 NOT NULL,
\tusername varchar(40) NULL,
\tname varchar(40) NULL,
\temail varchar(100) NOT NULL,
\t"password" varchar NOT NULL,
\t"role" varchar(30) NOT NULL DEFAULT 'STANDARD'::character varying,
\t"language" varchar(15) NOT NULL DEFAULT 'en-US'::character varying,
\tcreated_at timestamp NOT NULL DEFAULT now(),
\tupdated_at timestamp NOT NULL DEFAULT now(),
\tCONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id),
\tCONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email),
\tCONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username)
);


-- public."velicineSifrarnik" definition

-- Drop table

-- DROP TABLE public."velicineSifrarnik";

CREATE TABLE public."velicineSifrarnik" (
\tid serial4 NOT NULL,
\tnaziv varchar(10) NULL,
\tCONSTRAINT "PK_velicineSifrarnik" PRIMARY KEY (id)
);
CREATE UNIQUE INDEX "velicineSifrarnik_naziv" ON public."velicineSifrarnik" USING btree (naziv);
CREATE UNIQUE INDEX "velicineSifrarnik_pkey" ON public."velicineSifrarnik" USING btree (id);


-- public."kategorijaTip" definition

-- Drop table

-- DROP TABLE public."kategorijaTip";

CREATE TABLE public."kategorijaTip" (
\tid serial4 NOT NULL,
\tforkategorija int4 NOT NULL,
\tfortip int4 NULL,
\tpol bool NULL,
\tCONSTRAINT "PK_kategorijaTip" PRIMARY KEY (id),
\tCONSTRAINT "FK_kategorijaTip_forKategorija" FOREIGN KEY (forkategorija) REFERENCES public."kategorijeSifrarnik"(id) ON DELETE CASCADE ON UPDATE CASCADE,
\tCONSTRAINT "FK_kategorijaTip_forTip" FOREIGN KEY (fortip) REFERENCES public."tipSifrarnik"(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "kategorijaTip_pkey" ON public."kategorijaTip" USING btree (id);


-- public."kategorijaTipPodtip" definition

-- Drop table

-- DROP TABLE public."kategorijaTipPodtip";

CREATE TABLE public."kategorijaTipPodtip" (
\tid serial4 NOT NULL,
\tforkategorija int4 NULL,
\tfortip int4 NULL,
\tforpodtip int4 NULL,
\tforproizvod int4 NULL,
\tCONSTRAINT "PK_kategorijaTipPodtip" PRIMARY KEY (id),
\tCONSTRAINT "FK_kategorijaTipPodtip_forKategorija" FOREIGN KEY (forkategorija) REFERENCES public."kategorijeSifrarnik"(id) ON DELETE CASCADE ON UPDATE CASCADE,
\tCONSTRAINT "FK_kategorijaTipPodtip_forPodtip" FOREIGN KEY (forpodtip) REFERENCES public."podtipSifrarnik"(id) ON DELETE CASCADE ON UPDATE CASCADE,
\tCONSTRAINT "FK_kategorijaTipPodtip_forProizvod" FOREIGN KEY (forproizvod) REFERENCES public.proizvod(id) ON DELETE CASCADE ON UPDATE CASCADE,
\tCONSTRAINT "FK_kategorijaTipPodtip_forTip" FOREIGN KEY (fortip) REFERENCES public."tipSifrarnik"(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "kategorijaTipPodtip_pkey" ON public."kategorijaTipPodtip" USING btree (id);


-- public."proizvodBoja" definition

-- Drop table

-- DROP TABLE public."proizvodBoja";

CREATE TABLE public."proizvodBoja" (
\tid serial4 NOT NULL,
\tforboja int2 NULL,
\tforproizvod int4 NULL,
\tCONSTRAINT "PK_proizvodBoja" PRIMARY KEY (id),
\tCONSTRAINT "FK_proizvodBoja_forBoja" FOREIGN KEY (forboja) REFERENCES public."bojaSifrarnik"(id) ON DELETE CASCADE ON UPDATE CASCADE,
\tCONSTRAINT "FK_proizvodBoja_forProizvod" FOREIGN KEY (forproizvod) REFERENCES public.proizvod(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "proizvodBoja_pkey" ON public."proizvodBoja" USING btree (id);


-- public."proizvodBrend" definition

-- Drop table

-- DROP TABLE public."proizvodBrend";

CREATE TABLE public."proizvodBrend" (
\tid serial4 NOT NULL,
\tforbrend int2 NULL,
\tforproizvod int4 NULL,
\tCONSTRAINT "PK_proizvodBrend" PRIMARY KEY (id),
\tCONSTRAINT "FK_proizvodBrend_forBrend" FOREIGN KEY (forbrend) REFERENCES public."brendSifrarnik"(id) ON DELETE CASCADE ON UPDATE CASCADE,
\tCONSTRAINT "FK_proizvodBrend_forProizvod" FOREIGN KEY (forproizvod) REFERENCES public.proizvod(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "proizvodBrend_pkey" ON public."proizvodBrend" USING btree (id);


-- public."proizvodSlike" definition

-- Drop table

-- DROP TABLE public."proizvodSlike";

CREATE TABLE public."proizvodSlike" (
\tid serial4 NOT NULL,
\tforproizvod int2 NULL,
\turlslike varchar(1000) NULL,
\tCONSTRAINT "PK_proizvodSlike" PRIMARY KEY (id),
\tCONSTRAINT "FK_proizvodSlike_forProizvod" FOREIGN KEY (forproizvod) REFERENCES public.proizvod(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "proizvodSlike_pkey" ON public."proizvodSlike" USING btree (id);


-- public."proizvodVelicina" definition

-- Drop table

-- DROP TABLE public."proizvodVelicina";

CREATE TABLE public."proizvodVelicina" (
\tid serial4 NOT NULL,
\tforvelicina int2 NULL,
\tforproizvod int4 NULL,
\tCONSTRAINT "PK_proizvodVelicina" PRIMARY KEY (id),
\tCONSTRAINT "FK_proizvodVelicina_forProizvod" FOREIGN KEY (forproizvod) REFERENCES public.proizvod(id) ON DELETE CASCADE ON UPDATE CASCADE,
\tCONSTRAINT "FK_proizvodVelicina_forVelicina" FOREIGN KEY (forvelicina) REFERENCES public."velicineSifrarnik"(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "proizvodVelicina_pkey" ON public."proizvodVelicina" USING btree (id);`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
