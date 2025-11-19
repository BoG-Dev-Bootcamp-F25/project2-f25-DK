import connectDB from '..';
import { User, UserDocument } from '../models/User';

const findUserByEmail = async (
    {email} : {email: string}
): Promise<UserDocument | null> => {
    try {
        await connectDB();
        const user = (await User.find({ email }).exec()).at(0);
        if (!user) {
            throw new Error('User could not be found with the given email');
        }
        return user;
    } catch (err) {
        console.error(`[ERROR]: Error encountered while creating user: ${err}`);
        return null;
    }
};

export default findUserByEmail;
