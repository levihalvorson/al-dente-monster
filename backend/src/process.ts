import { PDFNet } from '@pdftron/pdfnet-node';
import merge from './merge';
import pdfToWord from './pdfToWord';
import toPdf from './toPdf';

const actionMap = {
  merge: merge,
  pdfToWord: pdfToWord,
  toPdf: toPdf,
};

function pipe(functions: any[]) {
  if (functions.length === 0) {
    throw new Error('Expected at least one argument');
  }

  return async (input: any) => {
    let currentValue = input;

    for (const function_ of functions) {
      currentValue = await function_(currentValue); // eslint-disable-line no-await-in-loop
    }

    return currentValue;
  };
}

export default async function process({ files, actions }: { files: string[]; actions: string[] }) {
  await PDFNet.initialize(
    'demo:1683842987815:7dd33b160300000000121d415dc2081c7eab9515b4cb8a5de30b5b8157'
  );

  try {
    //@ts-ignore
    const actionPipeline = await pipe(actions.map((action) => actionMap[action]))(files) as (
      ...params: any[]
    ) => Promise<void>;
    //set timeout of 5 seconds
    const timeout = new Promise((resolve) => {
      setTimeout(() => {
        resolve(new Error('Pipeline timed out'));
      }, 5000);
    });

    await Promise.race([PDFNet.runWithCleanup(actionPipeline), timeout]);
  } catch (error) {
    console.log('🚀 -> PDFNet -> error:', JSON.stringify(error));
  }
}
