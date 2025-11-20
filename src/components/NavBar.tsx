'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
    const { data: session } = useSession();
    return (
        <div className="h-full border-0 shadow-md flex flex-row items-center justify-start">
            <Link
                href={session ? '/dashboard' : '/'}
                className="ml-8 flex flex-row gap-2 items-center"
            >
                <Image
                    src="/images/appLogo.png"
                    width={84}
                    height={50}
                    alt="app logo"
                />
                <p className="text-2xl font-bold text-neutral-950 font-stretch-50%">
                    Progress
                </p>
            </Link>
        </div>
    );
};

export default NavBar;
