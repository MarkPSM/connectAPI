const express = require("express");
const router = express.Router();
const pool = require("../db.js");

// GET
router.get("/", async (req, res) => {
    res.json((await pool.query("SELECT * FROM place")).rows);
});

// GET por ID
router.get("/:id", async (req, res) => {
    res.json((await pool.query("SELECT * FROM place WHERE ID=$1", [req.params.id])).rows[0]);
});

// POST
router.post("/", async (req, res) => {
    const { IDCase, PinNum, Risk } = req.body;
    const result = await pool.query(
        "INSERT INTO place (IDCase, PinNum, Risk) VALUES ($1,$2,$3) RETURNING *",
        [IDCase, PinNum, Risk]
    );
    res.json(result.rows[0]);
});

// PUT
router.put("/:id", async (req, res) => {
    const { IDCase, PinNum, Risk } = req.body;
    const result = await pool.query(
        "UPDATE place SET IDCase=$1, PinNum=$2, Risk=$3 WHERE ID=$4 RETURNING *",
        [IDCase, PinNum, Risk, req.params.id]
    );
    res.json(result.rows[0]);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await pool.query("DELETE FROM place WHERE ID=$1", [req.params.id]);
    res.json({ message: "Place removido" });
});

module.exports = router;
