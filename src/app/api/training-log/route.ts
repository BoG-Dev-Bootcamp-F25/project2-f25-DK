
import { NextRequest } from "next/server";
import createAnimal from "../../../../server/mongodb/actions/createAnimal";
import updateAnimal from "../../../../server/mongodb/actions/updateAnimal";
import { getServerSession } from "next-auth";
import findAllTrainingLogs from "../../../../server/mongodb/actions/findAllTrainingLogs";
import findTrainingLogsByAnimal from "../../../../server/mongodb/actions/findTrainingLogsByAnimal";
import findAnimalsByOwner from "../../../../server/mongodb/actions/findAnimalsByOwner";
import { TrainingLogDocument } from "../../../../server/mongodb/models/TrainingLog";
import findAnimalById from "../../../../server/mongodb/actions/findAnimalById";
import createTrainingLog from "../../../../server/mongodb/actions/createTrainingLog";
import updateTrainingLog from "../../../../server/mongodb/actions/updateTrainingLog";


export const GET = async (req: NextRequest): Promise<Response> => {

    const session = await getServerSession();
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
        if (!animals) {
            return new Response(
                JSON.stringify({ error: 'userId is required to retrieve all training logs' }),
                { status: 400 }
            );
        }
        let logs: TrainingLogDocument[] = [];
        for (const animal of animals) {
            const animalLogs = await findTrainingLogsByAnimal({id: animal._id.toString()});
            animalLogs?.forEach(a => logs.push(a))
        }
    }

    return new Response(
            JSON.stringify({logs}),
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
    
    return new Response(JSON.stringify(newLog), {status: 200});
};

export const PATCH = async (req: NextRequest): Promise<Response> => {
 
    const data = await req.json()
    const trainingLog = await updateTrainingLog(data);

    if (!trainingLog) {
        return new Response(
            JSON.stringify({ error: 'Failed to update training log' }),
            { status: 400 }
        );
    }
    return new Response(
            JSON.stringify(trainingLog),
            { status: 200 }
        );
}