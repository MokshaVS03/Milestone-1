const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', (req, res) => {
    const { name, daily_goal, reminder_time } = req.body;
    if(!name || !daily_goal || !reminder_time) {
        return res.status(400).json({status: 'fail', error: 'Missing required fields'});
    }
    db.run(
        `INSERT INTO habits (name, daily_goal, reminder_time) VALUES (?,?,?)`,
        [name,daily_goal, reminder_time],
        function (err){
            if(err) return res.status(500).json({status: 'error', error: err.message});
            res.json({status: 'success', data: { id: this.lastID }})
        }
    );
});

router.get('/', (req, res) => {
    db.all(`SELECT * FROM habits`, [], (err, rows) => {
      if (err) return res.status(500).json({ status: 'error', error: err.message });
      res.json({ status: 'success', data: rows });
    });
  });
  
module.exports = router;

router.get('/report', (req, res) => {
    db.all(
      `SELECT h.name, COUNT(c.id) AS completed
       FROM habits h
       LEFT JOIN completion c ON h.id = c.habit_id
       GROUP BY h.id`,
      [],
      (err, rows) => {
        if (err) return res.status(500).json({ status: 'error', error: err.message });
  
        const report = rows.map((row) => ({
          name: row.name,
          completed: row.completed,
        }));
  
        res.json({ status: 'success', data: report });
      }
    );
  });

  router.put('/:id', (req, res) => {
    const habitId = req.params.id; // Get the habit ID from the URL
    const { date, status } = req.body; // Get the completion date and status from the request body
  
    // Validate input
    if (!date || typeof status === 'undefined') {
      return res.status(400).json({ status: 'error', error: 'Date and status are required.' });
    }
  
    // Insert or update completion record
    db.run(
      `INSERT INTO completion (habit_id, date, status)
       VALUES (?, ?, ?)
       ON CONFLICT(habit_id, date)
       DO UPDATE SET status = excluded.status`,
      [habitId, date, status],
      function (err) {
        if (err) return res.status(500).json({ status: 'error', error: err.message });
        res.json({ status: 'success', message: 'Habit marked as complete for the day.' });
      }
    );
  });
  