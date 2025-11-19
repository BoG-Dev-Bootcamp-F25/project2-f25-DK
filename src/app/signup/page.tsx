import SignUpForm from '@/components/SignUpForm';
import Image from 'next/image';
export default function SignUpPage() {
    return (
        <main className="flex h-screen min-h-0 overflow-hidden w-full flex-col justify-center items-center py-32 px-16 bg-white dark:bg-black">
            <SignUpForm />
            <Image src="/images/quarterCircle.png" className='absolute bottom-0 left-0' width={360} height={360} alt="style element"/>
        </main>
    );
}
