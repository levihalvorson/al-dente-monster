'use client';

import React from 'react';

const Webviewer = ({
  viewer,
}: {
  viewer: React.RefObject<HTMLDivElement>;
}) => {

  return (
    <div className="flex-1 ml-[340px] max-h-[100vh] h-full bg-white">
      <div
        className="webviewer"
        ref={viewer}
        style={{ width: '100%', height: '100vh' }}
      ></div>
    </div>
  );
};

export default Webviewer;
