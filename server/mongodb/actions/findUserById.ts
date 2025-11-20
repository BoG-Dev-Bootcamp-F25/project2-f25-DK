import connectDB from '..';
import { User, UserDocument } from '../models/User';

const findUserById = async (id: string): Promise<UserDocument | null> => {
    try {
        await connectDB();
        const user = await User.findById(id).exec();
        if (!user) {
            throw new Error(`User could not be found with the ID ${id}`);
        }
        return user;
    } catch (err) {
        console.error(`[ERROR]: Error encountered while creating user: ${err}`);
        return null;
    }
};

export default findUserById;
