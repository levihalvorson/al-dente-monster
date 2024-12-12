import { PDFNet } from '@pdftron/pdfnet-node';
import merge from './merge';
import pdfToWord from './pdfToWord';
import pipe from 'p-pipe';
const actionMap = {
  merge: merge,
  pdfToWord: pdfToWord,
};

export default async function process({ files, actions }: { files: string[]; actions: string[] }) {
  try {
    //@ts-ignore
    const actionPipeline = pipe(actions.map((action) => actionMap[action]));
    await PDFNet.runWithCleanup(
      actionPipeline,
      'demo:1683842987815:7dd33b160300000000121d415dc2081c7eab9515b4cb8a5de30b5b8157'
    );
    PDFNet.shutdown();
  } catch (error) {
    console.log('🚀 -> PDFNet -> error:', JSON.stringify(error));
  }
}
