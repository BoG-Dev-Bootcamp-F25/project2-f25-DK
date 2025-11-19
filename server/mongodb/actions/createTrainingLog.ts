import connectDB from '..';
import { TrainingLog, TrainingLogDocument, TrainingLogType } from '../models/TrainingLog';
import { User } from '../models/User';


const createTrainingLog = async (data: TrainingLogType): Promise<TrainingLogDocument | null> => {

    try{
        await connectDB();
        const animal = await User.findById(data.animal._id);
        if (!animal) {
            throw new Error(`Cannot find user with ID ${data.animal._id}`)
        }
       
        const newTrainingLog = new TrainingLog(data);
        await newTrainingLog.save();
        return newTrainingLog
    } catch (err) {
        console.error(`[ERROR]: Error encountered while creating TrainingLog: ${err}`);
        return null;
    }
};

export default createTrainingLog;