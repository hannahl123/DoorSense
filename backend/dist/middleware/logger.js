"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = logger;
function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}
