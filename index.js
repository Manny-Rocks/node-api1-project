
//importing express or commonJs modules
const express= require('express');

//creating a server 
const server = express();
server.use(express.json())//teaching express how to read json for post and put to work
 
const db= require('./data/db.js');

//route/request handler I believe
server.get('/',( req , res) =>{
    res.send("hola ese");
});


//GET request to /users that return array of al users

server.get('/api/users', (req, res) => {
    db.find()
      .then(data => res.status(200).json(data))
      .catch(err =>
        res
          .status(500)
          .send({ error: 'The list of users could not be retrieved' })
      )
  })


// GET request to a single user

server.get(`/api/users/:id`, (req, res) => {
    const { id } = req.params
    db.findById(id)
      .then(data => {
        data
          ? res.status(200).json(data)
          : res
              .status(404)
              .json({ message: 'The user with the specified ID does not exist.' })
      })
      .catch(err => {
        console.log(err.response)
        res
          .status(500)
          .send({ error: 'The list of users could not be retrieved' })
      })
  })

//POST to db to create a user
server.post('/users', (req, res)=>{
    //user information that we are requesting from the body

    const newMan = req.body;

    if (!newMan.name || !newMan.bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' })
    return
  }

  db.insert(newMan)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the user to the database'
      })
    })
})


//DELETE 
server.delete(`/api/users/:id`, (req, res) => {
    const { id } = req.params
  
    let user = null
    
    db.findById(id).then(data => { //to find user
      user = data
    })
  
    db.remove(id)
      .then(data => {
        data
          ? res.status(200).json(user)
          : res
              .status(404)
              .json({ message: 'The user with the specified ID does not exist.' })
      })
      .catch(err => {
        res.status(500).send({ error: 'The user could not be removed' })
      })
  })
 //PUT request

 server.put(`/api/users/:id`, (req, res) => {
    const { id } = req.params
  
    const update = req.body
    console.log('put updates', update)
    if (!update.name || !update.bio) {
      res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' })
      return
    }
  
    let user = undefined
    // find user
    db.findById(id).then(data => {
      user = data
    })
  
    db.update(id, update)
      .then(data => {
        console.log('user in put', user)
        console.log('return value of db.update ', data)
        data
          ? res.status(200).json({ ...user, ...update })
          : res
              .status(404)
              .json({ message: 'The user with the specified ID does not exist.' })
      })
      .catch(err => {
        console.log(err.response)
        res
          .status(500)
          .send({ error: 'The user information could not be modified' })
      })
  })



const port =3000;//lcaolhost:3000
server.listen(port, ()=> console.log("\n==== API on Port 3000 ===\n"))