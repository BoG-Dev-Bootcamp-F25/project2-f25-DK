import LoginForm from '@/components/LoginForm';
import TrainingLogCard, { mockData } from '@/components/TrainingLogCard';
import Link from 'next/link';
import Image from 'next/image';

export default function SignInPage() {
    return (
            <main className="min-h-full w-full bg-white dark:bg-black">
              <div className='p-8 flex flex-row justify-between items-center'>
                <h1 className="text-left text-4xl font-bold text-gray-400 ">
                    Training logs
                </h1>
                <Link className='mr-16' href="/dashboard/training-logs/new">
                  <div className='flex flex-row gap-2'><Image width={24} height={24} src="/images/createNewLogo.png" alt="create new training log" /> <span className='font-bold text-neutral-400'>Create New</span></div>
                </Link>
              </div>
                
                <hr />
                <div className="mt-8 mx-4 flex flex-col gap-4 justify-start items-center">
                    <TrainingLogCard data={mockData} />
                    <TrainingLogCard data={mockData} />
                    <TrainingLogCard data={mockData} />
                </div>
            </main>
    );
}
