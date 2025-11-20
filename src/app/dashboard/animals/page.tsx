'use client';
import Link from 'next/link';
import Image from 'next/image';
import AnimalCard from '@/components/AnimalCard';
import { useEffect, useState } from 'react';
import { AnimalDocument } from '../../../../server/mongodb/models/Animal';
import AnimalsGrid from '@/components/AnimalsGrid';
import { ToastContainer } from 'react-toastify';

export default function AnimalsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [animals, setAnimals] = useState<AnimalDocument[]>([]);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await fetch('/api/animal', {
                    method: 'GET',
                    credentials: 'include',
                });
                const respBody = await response.json();
                const animals: AnimalDocument[] = respBody?.data;

                if (animals != undefined) {
                    setAnimals(animals);
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchAnimals();
    }, [isLoading]);

    return (
        <main className="min-h-full w-full dark:bg-black flex flex-col">
            <div className="p-8  flex flex-row justify-between items-center">
                <h1 className="text-left text-2xl font-bold text-neutral-600">
                    Animals
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
            <AnimalsGrid isLoading={isLoading} animals={animals} />
        </main>
    );
}
