const express = require('express');
const cors = require('cors');
const app = express();
const { param, query, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const dataPath = 'data.json';
let rawData = fs.readFileSync(dataPath);
let users = JSON.parse(rawData);

app.get(
  '/search/:email',
  [
    // Validate email (required and email format)
    param('email')
      .notEmpty()
      .withMessage('Email is required.')
      .isEmail()
      .withMessage('Please provide a valid email address'),

    // Optionally validate number (if provided and numeric)
    query('number')
      .optional()
      .isNumeric()
      .withMessage('Number should be numeric'),
  ],

  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessage = errors.array()[0].msg;
      return res.status(400).json({ error: errorMessage });
    }

    const { email } = req.params;
    const { number } = req.query;

    let results = users.filter(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    // If number is provided, filter further by number
    if (number) {
      results = results.filter((user) => user.number === number);
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'There is no such user' });
    }

    res.json(results);
  }
);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
