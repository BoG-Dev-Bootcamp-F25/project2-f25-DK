import connectDB from '..';
import { User, UserDocument } from '../models/User';

const findAllUsers = async (): Promise<UserDocument[]> => {
    try {
        await connectDB();
        const users = await User.find({}).exec();
        return users;
    } catch (err) {
        console.error(`[ERROR]: Error while searching for users: ${err}`);
        return [];
    }
};

export default findAllUsers;
