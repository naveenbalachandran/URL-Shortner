// install express with `npm install express` 
const express = require('express')
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
app.use(bodyParser.json())
app.use(cors())
mongoose.connect("mongodb+srv://root:wNlSMmR1C2HkchUS@cluster0.li8db.mongodb.net/link?retryWrites=true&w=majority")
const urlSchema = new mongoose.Schema({
    longUrl: String,
    shortUrl: String
})
const Url = mongoose.model("Url", urlSchema)
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.post("/links", (req, res) => {
    console.log(req.body)
    const newUrl = new Url({
        longUrl: req.body.longUrl,
        shortUrl: req.body.shortUrl
    })
    newUrl.save((err, data) => {
        if (err) {
            res.send(err)
        }
        res.send(data)
    })
})
app.get("/links/:link", (req, res) => {
    Url.findOne({ shortUrl: req.params.link }, (err, data) => {
        if (err) {
            res.send(err)
        }
        res.send(data.longUrl)
    }
    )
})

// export 'app'
module.exports = app
// app.listen(3000, () => console.log('Example app listening on port 3000!'))