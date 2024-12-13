import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import process from './process';
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: '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', project: 'proj_aV4aoqnJfYTYdepk8qqZtiCa'});

export const sendMessageToChatGPT = async (message: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: `I have three actions I can do to process files: merge, pdfToWord and toPdf. Return the actions asked for in this sentence: '${message}' in words separated by comma.`,
        },
    ],
});
  // console.log("🚀 -> sendMessageToChatGPT -> completion", completion.choices[0].message)
  return completion.choices[0].message.content;
};

const app: Express = express();
const port = 3001;
const upload = multer({ dest: 'src/files/' });

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/actions', upload.array('pdfs', 12), async (req: Request, res: Response) => {
  try {
    if (!req.files) {
      res.status(400).send('No files were uploaded.');
      return;
    }

    
    const body: { actions: string[]; message: string } = JSON.parse(req.body.json);
    // const actions = body.actions;
    // if (!actions) {
    //   res.status(400).send('No actions were specified.');
    //   return;
    // }
    const aiResponse = await sendMessageToChatGPT(body.message);
    const actions = aiResponse?.split(',').map((action: string) => action.trim()) || [];
    console.log("=== actions ====", actions)
    const multerFiles = req.files as Express.Multer.File[];
    const fileNames = multerFiles.map((file: Express.Multer.File) => file.filename);
    await process({
      files: fileNames,
      actions,
    });
    // waiting for the file to be written
    await new Promise((resolve) => setTimeout(resolve, 5000));
    res.status(200).send({message: 'Success'});
  } catch (error) {
    console.log('🚀 -> PDFNet -> error:', JSON.stringify(error));
    res.status(500).send('Error');
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
