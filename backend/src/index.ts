import express, { Express, Request, Response } from "express";
import process from "./process";

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/actions", async (req: Request, res: Response) => {
  try {
    // const { files, actions } = req.body;
    await process({
      files: ['file1.pdf', 'file2.pdf', 'file3.pdf'],
      actions: ['merge', 'pdfToWord'],
    })
    res.send('Success');
  } catch (error) {
    console.log("🚀 -> PDFNet -> error:", JSON.stringify(error))
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});