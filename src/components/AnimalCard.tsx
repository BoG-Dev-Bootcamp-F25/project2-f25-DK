"use client";
import mongoose, { ObjectId } from "mongoose";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
type LogData = {
    _id: ObjectId;
    user: ObjectId;
    name: ObjectId;
    animal_name: string;
    breed: string;
    date: Date;
    notes: string;
    hours: number;
    url: string;
};

const date = new Date();
date.setDate(20); 
date.setFullYear(2023);
date.setMonth(10);

export const mockData: LogData = {
    _id: '507f1f77bcf86cd799439011' as any,
    user: '507f1f77bcf86cd799439012' as any,
    name: '507f1f77bcf86cd799439013' as any,
    animal_name: "Lucy",
    breed: 'Golden Retriever',
    date: date,
    notes: 'Lucy is a 3 year old Female Golden Retriever. She is a good girl',
    hours: 20,
    url: "https://www.vidavetcare.com/wp-content/uploads/sites/234/2022/04/golden-retriever-dog-breed-info.jpeg"
}
const AnimalCard = ({ data = mockData }: { data?: LogData }) => {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
            <img src={mockData.url} className="w-full h-60"></img>
            <div className="flex items-center gap-4 p-4">
                <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {data.animal_name.charAt(0)}
                </div>

                <div className="flex flex-col">
                    <div className="text-lg font-semibold truncate">
                        {data.animal_name + " - " + data.breed}
                    </div>
                    <div className="text-sm text-gray-700 truncate">
                        {data.name + " - " + data.hours + " hours"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimalCard