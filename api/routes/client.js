const express = require("express");
const router = express.Router();
const pool = require("../db.js");

// GET todos os clientes
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM client");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar clientes" });
    }
});

// GET cliente por ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const client = await pool.query("SELECT * FROM client WHERE ID = $1", [id]);
        const cases = await pool.query('SELECT * FROM "case" WHERE IDClient = $1', [id]);

        res.json({
            client: client.rows[0],
            cases: cases.rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar cliente" });
    }
});

// POST criar cliente
router.post("/", async (req, res) => {
    const { Name, Enterprise, Role } = req.body;
    const result = await pool.query(
        "INSERT INTO client (Name, Enterprise, Role) VALUES ($1, $2, $3) RETURNING *",
        [Name, Enterprise, Role]
    );
    res.json(result.rows[0]);
});

// PUT atualizar
router.put("/:id", async (req, res) => {
    const { Name, Enterprise, Role } = req.body;
    const result = await pool.query(
        "UPDATE client SET Name=$1, Enterprise=$2, Role=$3 WHERE ID=$4 RETURNING *",
        [Name, Enterprise, Role, req.params.id]
    );
    res.json(result.rows[0]);
});

// DELETE remover
router.delete("/:id", async (req, res) => {
    await pool.query("DELETE FROM client WHERE ID = $1", [req.params.id]);
    res.json({ message: "Cliente removido" });
});

module.exports = router;
