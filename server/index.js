const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const router = require('./router');
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(router);

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
