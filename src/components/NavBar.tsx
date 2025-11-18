import Image from "next/image";
import Link from "next/link";

const NavBar = () => {

    
    return <div className='h-full shadow-2xs flex flex-row items-center justify-start'><Link href="/" className="ml-8 flex flex-row gap-2 items-center"><Image src="/images/appLogo.png" width={84} height={50} alt="app logo"/><p className='text-2xl font-bold text-neutral-950 font-stretch-50%'>Progress</p></Link></div>
}
 
export default NavBar;