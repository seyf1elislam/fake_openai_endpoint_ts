import express, { Express, Request, Response } from "express";
const jsonParser = express.json({ limit: "100mb" });
import { registerEndpoints } from "./registerEndpoints";

const PORT: number = 3000;
const app: Express = express();
registerEndpoints(app, jsonParser);

app.get("/", (req: Request, res: Response) => {
  res.send(`<h2 align="center">Hello World (>.<)</h2>
   <h3 align="center"> FakeOpenAI api EndPooint  runing here http://localhost:${PORT}/v1</h3>
    `);
});

app.listen(PORT, () => {
  console.log("---------------------------------------------");
  console.log("FakeOpenAI api EndPooint  runing on http://127.0.0.1:3000/v1");
  console.log("---------------------------------------------");
});
