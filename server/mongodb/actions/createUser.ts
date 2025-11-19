import { InferSchemaType } from 'mongoose';
import connectDB from '..';
import { User, UserDocument, UserType } from '../models/User';
import findUserByEmail from './findUserByEmail';
import argon2 from 'argon2';


const createUser = async (data: UserType): Promise<UserDocument | null> => {
    const {email} = data;
    try{
        await connectDB();
        const existingUser = await findUserByEmail({email});

        // user with email already exists
        if (existingUser) {
            return null;
        }

        data.password = await argon2.hash(data.password);
        console.log(data);
        const newUser = new User(data);
        await newUser.save();
        return newUser
    } catch (err) {
        console.error(`[ERROR]: Error encountered while creating user: ${err}`);
        return null;
    }
};

export default createUser;
