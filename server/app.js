const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes');
const dbConnect = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const app = express();
app.use(
    cors({
      // origin: ["http://localhost:5173"],
      origin: ["https://test-generator-frontend-amber.vercel.app"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
);
app.use(express.json());
dbConnect()
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes)

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
