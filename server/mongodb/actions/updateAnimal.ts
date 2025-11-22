import connectDB from '..';
import { Animal, AnimalDocument } from '../models/Animal';

const updateAnimal = async (
    data: Partial<AnimalDocument>
): Promise<AnimalDocument | null> => {
    const { _id } = data;
    try {
        await connectDB();
        let animal = await Animal.findByIdAndUpdate(_id, data, {
            new: true,
        }).exec();
        if (!animal) {
            throw new Error(`Cannot find animal with ID ${_id}`);
        }
        return animal;
    } catch (err) {
        console.error(
            `[ERROR]: Error encountered while creating Animal: ${err}`
        );
        return null;
    }
};

export default updateAnimal;
