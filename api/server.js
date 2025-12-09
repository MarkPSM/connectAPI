import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clientRoutes from "./routes/client.js";
import caseRoutes from "./routes/case.js";
import placeRoutes from "./routes/place.js";
import imageRoutes from "./routes/image.js";
import measureRoutes from "./routes/measure.js";

dotenv.config();

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

export default app;