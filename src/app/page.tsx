"use client";
import AnimalCard from "@/components/AnimalCard";
import AnimalForm from "@/components/AnimalForm";
import SideBar from "@/components/SideBar";
import SignUpForm from "@/components/SignUpForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <main className="flex h-screen min-h-0 overflow-hidden w-full  flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-256 text-8xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Animal training made
          </h1>
          <p><span className='text-8xl text-red-600'>easy</span></p>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod accusantium, corporis illo aliquam quis perspiciatis assumenda quidem dicta expedita repellendus, in provident quisquam animi, blanditiis cum nisi cumque possimus placeat.
           
          </p>
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-8 gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/signin"
            className="w-48 text-center p-4 rounded-xl border-2 bg-red-700 text-white text-4xl font-bold cursor-pointer"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="w-48 text-center p-4 rounded-xl border-2 bg-red-700 text-white text-4xl font-bold cursor-pointer"
          >
            Sign Up
          </Link>
        </div>

        <div className="w-full flex flex-col justify-center gap-4 text-base font-medium sm:flex-row">
          <p className='text-center'>BOG Developer Bootcamp. All rights reserved</p>
        </div>
        <Image src="/images/quarterCircle.png" className='absolute bottom-0 left-0' width={360} height={360} alt="style element"/>
      </main>
  );
}
