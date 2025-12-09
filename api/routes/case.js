const express = require("express");
const router = express.Router();
const pool = require("../db.js");

// GET todos os cases
router.get("/", async (req, res) => {
    const result = await pool.query('SELECT * FROM "case"');
    res.json(result.rows);
});

// GET por ID
router.get("/:id", async (req, res) => {
    const result = await pool.query('SELECT * FROM "case" WHERE ID=$1', [req.params.id]);
    res.json(result.rows[0]);
});

// POST criar
router.post("/", async (req, res) => {
    const { IDClient, Blueprint, CustomBlueprint } = req.body;
    const result = await pool.query(
        'INSERT INTO "case" (IDClient, Blueprint, CustomBlueprint) VALUES ($1,$2,$3) RETURNING *',
        [IDClient, Blueprint, CustomBlueprint]
    );
    res.json(result.rows[0]);
});

// PUT atualizar
router.put("/:id", async (req, res) => {
    const { IDClient, Blueprint, CustomBlueprint } = req.body;
    const result = await pool.query(
        'UPDATE "case" SET IDClient=$1, Blueprint=$2, CustomBlueprint=$3 WHERE ID=$4 RETURNING *',
        [IDClient, Blueprint, CustomBlueprint, req.params.id]
    );
    res.json(result.rows[0]);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await pool.query('DELETE FROM "case" WHERE ID=$1', [req.params.id]);
    res.json({ message: "Case removido" });
});

module.exports = router;
