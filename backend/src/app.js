const express = require("express");
const tasksRoutes = require("./routes/tasksRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(tasksRoutes);
app.use(userRoutes);
app.use(authRoutes);

module.exports = app;
