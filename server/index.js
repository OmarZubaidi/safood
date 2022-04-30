// Package imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Local imports
const router = require('./router');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3001;

// App setup
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

// Connect to database then start backend
async function bootstrap () {
  try {
    await mongoose.connect(`mongodb://${HOST}/safood`);
    app.listen(PORT, () => {
      console.log(`Server is listening at http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}
bootstrap();
