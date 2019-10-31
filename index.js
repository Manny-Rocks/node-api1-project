
//importing express or commonJs modules
const express= require('express');

//creating a server 
const server = express();
server.use(express.json())//teaching express how to read json for post and put to work
 
const dataBase= require('./data/db.js');

//route/request handler I believe
server.get('/',( req , res) =>{
    res.send("hola ese");
});


//GET request to /users that return array of al users

server.get('/users', (req,res) =>{
    dataBase.find()
    .then(users =>{
        res.json(users);
    })
    .catch(err => {console.log('error',err);
    res.json({error: 'failed to get users man..im sorry'});

  });
});


//POST to users to create a user
server.post('/users', (req, res)=>{
    //user information that we are requesting from the body
    const newMan = req.body;

    dataBase.insert(newMan).then(users=>{
        res.status(201).json(users);
    })
    .catch(err => {console.log('error',err);
    res.status(500).json({error: 'failed to add user to the database'});

  });

})









const port =3000;//lcaolhost:3000
server.listen(port, ()=> console.log("\n==== API on Port 3000 ===\n"))