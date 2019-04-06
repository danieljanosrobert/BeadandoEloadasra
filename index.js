const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://USER:User@blogbeadando-guo2m.gcp.mongodb.net/test?retryWrites=true"
let db
app.use(cors())
app.use(bodyParser.json())
const ObjectID = require('mongodb').ObjectID

MongoClient.connect(uri, {useNewUrlParser: true }, (err, client) => {
    if (err) throw err
    db = client.db('blogposts')
})

app.use('/', express.static('client/dist'));

app.post('/post', (req, res) => {
    db.collection('posts').insertOne(req.body, cucc => {
        res.sendStatus(201)
    })
})

app.get('/list', (req, res) => {
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

let port = process.env.PORT || 38304 
if (app.listen(port))
    console.log("app up at port: "+port)