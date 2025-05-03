const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes');
const dbConnect = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
dbConnect()
app.use('/api/questions', questionRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
