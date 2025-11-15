// src/lib/server/database.js
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./webapp.db', () => {
  console.log('✅ Connected to database.');
  db.run(`CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)`, () => {
    db.run(`INSERT OR IGNORE INTO users (username, password) VALUES ('admin', 'password123')`);
    console.log('✅ Sample user "admin" is ready.');
  });
});

export default db;