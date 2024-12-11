import express, { Express, Request, Response } from "express";
import { PDFNet } from '@pdftron/pdfnet-node';

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/actions", async (req: Request, res: Response) => {
  const main = async () => {
    const doc = await PDFNet.PDFDoc.create();
    const page = await doc.pageCreate();
    doc.pagePushBack(page);
    doc.save('blank.pdf', PDFNet.SDFDoc.SaveOptions.e_linearized);
  };
  
  // add your own license key as the second parameter, e.g. in place of 'YOUR_LICENSE_KEY'.
  PDFNet.runWithCleanup(main, 'demo:1683842987815:7dd33b160300000000121d415dc2081c7eab9515b4cb8a5de30b5b8157')
    .catch(function (error) {
      console.log('Error: ' + JSON.stringify(error));
    })
    .then(function () {
      PDFNet.shutdown();
      res.send('Success');
    });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});