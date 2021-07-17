module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    "./dist/src/models/*{.ts,.js}"
  ],
  "migrations": [
    "./dist/src/migrations/*{.ts,.js}"
  ],
  "cli": {
    "migrationsDir": "./src/migrations"
  },
  "ssl": true,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  }
}