'use client';
import TrainingLogCard, { mockData } from '@/components/TrainingLogCard';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { TrainingLogDocument } from '../../../../server/mongodb/models/TrainingLog';
import Skeleton from 'react-loading-skeleton';

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

    console.log('Training logs ', logs);
    return (
        <main className="min-h-full w-full bg-white dark:bg-black flex flex-col">
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

            <div className="mt-8 mx-4 overflow-y-scroll flex-1 flex flex-col gap-4 justify-start items-center">
                {isLoading ? (
                    <Skeleton count={10} />
                ) : (
                    logs.map((l, i) => (
                        <TrainingLogCard
                            key={i}
                            data={{
                                ...l,
                                _id: l._id.toString(),
                                user: l.user as any,
                                animal: l.animal as any,
                                date: l.date as any,
                            }}
                        />
                    ))
                )}
                {!isLoading && logs.length == 0 && (
                    <p className="text-xl">No training logs yet!</p>
                )}
            </div>
        </main>
    );
}
