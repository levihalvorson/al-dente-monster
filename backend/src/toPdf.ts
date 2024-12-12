import { PDFNet } from '@pdftron/pdfnet-node';
import path from 'path';
export default async function toPdf(inputFilePath: string) {
  try {
    const pdfDoc = await PDFNet.PDFDoc.create();
    await pdfDoc.initSecurityHandler();
    await PDFNet.Convert.toPdf(pdfDoc, inputFilePath);
    const outputPath = path.join(__dirname, '../../public/', 'converted.pdf');
    await pdfDoc.save(outputPath, PDFNet.SDFDoc.SaveOptions.e_linearized);
    return outputPath;
  } catch (error) {
    console.log('🚀 -> main -> error:', error);
  }
}
