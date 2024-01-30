import { NextHandleFunction } from "connect";
import { Express } from "express-serve-static-core";
import { handleCompletionRequest } from "./request_handlers/handleCompeletionRequest";
import { handleModelsRequest } from "./request_handlers/handleModelsRequest";

function testing_handler(req: any, res: { send: (arg0: string) => void }) {
  res.send("This is test response");
}

function registerEndpoints(app: Express, jsonParser: NextHandleFunction) {
  app.get("/test", testing_handler);
  app.get("/v1/models", jsonParser, handleModelsRequest);
  app.post("/v1/chat/completions", jsonParser, handleCompletionRequest);
}
//this is for nodejs
// module.exports = {
//   registerEndpoints,
// };
//this is for typescript
export { registerEndpoints };
