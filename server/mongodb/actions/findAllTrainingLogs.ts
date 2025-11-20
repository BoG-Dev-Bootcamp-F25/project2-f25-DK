import connectDB from '..';
import { TrainingLog, TrainingLogDocument } from '../models/TrainingLog';

const findAllTrainingLogs = async (): Promise<TrainingLogDocument[]> => {
    try {
        await connectDB();
        const logs = (await TrainingLog.find({}).exec()).sort((a, b) =>
            a.date < b.date ? -1 : b.date > a.date ? 1 : 0
        );
        console.log('Sorted training logs ', logs);
        return logs;
    } catch (err) {
        console.error(`[ERROR]: Error encountered while creating user: ${err}`);
        return [];
    }
};

export default findAllTrainingLogs;
