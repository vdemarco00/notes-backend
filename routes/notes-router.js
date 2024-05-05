const express = require('express')
const router = express.Router()

const db = require("../database")

// Get all notes
router.get("/all", (req, res, next) => {
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

router.post("/add", (req, res, next) => {
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

router.delete("/del", (req, res, next) => {
    let sql = `DELETE FROM notes WHERE (id=?)`
    let params = [req.body.id]
    let errors = []
    if (!req.body.id) {
        errors.push("Missing required field id")
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
            "id": req.body.id
        })
    })
})

router.patch("/edit", (req, res, next) => {
    let sql = `UPDATE notes SET text = ? WHERE id = ?`
    let params = [req.body.text, req.body.id]
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

module.exports = router