/**
 * Database Helper - Promisified sqlite3 wrapper
 * Provides better-sqlite3-like API using sqlite3 for Windows compatibility
 */

const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  exec(sql) {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  prepare(sql) {
    return new Statement(this.db.prepare(sql));
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

class Statement {
  constructor(stmt) {
    this.stmt = stmt;
  }

  run(...args) {
    return new Promise((resolve, reject) => {
      this.stmt.run(...args, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ lastInsertRowid: this.lastID, changes: this.changes });
        }
      });
    });
  }

  get(...args) {
    return new Promise((resolve, reject) => {
      this.stmt.get(...args, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  all(...args) {
    return new Promise((resolve, reject) => {
      this.stmt.all(...args, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

module.exports = Database;
