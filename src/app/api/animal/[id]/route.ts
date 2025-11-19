import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";
import updateAnimal from "../../../../../server/mongodb/actions/updateAnimal";

export const PATCH = async (req: NextRequest, {params} : {params: {id: string}}): Promise<Response> => {
 
    const session = await auth();

    if (!session) {
       return new Response(
            JSON.stringify({ error: 'You must be logged in to make this request' }),
            { status: 401 }
        ); 
    }

    const id = params;
    const data = await req.json()
    const animal = await updateAnimal({...data, _id: id});

    if (!animal) {
        return new Response(
            JSON.stringify({ error: 'Failed to update animal' }),
            { status: 400 }
        );
    }
    return new Response(
            JSON.stringify({data: animal}),
            { status: 200 }
        );
}