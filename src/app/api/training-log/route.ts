
import { NextRequest } from "next/server";
import findAllTrainingLogs from "../../../../server/mongodb/actions/findAllTrainingLogs";
import findTrainingLogsByAnimal from "../../../../server/mongodb/actions/findTrainingLogsByAnimal";
import findAnimalsByOwner from "../../../../server/mongodb/actions/findAnimalsByOwner";
import { TrainingLogDocument } from "../../../../server/mongodb/models/TrainingLog";
import findAnimalById from "../../../../server/mongodb/actions/findAnimalById";
import createTrainingLog from "../../../../server/mongodb/actions/createTrainingLog";
import { auth } from "@/lib/auth";

export const GET = async (req: NextRequest): Promise<Response> => {

    const session = await auth();
    console.log('Current session ', session)


    const isAdmin = (session?.user as any).admin;
    const userId = (session?.user as any)._id;
    const queryAll = req.nextUrl.searchParams.get('all')

    if (!isAdmin && queryAll) {
        return new Response(
            JSON.stringify({ error: 'userId is required to retrieve all training logs' }),
            { status: 400 }
        );
    }

    
    let logs;
    if (queryAll) {
        logs = await findAllTrainingLogs();
    } else {
        const animals = await findAnimalsByOwner({id: userId});
        if (animals == null) {
            return new Response(
                JSON.stringify({ error: 'userId is required to retrieve all training logs' }),
                { status: 400 }
            );
        }
        let logs: TrainingLogDocument[] = [];
        for (const animal of animals) {
            const animalLogs = await findTrainingLogsByAnimal({id: animal._id.toString()});
            animalLogs?.forEach(a => logs.push(a))
            console.log('Training logs ', logs)
        }
    }

    return new Response(
            JSON.stringify({data: logs || []}),
            { status: 200 }
        );
}

export const POST = async (req: NextRequest): Promise<Response> => {
    const data = await req.json()
    const {animal} = data

    if (!animal) {
        return new Response(
            JSON.stringify({ error: 'Request payload is missing required field animal' }),
            { status: 400 }
        );
    }
    const animalObj = await findAnimalById(animal);
    
    if (!animalObj) {
        return new Response(
            JSON.stringify({ error: `Could not find animal with id ${animal}` }),
            { status: 400 }
        );
    } 

    const newLog = await createTrainingLog(data);
    
    return new Response(JSON.stringify({data: newLog}), {status: 200});
};

