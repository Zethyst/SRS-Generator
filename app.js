const express = require('express');
const cors = require('cors');
const { SrsModel } = require('./models/SRSmodel');
const { bodyValidation } = require('./utils/validation');

const port = process.env.PORT || 5000;

const connectToMongo = require('./db');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
connectToMongo();

app.use('/api/auth', require('./routes/Auth'));

app.post('/api/generate', async (req, res) => {
  const body = req.body;

  if (!bodyValidation(body, ['name', 'description'])) {
    return res.status(400).send('Missing fields');
  }

  try {
    const srs = await SrsModel.saveToDb(body);
    return res.status(201).json({
      data: srs,
      message: 'SRS is generating. Please wait a moment.'
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/srs/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const srs = await SrsModel.getById(id);
    return res.status(200).json({
      data: srs,
      message: 'SRS found.'
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`[+] Listening on port ${port}...`);
});
