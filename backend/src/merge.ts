import { PDFNet } from '@pdftron/pdfnet-node';
import path from 'path';

export default async function merge(filePaths: string[]) {
  const paths = filePaths.map((filePath) => path.join(__dirname, './files', filePath));
  console.log('🚀 -> merge -> paths:', paths);
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
    const outputPath = path.join(__dirname, '../../public/', 'processed.pdf');

    await newDoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_remove_unused);
    console.log('Done merging documents');
    await PDFNet.endDeallocateStack();
    return outputPath;
  } catch (error) {
    console.log('🚀 -> merge -> error:', JSON.stringify(error));
  }
}
