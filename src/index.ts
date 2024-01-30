// const express = require("express");
import express, { Request, Response } from "express";
const app = express();

const jsonParser = express.json({ limit: "100mb" });
import { registerEndpoints } from "./registerEndpoints";
registerEndpoints(app, jsonParser);

// Custom middleware to log requests
// app.use((req, res, next) => {
//     console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
//     next();
//   });
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("---------------------------------------------");
  console.log("FakeOpenAI api  runing on http://127.0.0.1:3000/v1");
  console.log("---------------------------------------------");
});
