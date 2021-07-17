module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    process.env.ENTITIES_FOLDER
  ],
  "migrations": [
    process.env.MIGRATIONS_FOLDER
  ],
  "cli": {
    "migrationsDir": "./src/migrations"
  },
  "ssl": true
}