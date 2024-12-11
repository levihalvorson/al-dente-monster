import express, { Express, Request, Response } from "express";
import pdfToWord from "./pdfToWord";

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/actions", async (req: Request, res: Response) => {
  await pdfToWord();
  res.send('Success');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});