"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var mongoose = require("mongoose");
var productSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Price: { type: Number, required: true },
    UpdateDate: { type: Date }
});
productSchema.method('toClient', function () {
    var obj = this.toObject();
    // Rename fields
    // obj.Id = obj._id;
    var Id = obj._id;
    delete obj._id;
    delete obj.__v;
    // return obj;
    return __assign(__assign({}, obj), { Id: Id });
});
var Product = mongoose.model('product', productSchema);
exports["default"] = Product;
