'use client';

import SideNav from '@/components/Sidenav';
import Webviewer from '@/components/Webviewer';

export default function Home() {
  return (
    <div>
      <div className="flex h-full bg-white">
        <div className="bg-gray-200 fixed w-[340px] h-[100vh]">
          <SideNav />
        </div>
        <Webviewer />
      </div>
    </div>
  );
}
