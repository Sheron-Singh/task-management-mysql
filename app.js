const express = require("express");
const app = express();
const morgan = require("morgan");

const UserRoutes = require("./routes/user.route");
const AuthRoutes = require("./routes/auth.route");
const TaskRoutes = require("./routes/task.route");

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/tasks", TaskRoutes);
app.use("/api/v1/users", UserRoutes);


module.exports = app;