"use strict";
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
var product_model_1 = require("../models/product.model");
var validation = function (_a) {
    var Name = _a.Name, Price = _a.Price;
    return Name && Name.length <= 100 && Price && !isNaN(Number(Price));
};
var productController = {
    getAll: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('getAll controller was called');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, product_model_1["default"].find()];
                case 2:
                    result = _a.sent();
                    if (!result)
                        res.status(404).json({ product: 'Not found' });
                    else
                        res.json(result.map(function (r) { return r.toClient(); }));
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    res.status(500).json({ message: err_1 });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    getOne: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var prod, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, product_model_1["default"].findById(req.params.id)];
                case 1:
                    prod = _a.sent();
                    if (!prod) {
                        res.status(404).json({ message: 'Not found' });
                    }
                    else {
                        res.json(prod.toClient());
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    res.status(500).json({ message: err_2 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    addOne: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, Name, Price, UpdateDate, product, savedProduct, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!validation(req.body)) return [3 /*break*/, 5];
                    _a = req.body, Name = _a.Name, Price = _a.Price;
                    UpdateDate = new Date();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    product = new product_model_1["default"]({ Name: Name, Price: Price, UpdateDate: UpdateDate });
                    return [4 /*yield*/, product.save()];
                case 2:
                    savedProduct = _b.sent();
                    res.json(savedProduct.toClient());
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _b.sent();
                    res.status(500).json({ message: err_3 });
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    res.status(400).json({ message: 'ERROR. Required fields are missing or incorrect' });
                    _b.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); },
    edit: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, Name, Price, product, productSaved, err_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!req.params.id) return [3 /*break*/, 8];
                    _a = req.body, Name = _a.Name, Price = _a.Price;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, product_model_1["default"].findById(req.params.id)];
                case 2:
                    product = _b.sent();
                    if (!!product) return [3 /*break*/, 3];
                    res.status(404).json({ message: 'Not found' });
                    return [3 /*break*/, 5];
                case 3:
                    product.Name = Name ? Name : product.Name;
                    product.Price = Price ? Price : product.Price;
                    return [4 /*yield*/, product.save()];
                case 4:
                    productSaved = _b.sent();
                    res.json(productSaved.toClient());
                    _b.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_4 = _b.sent();
                    res.status(500).json({ message: err_4 });
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    res.status(400).json({ message: 'ERROR. Id is required to edit' });
                    _b.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    }); },
    "delete": function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var prod, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    prod = product_model_1["default"].findById(req.params.id);
                    if (!!prod) return [3 /*break*/, 1];
                    res.status(404).json({ message: 'Not found' });
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, product_model_1["default"].deleteOne({ _id: req.params.id })];
                case 2:
                    _a.sent();
                    res.json({ message: 'OK, product is deleted' });
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_5 = _a.sent();
                    res.status(500).json({ message: err_5 });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); }
};
exports["default"] = productController;
