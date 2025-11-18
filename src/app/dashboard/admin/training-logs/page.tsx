import LoginForm from '@/components/LoginForm';
import TrainingLogCard, { mockData } from '@/components/TrainingLogCard';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminTrainingLogsPage() {
    return (
            <main className="min-h-full w-full bg-white dark:bg-black flex flex-col">
              <div className='p-8  flex flex-row justify-between items-center'>
                <h1 className="text-left text-2xl font-bold text-neutral-600">
                    All training logs
                </h1>
              </div>
                
                <hr />
                <div className="mt-8 mx-4 overflow-y-scroll flex-1 flex flex-col gap-4 justify-start items-center">
                    <TrainingLogCard data={mockData} />
                    <TrainingLogCard data={mockData} />
                    <TrainingLogCard data={mockData} />
                </div>
            </main>
    );
}
