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

app.post('/', (req, res) => {
    console.log(req.body)
    db.collection('blogposts').insertOne(req.body, cucc => {
        res.send(cucc)
    })
    res.send('Britney!')
})

app.listen(8082)