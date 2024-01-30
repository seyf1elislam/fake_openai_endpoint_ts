import { Response,Request } from "express";


export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export function get_header_token(request:Request) {
  let auth = request.headers.authorization;
  let header_token = (auth || "").replace("Bearer ", "");
  return header_token;
}

export function wrap_textchunk_in_openai_jsonformat(bot: String, content: String ) {
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