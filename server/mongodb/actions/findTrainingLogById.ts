import connectDB from '..';
import { Animal } from '../models/Animal';
import { TrainingLog, TrainingLogDocument } from '../models/TrainingLog';


const findTrainingLogById = async (
    {id} : {id: string}
): Promise<TrainingLogDocument | null> => {
    try {
        await connectDB();
        const log = await TrainingLog.findById(id);
        if (!log) {
            throw new Error(`Training log could not be found with the ID ${id}`);
        }
        return log;
    } catch (err) {
        console.error(`[ERROR]: Error encountered while finding training log: ${err}`);
        return null;
    }
};

export default findTrainingLogById;
