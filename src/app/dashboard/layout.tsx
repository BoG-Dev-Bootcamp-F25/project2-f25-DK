"use client";
import { useSession } from "next-auth/react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {status} = useSession({required: true});

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
        <div className='h-36 border-2'></div>
        <div className='flex-1 flex flex-row'>
            <div className='w-80 border-2'></div>
            {children}

        </div>
    </div>
  );
}