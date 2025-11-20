import { auth } from '@/lib/auth';
import { NextRequest } from 'next/server';
import findAllUsers from '../../../../server/mongodb/actions/findAllUsers';

export const GET = async (req: NextRequest): Promise<Response> => {
    const session = await auth();
    const isAdmin = (session?.user as any).admin;

    if (!isAdmin) {
        return new Response(
            JSON.stringify({
                error: 'user is not authorized to query all users',
            }),
            { status: 403 }
        );
    }

    const users = await findAllUsers();
    return new Response(JSON.stringify({ data: users }), {
        status: 200,
    });
};
