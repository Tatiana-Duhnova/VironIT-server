const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const monk = require('monk')
// Connection URL
const url = 'localhost:27017/myProject';

const db = monk(url);
const users = db.get('users');

db.then(() => {
  console.log('Connected correctly to server')
})

const port = 4000;

app.use(cors());
app.use('/static', express.static(`${__dirname}/public`));
app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));

const server = require('http').createServer(app);

app.listen(port, () => {
    console.log(`Server listen port ${port}`);
});
//in user-router.js
const userRouter = express.Router();
userRouter.get('/', authMiddleware, UserController.getAllUsers);

// in user-controller.js
class UserController {
  static async getAllUsers(req, res, next) {
    res.send(await UserService.getAll());
  }

  static async getUserById(req, res, next) {
    res.send(await UserService.getById(req.params.id));
  }
}

// in user-service.js
class UserService {
  static async getAll() {
    return await users.find({});
  }
}

//in server.js
app.use('/users', userRouter);

// create and send access token after login and signup. Verify token on auth middleware. Use jwt. Verification: verify token by jwt, get userId from jwt and try to find user in mongodb by userId from jwt
// PS on login and registration steps put into token user ID
// place token to headers by header key 'Authorization' and value 'Bearer bgkjdshfdhkljdashghdasgkjhkjasgh'
// in auth middleware do req.user = findedUser;

app.post('/login', (req, res) => {
    setTimeout(() => users.findOne({email: req.body.email}).then((user) => {
      if (user) {
          if (user.password === req.body.password) {
            res.send(user);
          } else {
            res.send('Wrong password');
          }

        } else {
          res.send('User not defined');
        }
    }), 2000)
    
    console.log(req.body);
})

app.post('/registration', (req, res) => {
  users.findOne({email: req.body.email}).then((user) => {
    if (user) {
      throw new Error('Uncorrect email');
    } else {
      users.insert(
        { ...req.body }).then((user) => {
          res.send(user);
        });
    }
  })
   
  console.log(req.body);
})

app.put('/redaction', async (req, res) => {
  const {name, email, number, password, gender, lastEmail}  = req.body;
  const user = await users.findOneAndUpdate({email: lastEmail}, {$set: {...req.body}});

  res.send(user);
})

app.post('/saveImage', async (req, res) => {
  const { img, id }  = req.body;
  
  const buf = crypto.randomBytes(16);
  const fileName = `${buf.toString('hex')}.png`;
  const newImg = img.replace(/^.*base64,/, '');

  fs.writeFileSync(
    path.join(__dirname, `./src/images/${fileName}`),
    Buffer.from(newImg, 'base64')
  );

  const user = await users.findOneAndUpdate({ _id: id }, { $set: { img: fileName } });

  res.send(user);
});

app.get('/images', async (req, res) => {
  const { name } = req.query;

    try {
      const data = fs.readFileSync(path.join(__dirname, `./src/images/${name}`));

      res.send(data);
    } catch {
      res.send('');
    }
});

app.get('/users', async (req, res) => {
  const allUsers = await users.find({});

  res.send(allUsers);
});

