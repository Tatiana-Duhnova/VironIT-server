const express = require('express');
const app = express();
const router = require('./routers/export-router');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(express.json());
app.use('/', router.userRouter);

const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));