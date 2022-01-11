"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
require("reflect-metadata");
var products_routes_1 = require("./routes/products.routes");
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', products_routes_1.router);
app.use(function (req, res) {
    res.status(404).send({ message: 'Not found...' });
});
var PORT = 8080;
app.listen(PORT, function () { return console.log("app running on port " + PORT); });
var devDBString = 'mongodb://localhost:27017/products-API';
var dbURI = devDBString;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.once('open', function () {
    console.log('Connected to the database on uri: ', dbURI);
});
db.on('error', function (err) { return console.log('Error ' + err); });
