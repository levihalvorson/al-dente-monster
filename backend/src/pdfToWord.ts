import { PDFNet } from '@pdftron/pdfnet-node';
import path from 'path';
export default async function pdfToWord(inputFile: string | string[]) {
  console.log('🚀 -> pdfToWord -> inputFilePath:', inputFile);
  try {
    const inputFilePath = Array.isArray(inputFile) ? inputFile[0] : inputFile;

    await PDFNet.addResourceSearchPath('lib/StructuredOutputMac');

    if (!(await PDFNet.StructuredOutputModule.isModuleAvailable())) {
      throw new Error('PDF to WORD Error - resource path not found');
    }
    const PDFDoc = await PDFNet.PDFDoc.createFromFilePath(inputFilePath);

    const wordOutputOptions = new PDFNet.Convert.WordOutputOptions();
    const outputPath = path.join(__dirname, '../../public/', 'processed.doc');
    await PDFNet.Convert.toWord(PDFDoc, outputPath, wordOutputOptions);
    return outputPath;
  } catch (error) {
    console.log('🚀 -> main -> error:', error);
  }
}
