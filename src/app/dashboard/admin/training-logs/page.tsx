'use client';
import TrainingLogCard, { mockData } from '@/components/TrainingLogCard';
import { useEffect, useState } from 'react';
import { TrainingLogDocument } from '../../../../../server/mongodb/models/TrainingLog';
import Skeleton from 'react-loading-skeleton';

export default function AdminTrainingLogsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [logs, setLogs] = useState<TrainingLogDocument[]>([]);

    useEffect(() => {
        const fetchTrainingLogs = async () => {
            try {
                const response = await fetch('/api/training-log?all=true', {
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
        <main className="min-h-full w-full bg-white dark:bg-black flex flex-col">
            <div className="p-8  flex flex-row justify-between items-center">
                <h1 className="text-left text-2xl font-bold text-neutral-600">
                    All training Logs
                </h1>
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
                {!isLoading && logs.length == 0 && <p>No training logs yet!</p>}
            </div>
        </main>
    );
}
