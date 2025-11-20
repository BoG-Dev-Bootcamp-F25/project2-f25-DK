import connectDB from '..';
import { User, UserDocument } from '../models/User';

const findUserByEmail = async ({
    email,
}: {
    email: string;
}): Promise<UserDocument | null> => {
    try {
        await connectDB();
        const user = (await User.find({ email }).exec()).at(0);
        if (!user) {
            return null;
        }
        return user;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export default findUserByEmail;
