const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const apiRouter = require('./apiRouter');

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api', apiRouter);

server.get('/', (req, res)=>{
    res.status(200).json({message:'Welcome to the API'})
})

module.exports = server;