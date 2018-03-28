"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
class Api {
    constructor() {
        this.express = express();
    }
    middleware() {
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
    }
}
exports.default = new Api().express;
