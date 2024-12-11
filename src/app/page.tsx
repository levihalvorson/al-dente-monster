'use client';

import SideNav from '@/components/Sidenav';
import Webviewer from '@/components/Webviewer';

export default function Home() {
  return (
    <div>
      <div className="h-[60px] bg-green-500">Navbar</div>
      <div className="flex">
        <div className="bg-gray-200 fixed w-[340px] h-[calc(100vh-60px)] top-[60px]">
          <SideNav />
        </div>
        <Webviewer />
      </div>
    </div>
  );
}
