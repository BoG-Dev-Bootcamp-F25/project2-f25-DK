import connectDB from '..';
import { TrainingLog, TrainingLogDocument, TrainingLogType } from '../models/TrainingLog';

const updateTrainingLog = async (data: Partial<TrainingLogType> & {_id: string}): Promise<TrainingLogDocument | null> => {

    const {_id} = data;
    try{
        await connectDB();
        let log = await TrainingLog.findByIdAndUpdate(_id, data, {new: true}).exec();
        if (!log) {
            throw new Error(`Cannot find log with ID ${_id}`)
        }
        return log;
    } catch (err) {
        console.error(`[ERROR]: Error encountered while creating Log: ${err}`);
        return null;
    }
};

export default updateTrainingLog;
