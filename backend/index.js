const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');  // أضف هذه السطر
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/items', require('./routes/items'));
app.use('/api/messages', require('./routes/message'));

// Serve React build folder
app.use(express.static(path.join(__dirname, "../frontend/kfupmmarket/build"))); // أضف هذه السطر

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/kfupmmarket/build/index.html"));
});

// Connect DB & Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server running on port', process.env.PORT);
    });
  })
  .catch(err => console.error(err));
