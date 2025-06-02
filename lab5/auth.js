const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Сервер працює!');
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
