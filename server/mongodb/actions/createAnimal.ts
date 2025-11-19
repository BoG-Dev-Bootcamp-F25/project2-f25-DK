import connectDB from '..';
import { Animal, AnimalDocument, AnimalType } from '../models/Animal';
import { User } from '../models/User';


const createAnimal = async (data: AnimalType): Promise<AnimalDocument | null> => {

    try{
        await connectDB();
        const owner = await User.findById(data.owner);
        if (!owner) {
            throw new Error(`Cannot find user with ID ${data.owner}`)
        }
       
        const newAnimal = new Animal(data);
        await newAnimal.save();
        return newAnimal
    } catch (err) {
        console.error(`[ERROR]: Error encountered while creating Animal: ${err}`);
        return null;
    }
};

export default createAnimal;
