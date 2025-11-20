'use client';
import { useEffect, useState } from 'react';
import { AnimalDocument } from '../../server/mongodb/models/Animal';
import { UserDocument } from '../../server/mongodb/models/User';

const AnimalCard = ({ data }: { data: AnimalDocument }) => {
    const [user, setUser] = useState<Partial<UserDocument> | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/user/${data.owner}`);
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
                        {user &&
                            user.fullName +
                                ' - Trained ' +
                                data.hoursTrained +
                                ' hours'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimalCard;
