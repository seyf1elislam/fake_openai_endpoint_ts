"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap_textchunk_in_openai_jsonformat = exports.get_header_token = exports.delay = void 0;
async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.delay = delay;
function get_header_token(request) {
    let auth = request.headers.authorization;
    let header_token = (auth || "").replace("Bearer ", "");
    return header_token;
}
exports.get_header_token = get_header_token;
function wrap_textchunk_in_openai_jsonformat(bot, content) {
    return JSON.stringify({
        id: `chatcmpl-${Date.now()}`,
        object: "chat.completions.chunk", // object: "chat.completions",
        created: Math.floor(Date.now() / 1000),
        model: bot,
        choices: [
            {
                index: 0,
                finish_reason: null,
                message: { role: "assistant", content: content },
                delta: { role: "assistant", content: content },
            },
        ],
    });
}
exports.wrap_textchunk_in_openai_jsonformat = wrap_textchunk_in_openai_jsonformat;
//# sourceMappingURL=utils.js.map