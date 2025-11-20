'use client';

import UserCard from '@/components/UserCard';
import { useEffect, useState } from 'react';
import { UserDocument } from '../../../../../server/mongodb/models/User';
import Skeleton from 'react-loading-skeleton';

export default function AdminUsersPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<UserDocument[]>([]);

    useEffect(() => {
        const fetchTrainingLogs = async () => {
            try {
                const response = await fetch('/api/user?all=true', {
                    method: 'GET',
                    credentials: 'include',
                });
                const respBody = await response.json();
                const users: UserDocument[] = respBody?.data;

                if (users != undefined) {
                    setUsers(users);
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchTrainingLogs();
    }, [isLoading]);

    return (
        <main className="h-full min-h-0 overflow-hidden w-full dark:bg-black flex flex-col">
            <div className="p-8  flex flex-row justify-between items-center">
                <h1 className="text-left text-2xl font-bold text-neutral-600">
                    All Users
                </h1>
            </div>

            <hr />
            <div className="flex-1 overflow-auto mt-8 mx-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {isLoading ? (
                    <Skeleton count={10} />
                ) : (
                    users.map((u, i) => (
                        <div className="flex flex-row justify-center" key={i}>
                            <UserCard
                                fullName={u.fullName}
                                email={u.email}
                                admin={u.admin || false}
                            />
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}
