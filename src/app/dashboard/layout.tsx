"use client";
import NavBar from "@/components/NavBar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {status} = useSession({required: true});

  return (
    <div className="flex flex-col h-screen bg-zinc-50 font-sans dark:bg-black">
        <div className='min-h-24'>
          <NavBar />
        </div>
        <div className='flex-1 flex flex-row overflow-hidden'>
            <div className='min-w-80 h-full overflow-y-auto hidden xl:block bg-zinc-50'>
              <button onClick={() => {signOut()}}>Sign Out</button>
            </div>
            <div className="h-full flex-1 min-h-0 overflow-hidden">
              {children}
            </div>
        </div>
    </div>
  );
}