"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const jsonParser = express_1.default.json({ limit: "100mb" });
const registerEndpoints_js_1 = require("./registerEndpoints.js");
(0, registerEndpoints_js_1.registerEndpoints)(app, jsonParser);
// Custom middleware to log requests
// app.use((req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
//     next();
//   });
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(3000, () => {
    console.log("---------------------------------------------");
    console.log("FakeOpenAI api  runing on http://127.0.0.1:3000/v1");
    console.log("---------------------------------------------");
});
//# sourceMappingURL=index.js.map