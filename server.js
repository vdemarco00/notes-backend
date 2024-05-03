const express = require("express")
const app = express()
const db = require("./database")
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const notesRouter = require('./routes/notes-router')

app.use('/notes', notesRouter)

app.use(function(req, res){
    res.status(404);
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on Port ${process.env.PORT}`)
});
