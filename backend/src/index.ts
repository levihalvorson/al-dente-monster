import express, { Express, Request, Response } from "express";
import pdfToWord from "./pdfToWord";
import { PDFNet } from '@pdftron/pdfnet-node';

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/actions", async (req: Request, res: Response) => {
  try {
    const resultBuffer = await PDFNet.runWithCleanup(pdfToWord, 'demo:1683842987815:7dd33b160300000000121d415dc2081c7eab9515b4cb8a5de30b5b8157');
    
    res.send({ resultBuffer: resultBuffer.toString() });
    PDFNet.shutdown();
  } catch (error) {
    console.log("🚀 -> PDFNet -> error:", JSON.stringify(error))
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});