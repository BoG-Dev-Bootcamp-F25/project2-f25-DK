"use client";
import mongoose, { ObjectId } from "mongoose";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
type LogData = {
    _id: ObjectId;
    user: ObjectId;
    animal: ObjectId;
    title: string;
    date: Date;
    description: string;
    hours: number;
};

const date = new Date();
date.setDate(20); 
date.setFullYear(2023);
date.setMonth(10);

export const mockData: LogData = {
    _id: '507f1f77bcf86cd799439011' as any,
    user: '507f1f77bcf86cd799439012' as any,
    animal: '507f1f77bcf86cd799439013' as any,
    title: 'Complete sit lessons',
    date: date,
    description: 'Lucy finishes the sit lessons very well today. Should give her a treat',
    hours: 20
}
const TrainingLogCard = ({data} : {data : LogData} ) => {

    // TODO: fetch data about user and animal

    useEffect(() => {
        const fetchUser = async () => {

        }

  
    })


    return (
        <div className="flex flex-col xl:flex-row rounded-2xl w-4/5 shadow-2xs xl:min-w-4xl">
            <div className='bg-indigo-900  sm:rounded-t-2xl md:rounded-t-none md:rounded-l-2xl text-amber-50 py-8 px-4 flex flex-col items-center'><span className='font-bold text-center text-4xl'>{data.date.getDate()}</span><span className='font-medium text-2xl'>{data.date.toLocaleString('default', { month: 'short' })}{`-`}{data.date.getFullYear()}</span></div>
            <div className="flex-1 p-4">
                <div className='flex items-center'>
                    <h3 className='text-2xl font-bold'>{data.title}</h3>
                    <p className="pl-2">- {data.hours} hours</p>
                </div>
                <div className='flex'>
                    <span className='font-bold text-gray-400'>Long Lam - Golden Retriever - Lucy</span>
                </div>
                <p className="pt-4">{data.description}</p>
            </div>
            <div className='flex items-center justify-center m-4'>
                <Link href="/dashboard/training-logs/edit/id">
                    <Image src="/images/trainingLogCardEditButton.png" width={60} height={60} alt="edit training log"/>
                </Link>
            </div>
        </div>
    );
};

export default TrainingLogCard;
