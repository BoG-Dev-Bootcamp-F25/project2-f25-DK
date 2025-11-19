
import { NextRequest } from "next/server";
import createAnimal from "../../../../server/mongodb/actions/createAnimal";
import updateAnimal from "../../../../server/mongodb/actions/updateAnimal";
import { getServerSession } from "next-auth";
import findAnimals from "../../../../server/mongodb/actions/findAllAnimals";
import findAnimalsByOwner from "../../../../server/mongodb/actions/findAnimalsByOwner";


export const GET = async (req: NextRequest): Promise<Response> => {

    const session = await getServerSession();
    const isAdmin = (session?.user as any).admin;
    const userId = (session?.user as any)._id;
    const queryAll = req.nextUrl.searchParams.get('all')

    if (!isAdmin && queryAll) {
        return new Response(
            JSON.stringify({ error: 'userId is required to retrieve all animals' }),
            { status: 400 }
        );
    }

    
    let animals;
    if (queryAll) {
        animals = await findAnimals();
    } else {
        animals = await findAnimalsByOwner({id: userId});
    }
    return new Response(
            JSON.stringify({animals}),
            { status: 200 }
        );
}

export const POST = async (req: NextRequest): Promise<Response> => {
    const data = await req.json()

    const session = await getServerSession();
    const userId = (session?.user as any)._id;

    data.owner = userId;

    const animal = await createAnimal(data);

    if (!animal) {
        return new Response(
            JSON.stringify({ error: 'Request payload has missing fields' }),
            { status: 400 }
        );
    } 
    
    return new Response(JSON.stringify(animal), {status: 200});
};

export const PATCH = async (req: NextRequest): Promise<Response> => {
 
    const data = await req.json()
    const animal = await updateAnimal(data);

    if (!animal) {
        return new Response(
            JSON.stringify({ error: 'Failed to update animal' }),
            { status: 400 }
        );
    }
    return new Response(
            JSON.stringify(animal),
            { status: 200 }
        );
}