"use client";
import mongoose, { ObjectId } from "mongoose";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";


type LogData = {
    _id: ObjectId | string;
    user: ObjectId | string;
    name: string;
    animal_name: string;
    breed: string;
    hours: number;
    url: string;
};
const AnimalCard = ({ data }: { data: LogData }) => {
    return (
        <div className="w-100 rounded-lg overflow-hidden shadow-lg">
            <img src={data.url} className="w-full h-60"></img>
            <div className="flex items-center gap-4 p-4 h-24">
                <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {data.animal_name.charAt(0)}
                </div>

                <div className="flex flex-col">
                    <div className="text-lg font-semibold truncate">
                        {data.animal_name + " - " + data.breed}
                    </div>
                    <div className="text-sm text-gray-700 truncate">
                        {data.name + " - Trained " + data.hours + " hours"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimalCard