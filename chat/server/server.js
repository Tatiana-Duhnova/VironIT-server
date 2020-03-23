import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import monk from 'monk';

import userRouter from './src/routers/user-router';

const app = express();

const url = 'localhost:27017/myProject';
const db = monk(url);
db.then(() => {
  console.log('Connected correctly to server');
})

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));

app.use(userRouter);

const port = 4000;

app.listen(port, () => {
    console.log(`Server listen port ${port}`);
});
