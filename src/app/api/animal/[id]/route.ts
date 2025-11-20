import { auth } from '@/lib/auth';
import { NextRequest } from 'next/server';
import updateAnimal from '../../../../../server/mongodb/actions/updateAnimal';
import findAnimalById from '../../../../../server/mongodb/actions/findAnimalById';

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

    const animal = await findAnimalById(id);

    if (animal) {
        return new Response(JSON.stringify({ data: animal || undefined }), {
            status: 200,
        });
    }

    return new Response(
        JSON.stringify({ error: `Cannot find animal with ID ${id}` }),
        {
            status: 404,
        }
    );
};

export const PATCH = async (
    req: NextRequest,
    { params }: { params: { id: string } }
): Promise<Response> => {
    const session = await auth();

    if (!session) {
        return new Response(
            JSON.stringify({
                error: 'You must be logged in to make this request',
            }),
            { status: 401 }
        );
    }

    const { id } = await params; 
    const data = await req.json();
    const animal = await updateAnimal({ ...data, _id: id });

    if (!animal) {
        return new Response(
            JSON.stringify({ error: 'Failed to update animal' }),
            { status: 400 }
        );
    }
    return new Response(JSON.stringify({ data: animal }), { status: 200 });
};
