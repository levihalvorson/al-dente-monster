'use client';

import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';
import React, { useEffect, useRef } from 'react';

const Webviewer = ({
  documentUrls = ['https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf'],
}: {
  documentUrls?: string[];
}) => {
  const viewer = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<WebViewerInstance | null>(null);

  const initializeWebViewer = async () => {
    if (!viewer.current) return;
    const instance = await WebViewer(
      {
        path: '/webviewer/lib',
        licenseKey: 'demo:1710282533582:7f3fac9803000000004e3fa69682defdb4b13dab92abd526876f7191ac',
        initialDoc: documentUrls[0],
      },
      viewer.current
    );
    instanceRef.current = instance;
  };

  useEffect(() => {
    initializeWebViewer();
  }, []);

  useEffect(() => {
    if (documentUrls && documentUrls.length > 0) {
      documentUrls.forEach((url) => {
        if (!instanceRef.current) return;
        instanceRef.current.Core.documentViewer.loadDocument(url);
      });
    }
  }, [documentUrls]);

  return (
    <div className="flex-1 ml-[340px] max-h-[calc(100vh-60px)] h-full bg-white">
      <div
        className="webviewer"
        ref={viewer}
        style={{ width: '100%', height: '100vh' }}
      ></div>
    </div>
  );
};

export default Webviewer;
