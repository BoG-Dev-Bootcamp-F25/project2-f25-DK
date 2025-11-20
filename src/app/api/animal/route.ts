import { NextRequest } from 'next/server';
import createAnimal from '../../../../server/mongodb/actions/createAnimal';
import findAnimals from '../../../../server/mongodb/actions/findAllAnimals';
import findAnimalsByOwner from '../../../../server/mongodb/actions/findAnimalsByOwner';
import { auth } from '@/lib/auth';

export const GET = async (req: NextRequest): Promise<Response> => {
    const session = await auth();
    const isAdmin = (session?.user as any).admin;
    const userId = (session?.user as any)._id;
    const queryAll = req.nextUrl.searchParams.get('all');

    if (!isAdmin && queryAll) {
        return new Response(
            JSON.stringify({
                error: 'userId is required to retrieve all animals',
            }),
            { status: 400 }
        );
    }

    let animals;
    if (queryAll) {
        animals = await findAnimals();
    } else {
        animals = await findAnimalsByOwner({ id: userId });
    }
    return new Response(JSON.stringify({ data: animals }), { status: 200 });
};

export const POST = async (req: NextRequest): Promise<Response> => {
    const data = await req.json();

    const session = await auth();
    console.log('Current session ', session);

    if (!session) {
        return new Response(
            JSON.stringify({
                error: 'You must be logged in to make this request',
            }),
            { status: 401 }
        );
    }

    const userId = (session?.user as any)._id;
    data.owner = userId;

    const animals = await findAnimalsByOwner({ id: userId });
    const animalsMatchingName = animals?.filter((a) => a.name == data.name);
    if (animalsMatchingName && animalsMatchingName.length > 0) {
        return new Response(
            JSON.stringify({
                error: 'An animal with this name already exists',
            }),
            { status: 400 }
        );
    }

    const animal = await createAnimal(data);

    if (!animal) {
        return new Response(
            JSON.stringify({ error: 'Request payload has missing fields' }),
            { status: 400 }
        );
    }

    return new Response(JSON.stringify({ data: animal }), { status: 200 });
};
