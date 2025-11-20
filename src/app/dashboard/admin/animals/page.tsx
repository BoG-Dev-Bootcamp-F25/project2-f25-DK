'use client';
import Link from 'next/link';
import Image from 'next/image';
import { AnimalDocument } from '../../../../../server/mongodb/models/Animal';
import { useEffect, useState } from 'react';

import AnimalsGrid from '@/components/AnimalsGrid';

export default function AdminAnimalsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [animals, setAnimals] = useState<AnimalDocument[]>([]);

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
        <main className="h-full w-full  dark:bg-black flex flex-col">
            <div className="p-8  flex flex-row justify-between items-center">
                <h1 className="text-left text-2xl font-bold text-neutral-600">
                    All Animals
                </h1>
            </div>

            <hr />
            <AnimalsGrid isLoading={isLoading} animals={animals} />
        </main>
    );
}
