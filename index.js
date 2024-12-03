const express = require('express')
const bodyParser = require('body-parser');
const habitsRouter = require('./routes/habits');

const app = express()
const PORT = 3000;

app.use(bodyParser.json());
app.use('/habits', habitsRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({status:'error', error: err.message});
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))

require('./services/reminders');

