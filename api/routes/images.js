const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.get("/", async (req, res) => {
    res.json((await pool.query("SELECT * FROM images")).rows);
});

router.get("/:id", async (req, res) => {
    res.json((await pool.query("SELECT * FROM images WHERE ID=$1", [req.params.id])).rows[0]);
});

router.post("/", async (req, res) => {
    const { IDPlace, ImgPath } = req.body;

    const result = await pool.query(
        "INSERT INTO images (IDPlace, ImgPath) VALUES ($1,$2) RETURNING *",
        [IDPlace, ImgPath]
    );
    res.json(result.rows[0]);
});

router.put("/:id", async (req, res) => {
    const { IDPlace, ImgPath } = req.body;

    const result = await pool.query(
        "UPDATE images SET IDPlace=$1, ImgPath=$2 WHERE ID=$3 RETURNING *",
        [IDPlace, ImgPath, req.params.id]
    );
    res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
    await pool.query("DELETE FROM images WHERE ID=$1", [req.params.id]);
    res.json({ message: "Imagem removida" });
});

module.exports = router;
