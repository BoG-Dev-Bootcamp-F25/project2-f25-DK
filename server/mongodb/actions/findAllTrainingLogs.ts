import connectDB from '..';
import { TrainingLog, TrainingLogDocument } from '../models/TrainingLog';


const findAllTrainingLogs = async (): Promise<TrainingLogDocument[] | null> => {
    try {
        await connectDB();
        const logs = await TrainingLog.find({}).exec();
        return logs;
    } catch (err) {
        console.error(`[ERROR]: Error encountered while creating user: ${err}`);
        return null;
    }
};

export default findAllTrainingLogs;
