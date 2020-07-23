import config from './src/config/db'

module.exports = {
  type: 'mysql',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  synchronize: true,
  logging: false,
  entities: ['src/typeorm/entity/**/*.ts'],
  migrations: ['src/typeorm/migration/**/*.ts'],
  subscribers: ['src/typeorm/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/typeorm/entity',
    migrationsDir: 'src/typeorm/migration',
    subscribersDir: 'src/typeorm/subscriber',
  },
};
