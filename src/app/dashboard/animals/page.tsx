"use client"
import LoginForm from '@/components/LoginForm';
import TrainingLogCard, { mockData } from '@/components/TrainingLogCard';
import Link from 'next/link';
import Image from 'next/image';
import AnimalCard from '@/components/AnimalCard';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

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
export default function AnimalsPage() {
    const { data: session, status } = useSession();
    const [animals, setAnimals] = useState<LogData[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchTrainingLogs = async () => {
        try {
          const res = await fetch('/api/animal', { method: 'GET', credentials: 'include' });
          if (!res.ok) throw new Error("Failed to fetch logs");
          const data = await res.json();
          console.log("test")
          console.log(data)
          setAnimals(data?.data?.map(mapDbAnimalToLogData) ?? []);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      if (session) {
        fetchTrainingLogs();
      }
    }, [session]);

    return (
            <main className="min-h-full w-full bg-white dark:bg-black flex flex-col">
              <div className='p-8  flex flex-row justify-between items-center'>
                <h1 className="text-left text-2xl font-bold text-neutral-600">
                    Animals
                </h1>
                <Link className=' xl:mr-16' href="/dashboard/animals/new">
                  <div className='flex flex-row gap-2'><Image width={24} height={24} src="/images/createNewLogo.png" alt="create new animal" /> <span className='font-bold text-neutral-400 '>Create New</span></div>
                </Link>
              </div>
                
                <hr />
                <div className="mt-8 mx-4 grid xl:grid-cols-3 gap-1">
                  {loading && <div>Loading...</div>}
                  {!loading && animals.length === 0 && <div>No animals found</div>}
                  {!loading &&
                    animals.map((animal) => <AnimalCard key={animal._id} data={animal} />)}
                </div>
            </main>
    );
}
