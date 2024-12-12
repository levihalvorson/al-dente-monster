import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import process from './process';

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

    const body: { actions: string[] } = JSON.parse(req.body.json);
    const actions = body.actions;
    if (!actions) {
      res.status(400).send('No actions were specified.');
      return;
    }

    const multerFiles = req.files as Express.Multer.File[];
    const fileNames = multerFiles.map((file: Express.Multer.File) => file.filename);
    await process({
      files: fileNames,
      actions,
    });
    res.status(200).send({message: 'Success'});
  } catch (error) {
    console.log('🚀 -> PDFNet -> error:', JSON.stringify(error));
    res.status(500).send('Error');
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
