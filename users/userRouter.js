const router = require('express').Router();
const Users = require('../users/userModel');
const {validateUserId} = require('../middleware/validators')

router.get('/users', (req, res)=>{
    Users.getAll()
        .then(users=>res.status(200).json(users))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: 'server error'})
        })
})

router.get('/users:id', validateUserId, (req, res)=>{
    Users.findBy(req.params.id)
        .then(users=>res.status(200).json(users))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: 'server error'})
        })
})

module.exports=router;