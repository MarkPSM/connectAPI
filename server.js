const express = require('express');
const cors = require('cors');

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

app.listen(3000, () => {
    console.log('API is running on port 3000');
});