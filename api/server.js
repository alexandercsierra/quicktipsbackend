const express = require('express');
const server = express();
const helmet = require('helmet');
const apiRouter = require('./apiRouter')

server.use(helmet());
server.use(express.json());
server.use('/api', apiRouter);

server.get('/', (req, res)=>{
    res.status(200).json({message:'Welcome to the API'})
})

module.exports = server;