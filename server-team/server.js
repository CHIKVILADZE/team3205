const express = require('express');
const cors = require('cors');
const app = express();
const { query, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const dataPath = 'data.json';
let rawData = fs.readFileSync(dataPath);
let users = JSON.parse(rawData);

app.get(
  '/search',
  [
    query('email')
      .notEmpty()
      .withMessage('Email is required.')
      .isEmail()
      .withMessage('Please provide a valid email address'),

    query('number')
      .optional()
      .matches(/^\d{2}-\d{2}-\d{2}$/)
      .withMessage('Number should be in the format XX-XX-XX'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessage = errors.array()[0].msg;
      return res.status(400).json({ error: errorMessage });
    }

    const { email, number } = req.query;

    let results = users.filter(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (number) {
      const formattedNumber = number.replace(/-/g, '');

      results = results.filter((user) => user.number === formattedNumber);
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
