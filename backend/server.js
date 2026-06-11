const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(
  "./database.db",
  (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(
        "Connected to SQLite Database"
      );
    }
  }
);

db.run(`
CREATE TABLE IF NOT EXISTS volunteers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  mobile TEXT,
  city TEXT,
  skills TEXT
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  eventName TEXT,
  description TEXT,
  date TEXT,
  location TEXT,
  requiredVolunteers TEXT
)
`);

app.get("/", (req, res) => {
  res.send("NGO Backend Running");
});

/* VOLUNTEER APIs */

app.post("/volunteers", (req, res) => {
  const {
    name,
    email,
    mobile,
    city,
    skills,
  } = req.body;

  db.run(
    `
    INSERT INTO volunteers
    (name, email, mobile, city, skills)
    VALUES (?, ?, ?, ?, ?)
    `,
    [name, email, mobile, city, skills],
    function (err) {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
        res.json({
          message:
            "Volunteer Added Successfully",
          id: this.lastID,
        });
      }
    }
  );
});

app.get("/volunteers", (req, res) => {
  db.all(
    "SELECT * FROM volunteers",
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
        res.json(rows);
      }
    }
  );
});

/* EVENT APIs */

app.post("/events", (req, res) => {
  const {
    eventName,
    description,
    date,
    location,
    requiredVolunteers,
  } = req.body;

  db.run(
    `
    INSERT INTO events
    (eventName, description, date, location, requiredVolunteers)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      eventName,
      description,
      date,
      location,
      requiredVolunteers,
    ],
    function (err) {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
        res.json({
          message:
            "Event Added Successfully",
          id: this.lastID,
        });
      }
    }
  );
});

app.get("/events", (req, res) => {
  db.all(
    "SELECT * FROM events",
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
        res.json(rows);
      }
    }
  );
});
app.delete("/volunteers/:id", (req, res) => {
  const id = req.params.id;

  db.run(
    "DELETE FROM volunteers WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
        res.json({
          message:
            "Volunteer Deleted Successfully",
        });
      }
    }
  );
});
app.delete("/events/:id", (req, res) => {
  const id = req.params.id;

  db.run(
    "DELETE FROM events WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
        res.json({
          message:
            "Event Deleted Successfully",
        });
      }
    }
  );
});
app.delete("/volunteers/:id", (req, res) => {
  const id = req.params.id;

  db.run(
    "DELETE FROM volunteers WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
        res.json({
          message: "Volunteer Deleted",
        });
      }
    }
  );
});
app.delete("/events/:id", (req, res) => {
  const id = req.params.id;

  db.run(
    "DELETE FROM events WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
        res.json({
          message: "Event Deleted",
        });
      }
    }
  );
});
app.put("/volunteers/:id", (req, res) => {
  const id = req.params.id;

  const {
    name,
    email,
    mobile,
    city,
    skills,
  } = req.body;

  db.run(
    `
    UPDATE volunteers
    SET name = ?,
        email = ?,
        mobile = ?,
        city = ?,
        skills = ?
    WHERE id = ?
    `,
    [
      name,
      email,
      mobile,
      city,
      skills,
      id,
    ],
    function (err) {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
        res.json({
          message:
            "Volunteer Updated Successfully",
        });
      }
    }
  );
});
app.put("/events/:id", (req, res) => {
  const id = req.params.id;

  const {
    eventName,
    description,
    date,
    location,
    requiredVolunteers,
  } = req.body;

  db.run(
    `
    UPDATE events
    SET eventName = ?,
        description = ?,
        date = ?,
        location = ?,
        requiredVolunteers = ?
    WHERE id = ?
    `,
    [
      eventName,
      description,
      date,
      location,
      requiredVolunteers,
      id,
    ],
    function (err) {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
        res.json({
          message:
            "Event Updated Successfully",
        });
      }
    }
  );
});

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});