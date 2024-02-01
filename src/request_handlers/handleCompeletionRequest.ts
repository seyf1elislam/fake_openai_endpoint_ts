import {
  delay,
  get_header_token,
  wrap_textchunk_in_openai_jsonformat,
} from "./utils";
import { Response, Request } from "express";
let DELAY_TIME: number = 1000;
let DELAY_TIME_STREAM: number = 200;
//write default message with 50words
let default_message: String = `This is a test message that has been sent from the server. to test the streaming feature of the openai api.
if you are seeing this message then the streaming feature is working fine.
if you did not see this message then there is a problem with the streaming feature.
please check the server logs for more information.
This is a test message that has been sent from the server. to test the streaming feature of the openai api.
if you are seeing this message then the streaming feature is working fine.
if you did not see this message then there is a problem with the streaming feature.
please check the server logs for more information.
This is a test message that has been sent from the server. to test the streaming feature of the openai api.
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
    response.sendStatus(401);
  }
  request.socket.removeAllListeners("close");
  request.socket.on("close", function () {
    console.log("request closed ------------------>");
  });

  let bot: String = request.body.model;
  const streaming: Boolean = request.body.stream ?? false;

  try {
    if (streaming) {
      let message_chunk: Array<String> = default_message.split(" ");
      for (const chunk of message_chunk) {
        if (response.headersSent === false) {
          response.writeHead(200, {
            "Content-Type": "text/event-stream; charset=utf-8",
            // "Content-Type": "application/json;charset=utf-8",
            "Transfer-Encoding": "chunked",
            Connection: "keep-alive",
            "Cache-Control": "no-cache",
          });
        }
        let reply = wrap_textchunk_in_openai_jsonformat(bot, chunk + " ");
        // let reply = JSON.stringify({ choices: [{ message: { content: chunk } }] });
        response.write(`data: ${reply}\n\n`, "utf-8");
        await delay(DELAY_TIME_STREAM);
      }
      response.end();
    } else {
      //? non streaming mode =================================================
      await delay(DELAY_TIME);
      // Wrap it back to OAI format
      let reply: any = {
        choices: [{ message: { content: default_message } }],
      };

      response.send(reply);
    }
  } catch (err) {
    console.error(err);
    response.sendStatus(500);
  } finally {
  }
}
