const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

const port = 3001;

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
}));



app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
