const express = require("express")
const app = express()
const db = require("./database")
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 8000 
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
});

// Get all notes
app.get("/notes/all", (req, res, next) => {
    let sql = "SELECT * FROM notes"
    let params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message})
            return
        }
        res.json({
            "message": "success",
            "data": rows
        })
    })
});

app.post("/notes/add/", (req, res, next) => {
    let sql = `INSERT INTO notes (id, text) VALUES (?, ?)`
    let params = [req.body.id, req.body.text]
    let errors = []
    if (!req.body.id) {
        errors.push("Missing required field id")
    }
    if (!req.body.text) {
        errors.push("Missing required field text")
    }
    if (errors.length > 0) {
        res.status(400).json({"error": errors.join(",")})
        return
    }
    db.run(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({"error": err.message})
            return
        }
        res.json({
            "message": "success",
            "id": req.body.id,
            "text": req.body.text
        })
    })
})

app.use(function(req, res){
    res.status(404);
});