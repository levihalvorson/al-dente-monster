'use client';

import WebViewer from '@pdftron/webviewer';
import React, { useEffect, useRef } from 'react';

const Webviewer = () => {
  const viewer = useRef(null);

  useEffect(() => {
    if (!viewer.current) return;
    WebViewer(
      {
        path: '/webviewer/lib',
        licenseKey: 'demo:1710282533582:7f3fac9803000000004e3fa69682defdb4b13dab92abd526876f7191ac', // sign up to get a key at https://dev.apryse.com
        initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
      },
      viewer.current
    ).then((instance) => {
      console.log('🚀 ~ ).then ~ instance:', instance);
      // const { docViewer } = instance;
    });
  }, []);

  return (
    <div className="flex-1 ml-[340px] max-h-[calc(100vh-60px)] h-full">
      <div
        className="webviewer"
        ref={viewer}
        style={{ height: '94vh' }}
      ></div>
    </div>
  );
};

export default Webviewer;
