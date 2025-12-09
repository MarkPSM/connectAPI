import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db/pool.js";
import clientRoutes from "./routes/client.js";
import caseRoutes from "./routes/case.js";
import placeRoutes from "./routes/place.js";

const clientRoutes = require('./routes/client');
const caseRoutes = require('./routes/case');
const placeRoutes = require('./routes/place');
const imageRoutes = require('./routes/image');
const measureRoutes = require('./routes/measure');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/client', clientRoutes);
app.use('/case', caseRoutes);
app.use('/place', placeRoutes);
app.use('/images', imageRoutes);
app.use('/measures', measureRoutes);

app.get("/", (req, res) => {
  res.send("API Online.");
});