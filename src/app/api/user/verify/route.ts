import { NextRequest } from 'next/server';
import findUserByEmail from '../../../../../server/mongodb/actions/findUserByEmail';
import argon2 from 'argon2';

export const POST = async (req: NextRequest): Promise<Response> => {
    const { email, password } = await req.json();
    console.log('Request email ', email)

    // lookup in database with encrypted password
    const user = await findUserByEmail({ email });
    
    if (!user) {
        return new Response(
            JSON.stringify({ error: 'Could not find user with provided email' }),
            { status: 401 }
        );
    }

    const isMatch = await argon2.verify(user.password, password)
    if (isMatch) {
        return new Response(JSON.stringify({ ...user, password: undefined }), {
            status: 200,
        });
    } else {
        return new Response(
            JSON.stringify({ error: 'Incorrect username/password' }),
            { status: 401 }
        );
    }
};
