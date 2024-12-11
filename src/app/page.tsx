import SideNav from "@/components/Sidenav";

export default function Home() {
  return (
    <div>
      <div className='h-[60px] bg-green-500'>Navbar</div>
      <div className="flex">
        <div className='bg-red-500 fixed w-[320px] h-[calc(100vh-60px)] top-[60px]'>
          <SideNav />
        </div>
        <div className='bg-blue-500 flex-1 ml-[320px] min-h-[calc(100vh-60px)]'>
          Content
        </div>
      </div>
    </div>
  );
}
