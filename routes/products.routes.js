"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const ProductsController_1 = __importDefault(require("../controllers/ProductsController"));
const typedi_1 = __importDefault(require("typedi"));
const router = express.Router();
exports.router = router;
const productsController = typedi_1.default.get(ProductsController_1.default);
router.get('/list', (res, req) => productsController.getAll(res, req));
router.get('/details/:id', (res, req) => productsController.getOne(res, req));
router.post('/create', (res, req) => productsController.addOne(res, req));
router.put('/edit', (res, req) => productsController.edit(res, req));
router.delete('/delete/:id', (res, req) => productsController.delete(res, req));
//# sourceMappingURL=products.routes.js.map