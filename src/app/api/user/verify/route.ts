import { NextRequest } from 'next/server';
import findUserByEmail from '../../../../../server/mongodb/actions/findUserByEmail';
import argon2 from 'argon2';

export const POST = async (req: NextRequest): Promise<Response> => {
    const { email, password } = await req.json();

    // lookup in database with encrypted password
    const user = await findUserByEmail({ email });

    if (!user) {
        return new Response(
            JSON.stringify({ error: 'Parameter userId is required' }),
            { status: 401 }
        );
    }

    const hashedPassword = await argon2.hash(password);

    if (user.data.password === hashedPassword) {
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
