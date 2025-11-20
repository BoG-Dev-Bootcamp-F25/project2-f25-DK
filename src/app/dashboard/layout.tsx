'use client';
import NavBar from '@/components/NavBar';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import SideBar from '@/components/SideBar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: session, status } = useSession({ required: true });
    console.log('Active session data ', session);

    return (
        <div className="h-full flex-1 flex flex-row border-t">
            <div className="min-w-80 h-full overflow-y-auto hidden xl:block border-r">
                <SideBar />
            </div>
            <div className="h-full flex-1 min-h-0 overflow-hidden">
                {children}
            </div>
        </div>
    );
}
