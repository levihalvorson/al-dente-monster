'use client';
import React, { useEffect, useRef } from 'react';
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';
import SideNav from '@/components/Sidenav';
import Webviewer from '@/components/Webviewer';

export default function Home() {
  const viewer = useRef<HTMLDivElement>(null);
  const [instance, setInstance] = React.useState<WebViewerInstance | null>(null);

  const initializeWebViewer = async () => {
    if (!viewer.current) return;
    const instance = await WebViewer(
      {
        path: '/webviewer/lib',
        licenseKey: 'demo:1710282533582:7f3fac9803000000004e3fa69682defdb4b13dab92abd526876f7191ac',
        // initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
      },
      viewer.current
    );
    setInstance(instance);
  };

  useEffect(() => {
    initializeWebViewer();
  }, []);

  return (
    <div>
      <div className="flex h-full bg-white overflow-y-hidden">
        <div className="bg-white fixed w-[340px] h-[100vh]">
          <SideNav instance={instance} />
        </div>
        <Webviewer viewer={viewer} />
      </div>
    </div>
  );
}
