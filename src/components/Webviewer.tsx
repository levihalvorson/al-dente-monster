import WebViewer from '@pdftron/webviewer';

const viewerElement = document.getElementById('viewer');
if (viewerElement) {
  WebViewer.WebComponent(
    {
      path: '/public/webviewer',
      licenseKey: 'demo:1710282533582:7f3fac9803000000004e3fa69682defdb4b13dab92abd526876f7191ac',
    },
    viewerElement
  ).then((instance) => {
    const { Core } = instance;
    const { documentViewer } = Core;
    // call methods from UI, Core, documentViewer and annotationManager as needed

    documentViewer.addEventListener('documentLoaded', () => {
      // call methods relating to the loaded document
    });

    instance.UI.loadDocument('https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf');
  });
}
