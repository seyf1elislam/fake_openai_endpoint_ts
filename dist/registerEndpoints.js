"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEndpoints = void 0;
const handleCompeletionRequest_1 = require("./request_handlers/handleCompeletionRequest");
const handleModelsRequest_1 = require("./request_handlers/handleModelsRequest");
function testing_handler(req, res) {
    res.send("This is test response");
}
function registerEndpoints(app, jsonParser) {
    app.get("/test", testing_handler);
    app.get("/v1/models", jsonParser, handleModelsRequest_1.handleModelsRequest);
    app.post("/v1/chat/completions", jsonParser, handleCompeletionRequest_1.handleCompletionRequest);
}
exports.registerEndpoints = registerEndpoints;
//this is for nodejs
module.exports = {
    registerEndpoints,
};
//# sourceMappingURL=registerEndpoints.js.map