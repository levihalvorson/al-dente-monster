import { PDFNet } from '@pdftron/pdfnet-node';
import path from 'path';
export default async function pdfToWord(inputFilePath: string) {
  console.log('🚀 -> pdfToWord -> inputFilePath:', inputFilePath);
  try {
    await PDFNet.addResourceSearchPath('lib/StructuredOutputMac');

    if (!(await PDFNet.StructuredOutputModule.isModuleAvailable())) {
      throw new Error('PDF to WORD Error - resource path not found');
    }
    const PDFDoc = await PDFNet.PDFDoc.createFromFilePath(inputFilePath);

    // const PDFDoc = await PDFNet.PDFDoc.createFromBuffer(s3FileBuffer.buffer);
    // const PDFDoc = await PDFNet.PDFDoc.createFromURL(
    //   'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf'
    // );

    const wordOutputOptions = new PDFNet.Convert.WordOutputOptions();
    const outputPath = path.join(__dirname, '../../public/', 'processed.doc');
    await PDFNet.Convert.toWord(PDFDoc, outputPath, wordOutputOptions);
    return outputPath;
  } catch (error) {
    console.log('🚀 -> main -> error:', error);
  }
}
