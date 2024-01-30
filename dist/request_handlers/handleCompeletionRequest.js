"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCompletionRequest = void 0;
const consumers_1 = require("stream/consumers");
const utils_js_1 = require("./utils.js");
async function handleCompletionRequest(request, response) {
    console.log(" compeletion Called ------------------");
    let header_token = (0, utils_js_1.get_header_token)(request);
    if (!header_token) {
        console.log("No token provided");
        return response.sendStatus(401);
    }
    request.socket.removeAllListeners("close");
    request.socket.on("close", function () {
        console.log("socket closed ------------------");
    });
    //?===========================================
    //?===========================================
    let bot = request.body.model;
    const streaming = request.body.stream ?? false;
    await (0, utils_js_1.delay)(100);
    await (0, utils_js_1.delay)(100);
    if (streaming) {
        try {
            let reply = "";
            // while (!isGenerationStopped) {
            // if (response.headersSent === false) {
            //   response.writeHead(200, {
            //     "Content-Type": "text/event-stream; charset=utf-8",
            //     "Transfer-Encoding": "chunked",
            //     Connection: "keep-alive",
            //     "Cache-Control": "no-cache",
            //     });
            // }
            await (0, utils_js_1.delay)(50);
            // response.write(json + "\n\n", "utf-8");
            response.write(`data: ${consumers_1.json}\n\n`, "utf-8");
            // reply = {   choices: [{ message: { content: reply.replace(/_/g, "*") } }] };
            console.log("sent chunk ------------------>");
            //!===========================================
            //!===========================================
        }
        catch (err) {
            console.error(err);
        }
        finally {
            response.end();
        }
    }
    else {
        //? non streaming mode =================================================
        try {
            await (0, utils_js_1.delay)(200);
            // Wrap it back to OAI format
            const msg = "this is reply";
            let reply = {
                choices: [{ message: { content: msg.replace(/_/g, "*") } }],
            };
            response.send(reply);
        }
        catch {
            return response.sendStatus(500);
        }
    }
}
exports.handleCompletionRequest = handleCompletionRequest;
//# sourceMappingURL=handleCompeletionRequest.js.map