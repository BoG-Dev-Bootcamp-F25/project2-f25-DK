'use client';
import { AnimalDocument } from '../../server/mongodb/models/Animal';

const AnimalCard = ({ data }: { data: AnimalDocument }) => {
    return (
        <div className="w-100 rounded-lg overflow-hidden shadow-lg">
            <img src={data.profilePicture} className="w-full h-60"></img>
            <div className="flex items-center gap-4 p-4 h-24">
                <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {data.name.charAt(0)}
                </div>

                <div className="flex flex-col">
                    <div className="text-lg font-semibold truncate">
                        {data.name + ' - ' + data.breed}
                    </div>
                    <div className="text-sm text-gray-700 truncate">
                        {data.user.fullName +
                            ' - Trained ' +
                            data.hours +
                            ' hours'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimalCard;
