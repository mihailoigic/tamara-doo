import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import {Proizvod} from "../entities/Proizvod";
import {ProizvodBoja} from "../entities/BojeProizvod";
import {ProizvodSlike} from "../entities/SlikeProizvod";
import {ProizvodBrend} from "../entities/BrendProizvod";
import {ProizvodVelicina} from "../entities/VelicineProizvod";
import {BojaSifrarnik} from "../entities/Boje";
import {BrendSifrarnik} from "../entities/Brend";
import {KategorijeSifrarnik} from "../entities/Kategorije";
import {KategorijaTipPodtip} from "../entities/KategorijaTipPodtip";
import {KategorijaTip} from "../entities/KategorijaTip";
import {VelicineSifrarnik} from "../entities/Velicine";
import {TipSifrarnik} from "../entities/Tip";
import {PodtipSifrarnik} from "../entities/Podtip";
import {User} from "../entities/users/User";

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: ['typeorm/entities/**/*.*', Proizvod, ProizvodBoja, ProizvodSlike, ProizvodBrend, ProizvodVelicina, BojaSifrarnik,
    BrendSifrarnik, KategorijeSifrarnik, KategorijaTipPodtip, KategorijaTip, VelicineSifrarnik, TipSifrarnik, PodtipSifrarnik, User],
  migrations: ['typeorm/migrations/**/*.*'],
  subscribers: ['typeorm/subscriber/**/*.*'],
  cli: {
    entitiesDir: 'src/typeorm/entities',
    migrationsDir: 'src/typeorm/migrations',
    subscribersDir: 'src/typeorm/subscriber',
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export = config;
