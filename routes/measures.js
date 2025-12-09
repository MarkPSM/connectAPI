const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
    res.json((await pool.query("SELECT * FROM measures")).rows);
});

router.get("/:id", async (req, res) => {
    res.json((await pool.query("SELECT * FROM measures WHERE ID=$1", [req.params.id])).rows[0]);
});

router.post("/", async (req, res) => {
    const { IDPlace, Width, Lenght, Area, Height } = req.body;

    const result = await pool.query(
        "INSERT INTO measures (IDPlace, Width, Lenght, Area, Height) VALUES ($1,$2,$3,$4,$5) RETURNING *",
        [IDPlace, Width, Lenght, Area, Height]
    );

    res.json(result.rows[0]);
});

router.put("/:id", async (req, res) => {
    const { IDPlace, Width, Lenght, Area, Height } = req.body;

    const result = await pool.query(
        "UPDATE measures SET IDPlace=$1, Width=$2, Lenght=$3, Area=$4, Height=$5 WHERE ID=$6 RETURNING *",
        [IDPlace, Width, Lenght, Area, Height, req.params.id]
    );
    res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
    await pool.query("DELETE FROM measures WHERE ID=$1", [req.params.id]);
    res.json({ message: "Medida removida" });
});

module.exports = router;
