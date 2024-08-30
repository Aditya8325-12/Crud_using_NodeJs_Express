require("dotenv").config();
const express = require("express");
const conn = require("./config/db.js");
const cors = require("cors");
const Router = require("./Route/userRutes.js");

const app = express();

// midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use("/", Router);

module.exports = app;
