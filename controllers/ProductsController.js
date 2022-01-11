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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var typedi_1 = require("typedi");
var ProductsService_1 = require("../services/ProductsService");
var validation = function (_a) {
    var Name = _a.Name, Price = _a.Price;
    return Name && Name.length <= 100 && Price && !isNaN(Number(Price));
};
var ProductsController = /** @class */ (function () {
    // constructor(private readonly productsService: ProductsService) {}
    function ProductsController() {
        this.productsService = typedi_1["default"].get(ProductsService_1["default"]);
    }
    ProductsController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('this', this);
                        console.log('this.productsService', this.productsService);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.productsService.getAll()];
                    case 2:
                        result = _a.sent();
                        if (!result.length)
                            res.status(404).json({ product: 'Not found' });
                        else
                            res.json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        res.status(500).json({ message: err_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.getOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var prod, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('getOne in controller was called');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.productsService.getOne(req.params.id)];
                    case 2:
                        prod = _a.sent();
                        if (!prod) {
                            res.status(404).json({ message: 'Not found' });
                        }
                        else {
                            res.json(prod);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        res.status(500).json({ message: err_2 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.addOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var savedProduct, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!validation(req.body)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.productsService.addOne(req.body)];
                    case 2:
                        savedProduct = _a.sent();
                        res.json(savedProduct);
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        res.status(500).json({ message: err_3 });
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(400).json({ message: 'ERROR. Required fields are missing or incorrect' });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype.edit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, Name, Price, Id, newProduct, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, Name = _a.Name, Price = _a.Price, Id = _a.Id;
                        if (!Id) return [3 /*break*/, 5];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.productsService.edit({ Name: Name, Price: Price, Id: Id })];
                    case 2:
                        newProduct = _b.sent();
                        if (!newProduct) {
                            res.status(404).json({ message: 'Not found' });
                        }
                        else {
                            res.json(newProduct);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _b.sent();
                        res.status(500).json({ message: err_4 });
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(400).json({ message: 'ERROR. Id is required to edit' });
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ProductsController.prototype["delete"] = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var prod;
            return __generator(this, function (_a) {
                try {
                    prod = this.productsService["delete"](req.params.id);
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
                return [2 /*return*/];
            });
        });
    };
    ProductsController = __decorate([
        typedi_1.Service()
    ], ProductsController);
    return ProductsController;
}());
exports["default"] = ProductsController;
