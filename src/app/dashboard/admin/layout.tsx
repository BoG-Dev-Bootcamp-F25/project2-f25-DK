'use client';
import NavBar from '@/components/NavBar';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: session } = useSession();
    const isAdmin = session?.user && (session?.user as any).admin;

    return isAdmin ? (
        <div className="h-screen flex flex-col">{children}</div>
    ) : (
        <div className="h-full flex flex-row justify-center items-center">
            <p className="rounded-2xl bg-red-300 p-4">
                You are not authorized to view this page
            </p>
        </div>
    );
}
