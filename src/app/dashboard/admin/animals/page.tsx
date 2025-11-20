'use client';
import Link from 'next/link';
import Image from 'next/image';
import { AnimalDocument } from '../../../../../server/mongodb/models/Animal';
import { useEffect, useState } from 'react';
import AnimalCard from '@/components/AnimalCard';

type LogData = {
  _id: string;
  user: { _id: string; fullName: string };
  name: string;
  animal_name: string;
  breed: string;
  hours: number;
  url: string;
};

const mapDbAnimalToLogData = (dbAnimal: any): LogData => ({
  _id: dbAnimal._id,
  user: {
    _id: dbAnimal.owner._id,
    fullName: dbAnimal.owner.fullName
  },
  name: dbAnimal.name,
  animal_name: dbAnimal.name,
  breed: dbAnimal.breed,
  hours: dbAnimal.hoursTrained,
  url: dbAnimal.profilePicture,
});
export default function AdminAnimalsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [animals, setAnimals] = useState<LogData[]>([]);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await fetch('/api/animal?all=true', {
                    method: 'GET',
                    credentials: 'include',
                });
                const respBody = await response.json();
                const animals: AnimalDocument[] = respBody?.data;

                if (animals != undefined) {
                    setAnimals(respBody?.data?.map(mapDbAnimalToLogData) ?? []);
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchAnimals();
    }, [isLoading]);
    return (
        <main className="min-h-screen w-full bg-white dark:bg-black flex flex-col">
            <div className="p-8  flex flex-row justify-between items-center">
                <h1 className="text-left text-2xl font-bold text-neutral-600">
                    All Animals
                </h1>
                <Link className=" xl:mr-16" href="/dashboard/animals/new">
                    <div className="flex flex-row gap-2">
                        <Image
                            width={24}
                            height={24}
                            src="/images/createNewLogo.png"
                            alt="create new animal"
                        />{' '}
                        <span className="font-bold text-neutral-400 ">
                            Create New
                        </span>
                    </div>
                </Link>
            </div>

            <hr />
            <div className="flex-1 overflow-y-auto mt-8 mx-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {animals.map((a, i) => (
                        <div className="flex items-center justify-center" key={i}>
                            <AnimalCard data={a} />
                        </div>
                    ))}
                    {!isLoading && animals.length == 0 && <p>No animals yet!</p>}
                </div>
            </div>
        </main>
    );
}
