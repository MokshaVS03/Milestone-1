const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./habit-tracker.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      daily_goal INTEGER NOT NULL,
      reminder_time TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
  
    db.run(`CREATE TABLE IF NOT EXISTS completion (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habit_id INTEGER,
      date TEXT NOT NULL,
      status BOOLEAN NOT NULL,
      FOREIGN KEY (habit_id) REFERENCES habits (id)
    )`);
  });
  
  module.exports = db;