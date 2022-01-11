"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
const typedi_1 = require("typedi");
const ProductsService_1 = __importDefault(require("../services/ProductsService"));
const validation = ({ Name, Price }) => {
    return Name && Name.length <= 100 && Price && !isNaN(Number(Price));
};
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('this', this);
            console.log('this.productsService', this.productsService);
            try {
                const result = yield this.productsService.getAll();
                if (!result.length)
                    res.status(404).json({ product: 'Not found' });
                else
                    res.json(result);
            }
            catch (err) {
                res.status(500).json({ message: err });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('getOne in controller was called');
            try {
                const prod = yield this.productsService.getOne(req.params.id);
                if (!prod) {
                    res.status(404).json({ message: 'Not found' });
                }
                else {
                    res.json(prod);
                }
            }
            catch (err) {
                res.status(500).json({ message: err });
            }
        });
    }
    addOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (validation(req.body)) {
                try {
                    const savedProduct = yield this.productsService.addOne(req.body);
                    res.json(savedProduct);
                }
                catch (err) {
                    res.status(500).json({ message: err });
                }
            }
            else {
                res.status(400).json({ message: 'ERROR. Required fields are missing or incorrect' });
            }
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { Name, Price, Id } = req.body;
            if (Id) {
                try {
                    const newProduct = yield this.productsService.edit({ Name, Price, Id });
                    if (!newProduct) {
                        res.status(404).json({ message: 'Not found' });
                    }
                    else {
                        res.json(newProduct);
                    }
                }
                catch (err) {
                    res.status(500).json({ message: err });
                }
            }
            else {
                res.status(400).json({ message: 'ERROR. Id is required to edit' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prod = this.productsService.delete(req.params.id);
                if (!prod) {
                    res.status(404).json({ message: 'Not found' });
                }
                else {
                    res.json({ message: 'OK, product is deleted' });
                }
            }
            catch (err) {
                res.status(500).json({ message: err });
            }
        });
    }
};
ProductsController = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [ProductsService_1.default])
], ProductsController);
exports.default = ProductsController;
//# sourceMappingURL=ProductsController.js.map