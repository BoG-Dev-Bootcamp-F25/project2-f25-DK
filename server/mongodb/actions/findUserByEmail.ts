import { InferSchemaType } from 'mongoose';
import connectDB from '..';
import { User } from '../models/User';

interface UserData {
    email: string;
    password: string;
}

interface CreateUserResponse{
    data: UserData & {id_: string}
}

const findUserByEmail = async (userData: UserData): Promise<CreateUserResponse | null> => {
    try{
        const newUser = new User(userData);
        await connectDB();
        await newUser.save();
        //@ts-ignore
        const responseData: CreateUserResponse = {data: {name: newUser.name, age: newUser.age, id_: newUser.id}};
        return responseData
    } catch (err) {
        console.error(`[ERROR]: Error encountered while creating user: ${err}`);
        return null;
    }
};

export default findUserByEmail;
