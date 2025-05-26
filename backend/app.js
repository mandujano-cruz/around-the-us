const mongoose = require('mongoose');
const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const {errorHandler} = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { errors } = require('celebrate');
require('dotenv').config();
var cors = require('cors');


const app = express();
const { NODE_ENV, JWT_SECRET, PORT=3000 } = process.env;

app.use(cors());

mongoose.connect('mongodb://localhost:27017/arounddb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(requestLogger);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({message: "Recurso solicitado no encontrado"})
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);
