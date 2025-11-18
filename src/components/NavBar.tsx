import Image from "next/image";

const NavBar = () => {
    return <div className='h-full flex flex-row items-center justify-start'><div className="ml-2 flex flex-row gap-2 items-center"><Image src="/images/appLogo.png" width={84} height={50} alt="app logo"/><p className='text-2xl font-bold text-neutral-950 font-stretch-50%'>Progress</p></div></div>
}
 
export default NavBar;