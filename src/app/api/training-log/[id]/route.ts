import { NextRequest } from 'next/server';
import updateTrainingLog from '../../../../../server/mongodb/actions/updateTrainingLog';
import { auth } from '@/lib/auth';
import findTrainingLogById from '../../../../../server/mongodb/actions/findTrainingLogById';

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
): Promise<Response> => {
    const session = await auth();
    const { id } = await params;

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

    const log = await findTrainingLogById({ id });

    if (log) {
        return new Response(JSON.stringify({ data: log || undefined }), {
            status: 200,
        });
    }

    return new Response(
        JSON.stringify({ error: `Cannot find training log with ID ${id}` }),
        {
            status: 404,
        }
    );
};

export const PATCH = async (req: NextRequest): Promise<Response> => {
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
    const data = await req.json();
    const { date, month, year } = data;

    if (!session) {
        return new Response(
            JSON.stringify({
                error: 'You must be logged in to make this request',
            }),
            { status: 401 }
        );
    }

    const userId = (session?.user as any)._id;
    const dateObj = new Date(year, month - 1, date); // the month is 0-indexed
    data.date = dateObj;
    data.user = userId;

    const trainingLog = await updateTrainingLog(data);

    if (!trainingLog) {
        return new Response(
            JSON.stringify({ error: 'Failed to update training log' }),
            { status: 400 }
        );
    }
    return new Response(JSON.stringify({ data: trainingLog }), { status: 200 });
};
