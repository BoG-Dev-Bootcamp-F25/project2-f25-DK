import connectDB from '..';
import { User } from '../models/User';

interface UserData {
    email: string;
}

interface FindUserByEmailResponse extends UserData {
    id_: string;
    password: string;
}

const findUserByEmail = async (
    userData: UserData
): Promise<FindUserByEmailResponse | null> => {
    const { email } = userData;
    try {
        await connectDB();
        const users = await User.find({ email }).exec();
        console.log('Found user ', users);
        if (users) {
            return users[0] as any;
        }
        return null;
    } catch (err) {
        console.error(`[ERROR]: Error encountered while creating user: ${err}`);
        return null;
    }
};

export default findUserByEmail;
