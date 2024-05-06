const express = require("express");
const tasksRoutes = require("./routes/tasksRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(tasksRoutes);
app.use(userRoutes);
app.use(authRoutes);
app.use(categoryRoutes);

module.exports = app;
