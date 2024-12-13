import { PDFNet } from '@pdftron/pdfnet-node';
import path from 'path';
export default async function toPdf(inputFile: string | string[]) {
  try {
    console.log('🚀 -> convert to pdf -> inputFilePath:', inputFile);
    //take the first file in the array if it is an array
    const inputFilePath = Array.isArray(inputFile) ? inputFile[0] : inputFile;
    const pdfDoc = await PDFNet.PDFDoc.create();
    await pdfDoc.initSecurityHandler();
    await PDFNet.Convert.toPdf(pdfDoc, inputFilePath);
    const outputPath = path.join(__dirname, '../../public/', 'processed.pdf');
    await pdfDoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
    return outputPath;
  } catch (error) {
    console.log('🚀 -> main -> error:', error);
  }
}
