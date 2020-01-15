const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
 
const app = express();
const jsonParser = bodyParser.json();
const data = fs.readFileSync("users.json", "utf8");
 
app.use(express.static(__dirname + "/public"));

app.get("/api/users", (req, res) => {
    const users = JSON.parse(data);
    res.send(users);
});

app.get("/api/users/:id", (req, res) => {
    const id = req.params.id; 
    const users = JSON.parse(content);
    const user = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            user = users[i];
            break;
        }
    }

    if (user) {
        res.send(user);
    } else {
        res.status(404).send();
    }
});

app.post("/api/users", jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
     
    const userName = req.body.name;
    const userAge = req.body.age;
    const user = {name: userName, age: userAge};
     
    const users = JSON.parse(data);
     
    const id = Math.max.apply(Math,users.map((o) => o.id))
    
    user.id = id+1;
    
    users.push(user);
    const dataUser = JSON.stringify(users);
    
    fs.writeFileSync("users.json", dataUser);
    res.send(user);
});
 
app.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const users = JSON.parse(data);
    const index = -1;
    
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            index=i;
            break;
        }
    }

    if (index > -1) {
        const user = users.splice(index, 1)[0];
        const data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        
        res.send(user);
    } else {
        res.status(404).send();
    }
});

app.put("/api/users", jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
     
    const userId = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
     
    const users = JSON.parse(data);

    for (let i = 0; i < users.length; i++){
        if (users[i].id == userId) {
            user = users[i];
            break;
        }
    }
    
    if (user) {
        user.age = userAge;
        user.name = userName;
        const data = JSON.stringify(users);
        fs.writeFileSync("users.json", data);
        res.send(user);
    } else {
        res.status(404).send(user);
    }
});
  
const port = 3000;

app.listen(port, () => console.log("server on port " + port));