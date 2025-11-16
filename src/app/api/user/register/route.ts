import { NextRequest } from 'next/server';
import findUserByEmail from '../../../../../server/mongodb/actions/findUserByEmail';
import argon2 from 'argon2';
import createUser from '../../../../../server/mongodb/actions/createUser';

export const POST = async (req: NextRequest): Promise<Response> => {
    const { email, fullName, admin, password, confirmPassword } = await req.json();

    if (password != confirmPassword) {
        return new Response(JSON.stringify({ error: 'Passwords do not match!'}), {
            status: 400,
        });
    }


    // lookup in database with encrypted password
    const user = await findUserByEmail({ email });

    if (user) {
        return new Response(
            JSON.stringify({ error: 'This email address has been taken' }),
            { status: 400 }
        );
    }

    const newUser = await createUser({email, fullName, password, admin});

    if (!newUser) {
        return new Response(
            JSON.stringify({ error: 'Failed to create new user' }),
            { status: 500 }
        );
    }

    return new Response(JSON.stringify(newUser), {status: 200});
};
