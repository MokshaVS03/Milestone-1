Smart Habit Tracker

Project Overview
The Smart Habit Tracker is an application built using Node.js and Express.js to help users track their daily habits, receive reminders, and generate weekly reports. The app allows users to:

Add and manage habits with daily goals.
Mark habits as completed for specific dates.
Receive daily reminders.
View weekly progress reports.

Features
Add Habits: Create new habits with a daily goal and reminder time.
Mark Completion: Track the completion status of habits for a given date.
Weekly Reports: Generate and view weekly progress reports.
Reminders: Automated notifications for habits at specified times.

Technologies Used
Backend: Node.js, Express.js
Database: SQLite (or file-based storage)
Scheduling: node-cron for daily reminders
API Testing: Postman

Access the API
The server will run on http://localhost:3000. Use Postman or any API client to test the following endpoints:

POST /habits: Add a new habit.
GET /habits: Fetch all habits.
PUT /habits/:id: Mark a habit as completed.
GET /habits/report: Generate a weekly report.

Future Improvements
Push Notifications: Implement real-time notifications using WebSocket or Firebase.
Email Notifications: Integrate with nodemailer for email reminders.
Front-End: Develop a web interface with React or another frontend framework for better user interaction.
