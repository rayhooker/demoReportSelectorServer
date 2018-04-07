const { MongoClient } = require('mongodb')
const express = require('express')
const next = require('next')

const body = require('body-parser')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const co = require('co') 

const { parse } = require('url')
 
const handle = app.getRequestHandler()
const MONGO_URL = 'mongodb://localhost:27017/srcnc'
const PORT = 3000;
 
// var prefix = process.env.NODE_ENV === 'production' ? '/src' : '';
var prefix = '/src' 
if (process.env.NODE_ENV !== 'production') {
    console.log("Not production")
} else {
    console.log('Running in Production')
}

co(function * () {
    yield app.prepare()
    console.log(`Connecting to ${MONGO_URL}`)
    const db = yield MongoClient.connect(MONGO_URL) 
    const server = express()
    const router = express.Router();
    server.use(body.json())
        server.use((req, res, next) => { 
        req.db = db
        next()
    }) 
    const wrapAsync = handler => (req, res) => handler(req, res)
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.message })); 


    server.use(`${prefix}`,router)
    if (process.env.NODE_ENV === 'production') {
        prefix = '/src'
        server.use(`${prefix}/static`, express.static('static'));
 
    }

    server.use(handle); 
    router.get('*', (req, res) => {
        return handle(req, res)
    });
    server.listen(PORT)
    console.log(`Listening on ${PORT}`)
}).catch(error => console.error(error.stack))
