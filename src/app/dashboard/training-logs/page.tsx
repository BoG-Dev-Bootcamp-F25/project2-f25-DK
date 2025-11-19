"use client";

import LoginForm from '@/components/LoginForm';
import TrainingLogCard, { mockData } from '@/components/TrainingLogCard';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function TrainingLogsPage() {

    const {data: session, status } = useSession();
    const [logs, setLogs] = useState([]);

    console.log('Current session ', session)
    useEffect(() => {
      const fetchTrainingLogs = async () => {
        await fetch('/api/training-log', {method: 'GET', credentials: 'include'}).then((response) => {
          console.log(response);
        })
      }
      if (session) {
        fetchTrainingLogs();
      }
    }, [logs, session])

    return (
            <main className="min-h-full w-full bg-white dark:bg-black flex flex-col">
              <div className='p-8  flex flex-row justify-between items-center'>
                <h1 className="text-left text-2xl font-bold text-neutral-600">
                    Training logs
                </h1>
                <Link className=' xl:mr-16' href="/dashboard/training-logs/new">
                  <div className='flex flex-row gap-2'><Image width={24} height={24} src="/images/createNewLogo.png" alt="create new training log" /> <span className='font-bold text-neutral-400 '>Create New</span></div>
                </Link>
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
