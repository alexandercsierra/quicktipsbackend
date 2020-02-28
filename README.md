# Template Server for authentication with JSON Web Tokens (JWTs) 


| Method | Endpoint | Description | Required |
| :----: | :---- | :---- | :---- |
| POST | /api/auth/register | Register a user.  | user object |
| POST | /api/auth/login | Login, generates a token | user object |
| GET | /api/users | Get a list of users | token |
| GET | /api/users/:id | Get a user by an identifier | token |



### Sample user object:
```javascript
{
    "username": "bob1234",
    "password": "pass5940"
}
```


### .env
```javascript
DB_ENV=development

DATABASE_URL=postgresql://postgres:yourpassword@localhost/dbname
```

### knexfile.js

```javascript
module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    }
  },

  testing: {
    client: 'pg',
    connection: 'postgresql://localhost/dbname',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: "",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    }
  }

};
```

### sample tests
```javascript
const request = require('supertest');
const server = require('../api/server');

describe('cohorts router', function(){
   it('should run the tests', function(){
       expect(true).toBe(true);
   })


    describe('GET /', function(){
        it('should return 200 OK', function(){
            return request(server).get('/api/cohorts')
                .then(res=>{
                    expect(res.status).toBe(200);
                })
        })

        it ('should return an array of cohorts as the router value', function(){
            return request(server).get('/api/cohorts').then(res=>{
                expect(Array.isArray(res.body)).toBe(true)
            })
        })

        it ('should return json', function(){
            return request(server).get('/api/cohorts').then(res=>{
                expect(res.type).toMatch(/json/)
            })
        })

    })



})
```


