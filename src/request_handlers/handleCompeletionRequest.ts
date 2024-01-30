import { json } from "stream/consumers";
import { delay, get_header_token } from "./utils";
import { Response, Request } from "express";
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
  //?===========================================
  let bot = request.body.model;
  const streaming = request.body.stream ?? false;

  await delay(100);
  await delay(100);
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
      await delay(50);
      // response.write(json + "\n\n", "utf-8");
      response.write(`data: ${json}\n\n`, "utf-8");
      // reply = {   choices: [{ message: { content: reply.replace(/_/g, "*") } }] };
      console.log("sent chunk ------------------>");

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
      await delay(200);
      // Wrap it back to OAI format
      const msg = "this is reply";
      let reply: any = {
        choices: [{ message: { content: msg.replace(/_/g, "*") } }],
      };
      response.send(reply);
    } catch {
      return response.sendStatus(500);
    }
  }
}
