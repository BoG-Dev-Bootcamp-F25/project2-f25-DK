import connectDB from '..';
import { Animal, AnimalDocument } from '../models/Animal';

const findAnimalById = async (
   id: string
): Promise<AnimalDocument | null> => {
    try {
        await connectDB();
        const animal = await Animal.findById(id).exec();
        if (!animal) {
            throw new Error('User could not be found with the given email');
        }
        return animal;
    } catch (err) {
        console.error(`[ERROR]: Error encountered while creating user: ${err}`);
        return null;
    }
};

export default findAnimalById;
