import { InferSchemaType } from 'mongoose';
import connectDB from '..';
import { User } from '../models/User';
import findUserByEmail from './findUserByEmail';
import argon2 from 'argon2';

interface UserData {
    email: string;
    fullName: string;
    password: string;
    admin: boolean;
}

interface CreateUserResponse{
    data: UserData & {id_: string}
}

const createUser = async (userData: UserData): Promise<CreateUserResponse | null> => {
    const {email} = userData;
    try{
        await connectDB();
        const existingUser = await findUserByEmail({email});

        // user with email already exists
        if (existingUser) {
            return null;
        }

        userData.password = await argon2.hash(userData.password);
        console.log(userData);
        const newUser = new User(userData);
        await newUser.save();
        //@ts-ignore
        const responseData: CreateUserResponse = {data: {fullName: newUser.fullName, email: newUser.email, admin: newUser.admin, id_: newUser.id}};
        return responseData
    } catch (err) {
        console.error(`[ERROR]: Error encountered while creating user: ${err}`);
        return null;
    }
};

export default createUser;
