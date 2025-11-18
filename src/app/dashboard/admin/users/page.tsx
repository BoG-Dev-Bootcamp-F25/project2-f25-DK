import Link from 'next/link';
import Image from 'next/image';
import UserCard from '@/components/UserCard';

export default function AdminUsersPage() {
    return (
        <main className="min-h-full w-full bg-white dark:bg-black flex flex-col">
            <div className="p-8  flex flex-row justify-between items-center">
                <h1 className="text-left text-2xl font-bold text-neutral-600">
                    All users
                </h1>
            </div>

            <hr />
            <div className="mt-8 mx-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="flex flex-row justify-center">
                    <UserCard
                        fullName="Long Lam"
                        email="llam@gatech.edu"
                        admin={true}
                    />
                </div>
                <div className="flex flex-row justify-center">
                    <UserCard
                        fullName="Long Lam"
                        email="llam@gatech.edu"
                        admin={true}
                    />
                </div>
                <div className="flex flex-row justify-center">
                    <UserCard
                        fullName="Long Lam"
                        email="llam@gatech.edu"
                        admin={true}
                    />
                </div>
            </div>
        </main>
    );
}
