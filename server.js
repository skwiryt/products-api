"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("reflect-metadata");
const products_routes_js_1 = require("./routes/products.routes.js");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', products_routes_js_1.router);
app.use((_req, res) => {
    res.status(404).send({ message: 'Not found...' });
});
const PORT = 8080;
app.listen(PORT, () => console.log(`app running on port ${PORT}`));
const devDBString = 'mongodb://localhost:27017/products-API';
const dbURI = devDBString;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to the database on uri: ', dbURI);
});
db.on('error', err => console.log('Error ' + err));
//# sourceMappingURL=server.js.map