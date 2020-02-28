const router = require('express').Router();
const authRouter = require('../auth/authRouter');
const userRouter = require('../users/userRouter');
const restricted = require('../middleware/restrictedMiddleware')

router.use('/auth', authRouter)
router.use('/users', restricted, userRouter);

router.get('/', (req, res)=>{
    res.status(200).json({message: 'Welcome to the API router'})
})

module.exports=router;