'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { TrainingLogDocument } from '../../../../server/mongodb/models/TrainingLog';
import TrainingLogList from '@/components/TrainingLogList';

export default function TrainingLogsPage() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [logs, setLogs] = useState<TrainingLogDocument[]>([]);

    console.log('Current session ', session);
    useEffect(() => {
        const fetchTrainingLogs = async () => {
            try {
                const response = await fetch('/api/training-log', {
                    method: 'GET',
                    credentials: 'include',
                });
                const respBody = await response.json();
                const logs: TrainingLogDocument[] = respBody?.data;

                if (logs != undefined) {
                    setLogs(logs);
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchTrainingLogs();
    }, [isLoading]);

    return (
        <main className="h-full overflow-hidden w-full bg-white dark:bg-black flex flex-col">
            <div className="p-8  flex flex-row justify-between items-center">
                <h1 className="text-left text-2xl font-bold text-neutral-600">
                    Training logs
                </h1>
                <Link className=" xl:mr-16" href="/dashboard/training-logs/new">
                    <div className="flex flex-row gap-2">
                        <Image
                            width={24}
                            height={24}
                            src="/images/createNewLogo.png"
                            alt="create new training log"
                        />{' '}
                        <span className="font-bold text-neutral-400 ">
                            Create New
                        </span>
                    </div>
                </Link>
            </div>

            <hr />

            <TrainingLogList isLoading={isLoading} logs={logs} />
        </main>
    );
}
