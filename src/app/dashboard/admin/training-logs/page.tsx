'use client';
import { useEffect, useState } from 'react';
import { TrainingLogDocument } from '../../../../../server/mongodb/models/TrainingLog';
import TrainingLogList from '@/components/TrainingLogList';

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
        <main className="h-full w-full  dark:bg-black flex flex-col">
            <div className="p-8  flex flex-row justify-between items-center">
                <h1 className="text-left text-2xl font-bold text-neutral-600">
                    All training Logs
                </h1>
            </div>

            <hr />
            <TrainingLogList isLoading={isLoading} logs={logs} />
        </main>
    );
}
