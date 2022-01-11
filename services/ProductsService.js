"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../models/product.model"));
const typedi_1 = require("typedi");
let ProductsService = class ProductsService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_model_1.default.find();
            if (!products)
                return [];
            else
                return products.map((r) => r.toClient());
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.findById(id);
            return product ? product.toClient() : product;
        });
    }
    addOne(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Name, Price } = newProduct;
            const UpdateDate = new Date();
            const product = new product_model_1.default({ Name, Price, UpdateDate });
            const productSaved = yield product.save();
            return productSaved.toClient();
        });
    }
    edit(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            let { Name, Price, Id } = newProduct;
            const product = yield product_model_1.default.findById(Id);
            if (!product) {
                return null;
            }
            else {
                product.Name = Name ? Name : product.Name;
                product.Price = Price ? Price : product.Price;
                product.UpdateDate = new Date();
                const productSaved = yield product.save();
                return productSaved.toClient();
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const prod = yield product_model_1.default.findById(id);
            if (prod) {
                yield product_model_1.default.deleteOne({ _id: id });
            }
            return prod;
        });
    }
};
ProductsService = __decorate([
    typedi_1.Service()
], ProductsService);
exports.default = ProductsService;
//# sourceMappingURL=ProductsService.js.map