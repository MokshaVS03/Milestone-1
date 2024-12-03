const cron = require('node-cron');
const db = require('../db');

const sendReminders = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
  db.all(
    `SELECT * FROM habits WHERE reminder_time = ?`,
    [currentTime],
    (err, rows) => {
      if (err) return console.error('Error fetching reminders:', err.message);
      rows.forEach((habit) => {
        console.log(`Reminder: Complete your habit - "${habit.name}"`);
      });
    }
  );
};

// Schedule the job to run every minute for testing
cron.schedule('* * * * *', sendReminders);
