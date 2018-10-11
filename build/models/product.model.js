"use strict";
/**
 * Entity Product
 * code: code
 * name: name
 * description: description
 * price: price
 */
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
exports.Schema = mongoose.Schema;
var schema = new exports.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
exports.ProductModel = mongoose.model('product', schema, 'Products', true);
