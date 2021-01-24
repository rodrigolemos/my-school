module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    "./src/models/*{.ts,.js}"
  ],
  "migrations": [
    "./src/migrations/*{.ts,.js}"
  ],
  "cli": {
    "migrationsDir": "./src/migrations"
  }
}