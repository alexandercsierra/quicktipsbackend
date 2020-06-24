module.exports = {
    add,
    findBy,
    getAll,
    remove,
    update
}
const db = require('../data/db-config');

function add(guide){
    return db('guides').insert(guide);
}

function findBy(filter){
    return db('guides').where(filter).returning('*');
}

function getAll(){
    return db('guides').returning('*');
}

function remove (id){
    return db('guides').where({id}).del().returning('*');
}

function update(id, guide){
    return db('guides').where({id}).update(guide).returning('*');
}