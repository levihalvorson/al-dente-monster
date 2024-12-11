import { PDFNet } from '@pdftron/pdfnet-node';
import path from 'path';

export default async function merge(filePaths: string[]) {
  const paths = filePaths.map((filePath) => path.join(__dirname, filePath));

  const main = async () => {
    try {
      console.log('Merge several PDF documents into one...');
      await PDFNet.startDeallocateStack();
      const newDoc = await PDFNet.PDFDoc.create();
      newDoc.initSecurityHandler();

      let totalPageCount = 0;
      for (let i = 0; i < paths.length; i++) {
        console.log('Opening ' + paths[i]);
        const currDoc = await PDFNet.PDFDoc.createFromFilePath(paths[i]);
        const currDocPageCount = await currDoc.getPageCount();
        newDoc.insertPages(
          totalPageCount + 1,
          currDoc,
          1,
          currDocPageCount,
          PDFNet.PDFDoc.InsertFlag.e_none
        );
        totalPageCount += currDocPageCount;
      }
      await newDoc.save('./merged.pdf', PDFNet.SDFDoc.SaveOptions.e_remove_unused);
      console.log('Done merging documents');
      await PDFNet.endDeallocateStack();
    } catch (err) {
      console.log(err);
    }
  };
  try {
    await PDFNet.runWithCleanup(
      main,
      'demo:1683842987815:7dd33b160300000000121d415dc2081c7eab9515b4cb8a5de30b5b8157'
    );
    PDFNet.shutdown();
  } catch (error) {
    console.log('🚀 -> merge -> error:', JSON.stringify(error));
  }
}
