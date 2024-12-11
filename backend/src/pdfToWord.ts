
import { PDFNet } from '@pdftron/pdfnet-node';

export default async function pdfToWord() {
  const main = async () => {
    try {
      await PDFNet.addResourceSearchPath('lib/StructuredOutputMac');
  
      if (!(await PDFNet.StructuredOutputModule.isModuleAvailable())) {
        throw new Error('PDF to WORD Error - resource path not found');
      }
      // const PDFDoc = await PDFNet.PDFDoc.createFromBuffer(s3FileBuffer.buffer);
      const PDFDoc = await PDFNet.PDFDoc.createFromURL('https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf');
      const wordOutputOptions = new PDFNet.Convert.WordOutputOptions();
      await PDFNet.Convert.toWord(PDFDoc, 'newfile.doc', wordOutputOptions);
      
    } catch (error) {
      console.log("🚀 -> main -> error:", error)
    }
  };

  try {
    await PDFNet.runWithCleanup(main, 'demo:1683842987815:7dd33b160300000000121d415dc2081c7eab9515b4cb8a5de30b5b8157');
    PDFNet.shutdown();
  } catch (error) {
    console.log("🚀 -> pdfToWord -> error:", JSON.stringify(error))
  }
}

