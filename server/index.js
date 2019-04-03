const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()
app.use(cors())
app.use(bodyParser.json())

const ObjectID = require('mongodb').ObjectID
let db

MongoClient.connect('mongodb://localhost:27017/blogposts', (err, client) => {
    if (err) throw err
    db = client.db('blogposts')
})

app.use(cors())
app.use(bodyParser.json())

app.post('/post', (req, res) => {
    db.collection('posts').insertOne(req.body, cucc => {
        res.sendStatus(201)
    })
})

app.get('/', (req, res) => {
    db.collection('posts').find({}).sort({ idopont: -1 })
        .toArray((err, result) => {
            if (err) throw err
            res.send(result)
        })
})

app.post('/comment', (req, res) => {
    let id = req.body.id
    countComments(id, function (result) {
        let setValue = {}
        let index = -1
        if (!(result.comment)) {
            index = 0
        } else {
            index = Object.values(
                result.comment).length;
        }
        setValue['comment.' + index] = {
            "szoveg": req.body.szoveg,
            "nev": req.body.nev,
            "idopont": req.body.idopont
        };
        db.collection('posts').updateOne(
            { _id: ObjectID(id) },
            { $set: setValue }
            , function (err) {
                if (err) {
                    res.sendStatus(500)
                }
                res.sendStatus(200)
            })
    });
})

function countComments(id, callback) {
    db.collection('posts').findOne(ObjectID(id), function (err, res) {
        if (err) {
            callback(err)
        } else {
            callback(res)
        }
    })
}

app.listen(8082)