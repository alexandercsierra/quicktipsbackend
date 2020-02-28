module.exports = {
    add,
    findBy,
    getAll,
    remove
}

const db = require('../data/db-config');

function add(user){
    return db('users').insert(user);
}

function findBy(filter){
    return db('users').where(filter);
}

function getAll(){
    return db('users');
}

function remove (id){
    return db('users').where({id}).del();
}