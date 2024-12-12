import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import process from "./process";

const app: Express = express();
const port = 3001;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/actions", async (req: Request, res: Response) => {
  try {
    const { files, actions } = req.body;
    console.log("🚀 -> app.post -> actions:", actions)
    console.log("🚀 -> app.post -> files:", files)
    await process({
      files: ['file1.pdf', 'file2.pdf', 'file3.pdf'],
      actions: ['merge', 'pdfToWord'],
    })
    res.send('Success');
  } catch (error) {
    console.log("🚀 -> app.post -> error:", error)
    console.log("🚀 -> PDFNet -> error:", JSON.stringify(error))
    res.status(500).send('Error');
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});