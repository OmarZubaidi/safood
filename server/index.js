// Package imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Local imports
const router = require('./router');

const PORT = 3001;

// App setup
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

// Connect to database then start backend
async function bootstrap () {
  try {
    await mongoose.connect('mongodb://127.0.0.1/safood');
    app.listen(PORT, () => {
      console.log(`Server is listening at http://127.0.0.1:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
