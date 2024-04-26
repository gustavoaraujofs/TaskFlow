const express = require("express");
const tasksRoutes = require("./routes/tasksRoutes");

const app = express();

app.use(express.json());
app.use(tasksRoutes);

module.exports = app;
