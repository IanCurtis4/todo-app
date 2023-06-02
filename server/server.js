const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const sqlite3 = require('sqlite3').verbose();

const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');

const logger = new console.Console({ stdout: output, stderr: errorOutput });

let db = new sqlite3.Database('./db.sqlite3', (err) => {

  if (err) {
    return logger.error(err.message);
  }

  logger.info('Connected to the in-memory SQlite database.');

});


db.serialize(function () {

  db.run("DROP TABLE IF EXISTS items", function (err) {
    if (err) {
      logger.error(err.message);
    }
  });

  db.run(`CREATE TABLE if not exists items(
    id INTEGER PRIMARY KEY,
    description TEXT NOT NULL,
    due_date TEXT NOT NULL,
    priority INTEGER NOT NULL,
    checked BOOLEAN NOT NULL DEFAULT 0
  )`, function (err) {

    if (err) {
      logger.error(err.message);
    }

    db.run(`INSERT INTO items(description, due_date, priority) VALUES(?, ?, ?)`, ['Buy groceries', '2024-05-31', 0]);
    db.run(`INSERT INTO items(description, due_date, priority) VALUES(?, ?, ?)`, ['Finish project', '2024-06-15', 1]);
    db.run(`INSERT INTO items(description, due_date, priority) VALUES(?, ?, ?)`, ['Read a book', '2024-07-01', 2]);
    db.run(`INSERT INTO items(description, due_date, priority) VALUES(?, ?, ?)`, ['Go for a run', '2024-08-01', 3]);
    db.run(`INSERT INTO items(description, due_date, priority) VALUES(?, ?, ?)`, ['Attend concert', '2024-09-01', 4]);
    db.run(`INSERT INTO items(description, due_date, priority) VALUES(?, ?, ?)`, ['Visit doctor', '2024-10-01', 5]);
    db.run(`INSERT INTO items(description, due_date, priority) VALUES(?, ?, ?)`, ['Plan vacation', '2024-11-01', 6]);
    db.run(`INSERT INTO items(description, due_date, priority) VALUES(?, ?, ?)`, ['Clean house', '2024-12-01', 7]);
    db.run(`INSERT INTO items(description, due_date, priority) VALUES(?, ?, ?)`, ['Study for exam', '2025-01-01', 8]);

    // Add a row where the due date is in the past
    db.run(`INSERT INTO items(description, due_date, priority) VALUES(?, ?, ?)`, ['Late task', '2023-01-01', 5]);


  });
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/items', (req, res) => {

  const sql = "SELECT * FROM items ORDER BY priority DESC";

  db.all(sql, [], (err, rows) => {

    if (err) {
      res.status(500).send(err);
      return logger.error(err.message);

    }

    res.status(200).json(rows.map(row => ({
      id: row.id,
      description: row.description,
      dueDate: row.due_date,
      priority: row.priority
    })));

  });

});

app.post('/items', async (req, res) => {

  const { description, dueDate, priority } = req.body;
  const sql = "INSERT INTO items (description, due_date, priority) VALUES (?, ?, ?)";
  logger.log(dueDate);
  const data = [description, dueDate, priority];

  db.serialize(() => {

    db.run(sql, data, function (err) {

      if (err) {
        res.status(500).send(err);
        return logger.error(err.message);
      }

      logger.log(`Created todo ${this.lastID} successfully`);

    });

    const todoSql = `SELECT * FROM items WHERE id = last_insert_rowid()`;

    db.get(todoSql, (err, row) => {

      if (err) {
        res.status(500).send(err);
        return logger.error(err.message);
      }

      const { rowId, description, due_date, priority } = row;

      res.status(201).json({ rowId, description, dueDate: due_date, priority });

    });

  });
});

app.put('/items/:id', (req, res) => {

  const { id } = req.params;
  const { checked } = req.body;
  const sql = "UPDATE items SET checked = ? where id = ?";
  const data = [checked, id];

  db.run(sql, data, function (err) {

    if (err) {
      res.status(500).send(err);
      return logger.error(err);
    }

    logger.log(`Updated todo ${this.lastID} successfully`);
    res.status(200).json({ id: this.lastID, message: 'Updated successfully' });

  });

});

app.delete('/items/:id', (req, res) => {

  const { id } = req.params;

  const sql = `DELETE FROM items WHERE id = ?`;
  db.run(sql, [id], (err) => {

    if (err) {
      res.status(500).send(err);
      return logger.error(err);
    }

    logger.log(`Deleted todo ${id} successfully`);
    res.status(200).send({ message: 'Deleted successfully' });

  });

});

app.listen(3000, () => {
  logger.log('Server is running on port 3000');
});
