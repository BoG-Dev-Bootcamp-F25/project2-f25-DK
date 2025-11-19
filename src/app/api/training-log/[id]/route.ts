import { NextRequest } from 'next/server';
import updateTrainingLog from '../../../../../server/mongodb/actions/updateTrainingLog';
import { auth } from '@/lib/auth';
import findTrainingLogById from '../../../../../server/mongodb/actions/findTrainingLogById';

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
): Promise<Response> => {
    const session = await auth();
    console.log('Current session ', session);

    if (!session) {
        return new Response(JSON.stringify({ error: `You must be logged in to query this endpoint` }), {
            status: 401,
        });
    }
    const { id } = params;

    const log = findTrainingLogById({ id });

    if (log) {
        return new Response(JSON.stringify({ data: log || [] }), {
            status: 200,
        });
    } 

    return new Response(JSON.stringify({ error: `Cannot find training log with ID ${id}` }), {
            status: 404,
        });
};

export const PATCH = async (req: NextRequest): Promise<Response> => {
    const data = await req.json();
    const trainingLog = await updateTrainingLog(data);

    if (!trainingLog) {
        return new Response(
            JSON.stringify({ error: 'Failed to update training log' }),
            { status: 400 }
        );
    }
    return new Response(JSON.stringify({data: trainingLog}), { status: 200 });
};
