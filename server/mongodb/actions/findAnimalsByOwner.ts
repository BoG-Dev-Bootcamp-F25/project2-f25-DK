import connectDB from '..';
import { Animal, AnimalDocument } from '../models/Animal';
import { User } from '../models/User';

const findAnimalsByOwner = async (
    {id} : {id: string}
): Promise<AnimalDocument[] | null> => {
    try {
        await connectDB();
        const user = await User.findById(id);
        if (!user) {
            throw new Error(`User could not be found with the ID ${id}`);
        }

        const animals = await Animal.find({owner: user._id}).exec();
        return animals;
    } catch (err) {
        console.error(`[ERROR]: Error encountered while creating user: ${err}`);
        return null;
    }
};

export default findAnimalsByOwner;
