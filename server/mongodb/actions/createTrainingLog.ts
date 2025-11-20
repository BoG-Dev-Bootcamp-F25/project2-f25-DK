import connectDB from '..';
import { Animal } from '../models/Animal';
import {
    TrainingLog,
    TrainingLogDocument,
    TrainingLogType,
} from '../models/TrainingLog';

const createTrainingLog = async (
    data: TrainingLogType
): Promise<TrainingLogDocument | null> => {
    try {
        await connectDB();
        const animal = await Animal.findById(data.animal);
        if (!animal) {
            throw new Error(`Cannot find animal with ID ${data.animal}`);
        }

        const newTrainingLog = new TrainingLog(data);
        await newTrainingLog.save();
        return newTrainingLog;
    } catch (err) {
        console.error(
            `[ERROR]: Error encountered while creating training log : ${err}`
        );
        return null;
    }
};

export default createTrainingLog;
