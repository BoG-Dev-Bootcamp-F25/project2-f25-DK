import connectDB from '..';
import { Animal, AnimalDocument } from '../models/Animal';
import { User } from '../models/User';

const findAllAnimals = async (): Promise<AnimalDocument[] | null> => {
    try {
        await connectDB();
        const animals = await Animal.find({})
            .populate('owner', 'fullName email')
            .exec();
        
        console.log('First animal owner:', animals[0]?.owner);
        return animals;
    } catch (err) {
        console.error(`[ERROR]: Error encountered while creating user: ${err}`);
        return null;
    }
};

export default findAllAnimals;
