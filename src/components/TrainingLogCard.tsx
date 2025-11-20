'use client';
import mongoose, { ObjectId } from 'mongoose';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserDocument } from '../../server/mongodb/models/User';
import { AnimalDocument } from '../../server/mongodb/models/Animal';
type LogData = {
    _id: string;
    user: string;
    animal: string;
    title: string;
    date: string;
    description: string;
    hours: number;
};

const dateObj = new Date();
dateObj.setDate(20);
dateObj.setFullYear(2023);
dateObj.setMonth(10);

export const mockData: LogData = {
    _id: '507f1f77bcf86cd799439011' as any,
    user: '507f1f77bcf86cd799439012' as any,
    animal: '507f1f77bcf86cd799439013' as any,
    title: 'Complete sit lessons',
    date: dateObj.toISOString(),
    description:
        'Lucy finishes the sit lessons very well today. Should give her a treat',
    hours: 20,
};
const TrainingLogCard = ({ data }: { data: LogData }) => {
    // TODO: fetch data about user and animal

    const [user, setUser] = useState<Partial<UserDocument>>({});
    const [animal, setAnimal] = useState<Partial<AnimalDocument>>({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/user/${data.user}`);
                const respBody = await response.json();
                const user = respBody.data;
                if (user != undefined) {
                    setUser(user);
                } else {
                    setUser({ fullName: 'Long Lam' });
                }
            } catch (error) {
                setUser({ fullName: 'Long Lam' });
            }
        };

        if (!user) {
            fetchUser();
        }
    }, [user]);

    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const response = await fetch(`/api/animal/${data.animal}`);
                const respBody = await response.json();
                const animal = respBody.data;
                if (animal != undefined) {
                    setAnimal(animal);
                } else {
                    setAnimal({ name: 'Lucy', breed: 'Golden Retriever' });
                }
            } catch (error) {
                setAnimal({ name: 'Lucy', breed: 'Golden Retriever' });
            }
        };

        if (!animal) {
            fetchAnimal();
        }
    }, [animal]);

    const dateStr = data.date;
    const dateObj = new Date(dateStr);

    return (
        <div className="min-h-0 overflow-y-auto flex flex-col xl:flex-row rounded-2xl  w-4/5 shadow-2xs xl:min-w-4xl">
            <div className="bg-indigo-900  sm:rounded-t-2xl xl:rounded-t-none xl:rounded-l-2xl text-amber-50 py-8 px-4 flex flex-col items-center">
                <span className="font-bold text-center text-4xl">
                    {dateObj.getDate()}
                </span>
                <span className="font-medium text-2xl">
                    {dateObj.toLocaleString('default', { month: 'short' })}
                    {`-`}
                    {dateObj.getFullYear()}
                </span>
            </div>
            <div className="flex-1 p-4">
                <div className="flex items-center">
                    <h3 className="text-2xl font-bold">{data.title}</h3>
                    <p className="pl-2">- {data.hours} hours</p>
                </div>
                <div className="flex">
                    <span className="font-bold text-gray-400">
                        {user.fullName} - Golden Retriever - Lucy
                    </span>
                </div>
                <p className="pt-4">{data.description}</p>
            </div>
            <div className="flex items-center justify-center m-4">
                <Link href={`/dashboard/training-logs/edit/${data._id}`}>
                    <Image
                        src="/images/trainingLogCardEditButton.png"
                        width={60}
                        height={60}
                        alt="edit training log"
                    />
                </Link>
            </div>
        </div>
    );
};

export default TrainingLogCard;
