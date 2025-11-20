import { chromium, expect, request, type FullConfig } from '@playwright/test';
import connectDB from '../server/mongodb';
import { User } from '../server/mongodb/models/User';
import { TrainingLog } from '../server/mongodb/models/TrainingLog';
import { Animal } from '../server/mongodb/models/Animal';

async function globalSetup(config: FullConfig) {
    // clear the database and seed with users
    console.log('MONGO_DB ', process.env.MONGO_DB);
    try {
        await connectDB();
        await User.collection.drop();
        await TrainingLog.collection.drop();
        await Animal.collection.drop();
    } catch (error) {
        console.error('Unable to reset the database');
    }
    console.log('URL ', `${config.webServer?.url}/api/user/register`);
    const requestCtx = await request.newContext();
    const response = await requestCtx.post(
        `${config.webServer?.url}/api/user/register`,
        {
            data: {
                fullName: 'Bob Johnson',
                email: 'alice3@gatech.edu',
                password: '12345678',
                confirmPassword: '12345678',
                admin: true,
            },
        }
    );

    console.log('Response ', response);
}

export default globalSetup;
