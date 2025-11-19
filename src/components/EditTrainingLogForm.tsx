'use client';
import { useParams, useRouter } from 'next/navigation';
import FormInput from './FormInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Inputs = {
    title: string;
    animal: string;
    totHoursTrained: number;
    month: number;
    date: number;
    year: number;
    note: string;
};

const EditTrainingLogForm = () => {
    const params = useParams();
    const { id } = params;
    const router = useRouter();
    const today = new Date();

    const [animals, setAnimals] = useState([]);
    
    useEffect(() => {

    }, [animals])
    console.log(today.getMonth());

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            totHoursTrained: 1,
            month: today.getMonth() + 1,
            date: today.getDate(),
            year: today.getFullYear(),
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        // TODO: Use the authenticated user's ID to get the list of animals for the user.
        if (id) { // edit existing training log

            
        } else { //create new training log

            try {
                const response = await fetch('/api/training-log', {method: 'POST', credentials: 'include', body: JSON.stringify(data)})

            } catch (err) {
                setError('root.serverError', {message: 'Failed to add a new training log entry'});
            }
            

        }
    };

    return (
        <div className="h-full w-4/5">
            <form
                className="overflow-y-auto m-2 grid grid-cols-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="col-span-3">
                    <FormInput
                        label="Title"
                        placeholder="Title"
                        type="text"
                        className="flex-1 p-4 text-2xl w-full rounded-lg "
                        {...register('title', { required: true })}
                    />
                    {errors.title?.type === "required" && (
                        <p className='pl-4 text-red-400' role="alert">Title is required</p>
                    )}
                </div>
                <div className="col-span-3">
                    <FormInput
                        label="Select Animal"
                        placeholder="Select Animal"
                        type="dropdown"
                        dropdownOptions={
                            new Map([
                                ['Lucy - Golden Retriever', '2133'],
                            ])
                        }
                        className="flex-1 p-4 text-2xl w-full rounded-lg "
                        {...register('animal', { required: true })}
                    />
                    {errors.animal?.type === "required" && (
                        <p className='pl-4 text-red-400' role="alert">Animal is required</p>
                    )}
                </div>
                <div className="col-span-3">
                    <FormInput
                        label="Total hours trained"
                        placeholder="Total hours trained"
                        type="number"
                        className="flex-1 p-4 text-2xl w-full rounded-lg "
                        {...register('totHoursTrained', {
                            required: true,
                            min: 1,
                        })}
                    />
                    {errors.totHoursTrained?.type === "required" && (
                        <p className='pl-4 text-red-400' role="alert">Total hours trained is required</p>
                    )}
                </div>
                <div>
                    <FormInput
                        label="Month"
                        placeholder="Month"
                        type="dropdown"
                        dropdownOptions={
                            new Map([
                                ['January', 1],
                                ['February', 2],
                                ['March', 3],
                                ['April', 4],
                                ['May', 5],
                                ['June', 6],
                                ['July', 7],
                                ['August', 8],
                                ['September', 9],
                                ['October', 10],
                                ['November', 11],
                                ['December', 12],
                            ])
                        }
                        className="flex-1 p-4 mt-4 text-2xl w-full rounded-lg"
                        {...register('month', { required: true })}
                    />
                    {errors.month?.type === "required" && (
                        <p className='pl-4 text-red-400' role="alert">Month is required</p>
                    )}
                </div>
                <div>
                    <FormInput
                        label="Date"
                        placeholder="Date"
                        type="number"
                        className="flex-1 p-4 text-2xl w-full rounded-lg "
                        {...register('date', {
                            required: true,
                            min: 1,
                            max: 31,
                        })}
                    />
                    {errors.date?.type === "required" && (
                        <p className='pl-4 text-red-400' role="alert">Date is required</p>
                    )}
                </div>

                <div>
                    <FormInput
                        label="Year"
                        placeholder="Year"
                        type="number"
                        className="flex-1 p-4 text-2xl w-full rounded-lg "
                        {...register('year', { required: true })}
                    />
                    {errors.year?.type === "required" && (
                        <p className='pl-4 text-red-400' role="alert">Year is required</p>
                    )}
                </div>

                <div className="col-span-3">
                    <FormInput
                        label="Note"
                        placeholder="Title"
                        type="textarea"
                        className="flex-1 p-4 text-2xl w-full rounded-lg "
                        {...register('note', { required: true })}
                    />
                    {errors.note?.type === "required" && (
                        <p className='pl-4 text-red-400' role="alert">Password is required</p>
                    )}
                </div>
                <div className="mt-2 flex gap-6 col-span-3">
                    <Link className="px-4 text-center max-w-[256px] w-full py-2 text-2xl text-white bg-red-600 rounded-xl" href="/dashboard/training-logs">Cancel</Link>
                    <button type="submit" className="px-4 max-w-[256px] w-full py-2 text-2xl text-white bg-red-600 rounded-xl">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTrainingLogForm;
