const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()
app.use(cors())
app.use(bodyParser.json())

MongoClient.connect('mongodb://localhost:27017/blogposts', (err, client) => {
    if (err) throw err
    db=client.db('blogposts')
})

app.use(cors())
app.use(bodyParser.json())

app.post('/post', (req, res) => {
    db.collection('posts').insertOne(req.body, cucc => {
        res.sendStatus(201)
    })
})

app.get('/', (req, res) => {
    db.collection('posts').find({})
        .toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.listen(8082)