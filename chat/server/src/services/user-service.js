import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import monk from 'monk';

const url = 'localhost:27017/myProject';
const db = monk(url);
const users = db.get('users');

export const addUser = async (req, res) => {
    await users.findOne({email: req.body.email}).then((user) => {
      if (user) {
        throw new Error('Uncorrect email');
      } else {
        users.insert({ ...req.body }).then((user) => res.send(user));
      }
    })
     
    console.log(req.body);
};

export const getAllUsers = async (req, res) => {
    const allUsers = await users.find({});
  
    res.send(allUsers);
};

export const updateUserInfo = async (req, res) => {
    const {name, email, number, password, gender, lastEmail}  = req.body;
    const user = await users.findOneAndUpdate({email: lastEmail}, {$set: {name, email, number, password, gender}});
  
    res.send(user);
};

export const getUser = (req, res) => {
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
    }), 2000);
    
    console.log(req.body);
};

export const saveImg = async (req, res) => {
    const {img, id} = req.body;
    
    const buf = crypto.randomBytes(16);
    const fileName = `${buf.toString('hex')}.png`;
    const newImg = img.replace(/^.*base64,/, '');
  
    fs.writeFileSync(
        path.join(`./src/images/${fileName}`),
        Buffer.from(newImg, 'base64')
    );
  
    const user = await users.findOneAndUpdate({ _id: id }, { $set: { img: fileName }});
  
    res.send(user);
};

export const getImg = async (req, res) => {
    const { name } = req.query;
  
    try {
        const data = fs.readFileSync(path.join(`./src/images/${name}`));
  
        res.send(data);
    } catch {
        res.send('');
    }
};
