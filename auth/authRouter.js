const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/userModel');
const generateToken = require('../config/generateToken');
const {validateUser, validateUserId} = require('../middleware/validators')

//checking if body of request contains a username and password
router.post('/register', validateUser, (req, res)=>{
    const user = req.body;
    //hashing the password 10 rounds
    const hash = bcrypt.hashSync(user.password, 10);
    //setting the newly created has as the password
    user.password = hash;
    //adding the user to the database
    Users.add(user)
        .then(user=>res.status(200).json(user))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: 'server error'})
        })

})

//checking if sent both a username and password through validateUser
router.post('/login', validateUser, (req, res)=>{
    const {username, password} = req.body;
    Users.findBy({username}).first()
        .then(user=>{
            //if user exists, and the decrypted password matches the password sent in the request, generate a token
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(200).json({message: `Welcome ${user.username}`, id: user.id, creator: user.creator, token})
            //user does not exist or the password doesn't match
            } else {
                res.status(401).json({message: 'invalid credentials'})
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: 'server error'})
        })
})

module.exports=router;