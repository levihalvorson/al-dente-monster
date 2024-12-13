import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import process from './process';
import OpenAI from "openai";
import path from 'path';

const openai = new OpenAI({ apiKey: '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', project: 'proj_aV4aoqnJfYTYdepk8qqZtiCa'});

export const sendMessageToChatGPT = async (message: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: `I have three actions I can do to process files: merge, pdfToWord and toPdf. Return the actions asked for this question: '${message}' in action names separated by comma, no extra description`,
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

const actionFileExtensionMap = {
  merge: 'pdf',
  pdfToWord: 'doc',
  toPdf: 'pdf',
}

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/actions', upload.array('pdfs', 12), async (req: Request, res: Response) => {
  try {
    const fileNames: string[] = [];
    const body: {  message: string; filePath?: string} = JSON.parse(req.body.json);
    const aiResponse = await sendMessageToChatGPT(body.message);
    const actions = aiResponse?.split(',').map((action: string) => action.trim()) || [];
    console.log("=== actions ====", actions)
    if(body.filePath) {
      fileNames.push(path.join(__dirname, '../../public/', body.filePath));
    } else {
      const multerFiles = req.files as Express.Multer.File[];
      fileNames.push(...multerFiles.map((file: Express.Multer.File) => file.filename));
    }


    
    // const actions = body.actions;
    // if (!actions) {
    //   res.status(400).send('No actions were specified.');
    //   return;
    // }


     await process({
      files: fileNames,
      actions,
    });
    // waiting for the file to be written
    //@ts-ignore
    const fileExtension = actionFileExtensionMap[actions.pop()];
    console.log("🚀 -> fileExtension", fileExtension)
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    res.status(200).send({message: 'Success', processedFile: `processed.${fileExtension}`});
  } catch (error) {
    console.log(error)
    console.log('🚀 -> PDFNet -> error:', JSON.stringify(error));
    res.status(500).send('Error');
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
