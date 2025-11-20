import { auth } from '@/lib/auth';
import { NextRequest } from 'next/server';
import findUserById from '../../../../../server/mongodb/actions/findUserById';

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
): Promise<Response> => {
    const session = await auth();

    if (!session) {
        return new Response(
            JSON.stringify({
                error: `You must be logged in to query this endpoint`,
            }),
            {
                status: 401,
            }
        );
    }
    const { id } = params;

    const user = findUserById(id);

    if (user) {
        return new Response(JSON.stringify({ data: user || undefined }), {
            status: 200,
        });
    }

    return new Response(
        JSON.stringify({ error: `Cannot find user with ID ${id}` }),
        {
            status: 404,
        }
    );
};
