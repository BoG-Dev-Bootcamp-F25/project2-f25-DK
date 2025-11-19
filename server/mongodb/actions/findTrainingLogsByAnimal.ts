import connectDB from '..';
import { Animal, AnimalDocument } from '../models/Animal';
import { TrainingLog, TrainingLogDocument } from '../models/TrainingLog';


const findTrainingLogsByAnimal = async (
    {id} : {id: string}
): Promise<TrainingLogDocument[] | null> => {
    try {
        await connectDB();
        const animal = await Animal.findById(id);
        if (!animal) {
            throw new Error(`Animal could not be found with the ID ${id}`);
        }
        const trainingLogs = await TrainingLog.find({animal: id}).exec();
        return trainingLogs;
    } catch (err) {
        console.error(`[ERROR]: Error encountered while creating user: ${err}`);
        return null;
    }
};

export default findTrainingLogsByAnimal;
