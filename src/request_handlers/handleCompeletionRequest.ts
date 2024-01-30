import {
  delay,
  get_header_token,
  wrap_textchunk_in_openai_jsonformat,
} from "./utils";
import { Response, Request } from "express";
//write default message with 50words
let default_message: String = `This is a test message that has been sent from the server. to test the streaming feature of the openai api.
if you are seeing this message then the streaming feature is working fine.
if you did not see this message then there is a problem with the streaming feature.
please check the server logs for more information.
`;
export async function handleCompletionRequest(
  request: Request,
  response: Response
) {
  console.log(" compeletion Called ------------------");
  let header_token = get_header_token(request);

  if (!header_token) {
    console.log("No token provided");
    return response.sendStatus(401);
  }
  request.socket.removeAllListeners("close");
  request.socket.on("close", function () {
    console.log("socket closed ------------------");
  });
  //?===========================================
  let bot: String = request.body.model;
  const streaming: Boolean = request.body.stream ?? false;

  await delay(100);
  await delay(100);
  if (streaming) {
    try {
      let message_chunk: Array<String> = default_message.split(" ");
      message_chunk.forEach(async (chunk: String) => {
        if (response.headersSent === false) {
          response.writeHead(200, {
            "Content-Type": "text/event-stream; charset=utf-8",
            // "Content-Type": "application/json;charset=utf-8",
            "Transfer-Encoding": "chunked",
            Connection: "keep-alive",
            "Cache-Control": "no-cache",
          });
        }
        // let reply = wrap_textchunk_in_openai_jsonformat(bot, chunk);
        let dic = { choices: [{ message: { content: chunk } }] };
        let reply = JSON.stringify(dic);
        response.write(`data: ${reply}`, "utf-8");
        await delay(1000);
        // response.write(`data: ${reply}\n\n`, "utf-8");
        // response.send(`data: ${reply}\n\n`, "utf-8");
        console.log("sent chunk ------------------>" + chunk);
      });
      //!===========================================
      //!===========================================
    } catch (err) {
      console.error(err);
    } finally {
      response.end();
    }
  } else {
    //? non streaming mode =================================================
    try {
      await delay(1000);
      // Wrap it back to OAI format
      let reply: any = {
        choices: [{ message: { content: default_message } }],
      };

      response.send(reply);
    } catch {
      return response.sendStatus(500);
    }
  }
}
