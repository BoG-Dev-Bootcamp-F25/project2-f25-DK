import connectDB from '..';
import { Animal, AnimalDocument } from '../models/Animal';

const findAnimalById = async (
   id: string
): Promise<AnimalDocument | null> => {
    try {
        await connectDB();
        const animal = await Animal.findById(id).populate('owner', 'fullName email').exec();
        if (!animal) {
            throw new Error(`Animal with ID ${id} could not be found.`);
        }
        console.log(animal)
        return animal;
    } catch (err) {
        console.error(`[ERROR]: Error encountered while searching for animal: ${err}`);
        return null;
    }
};

export default findAnimalById;
