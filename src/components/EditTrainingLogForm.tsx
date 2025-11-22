'use client';
import { useParams, useRouter } from 'next/navigation';
import { toast, ToastContainer, ToastContentProps } from 'react-toastify';
import FormInput from './FormInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimalDocument } from '../../server/mongodb/models/Animal';

type Inputs = {
    title: string;
    animal: string;
    hours: number;
    month: number;
    date: number;
    year: number;
    image: string;
    description: string;
};

const EditTrainingLogForm = () => {
    const params = useParams();
    const { id } = params;
    const today = new Date();
    const router = useRouter();

    const [editingLog, setEditingLog] = useState<Partial<Inputs> | null>(null);
    const [animals, setAnimals] = useState<Map<string, number> | null>(null);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await fetch(`/api/animal`);
                const animals = (await response.json()).data;
                setAnimals(
                    new Map(animals.map((a: AnimalDocument) => [a.name, a._id]))
                );
            } catch (error) {
                console.error(error);
            }
        };
        if (animals == null) {
            fetchAnimals();
        }
    }, [animals]);

    const fetchTrainingLog = async () => {
        try {
            const response = await fetch(`/api/training-log/${id}`);
            const respBody = await response.json();
            return respBody.data;
        } catch (error) {
            return {};
        }
    };

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: async () => {
            try {
                if (id) {
                    const defaults = await fetchTrainingLog();

                    const dateStr = defaults.date;
                    const dateObj = new Date(dateStr);

                    return {
                        ...defaults,
                        month: dateObj.getMonth() + 1,
                        date: dateObj.getDate(),
                        year: dateObj.getFullYear(),
                    };
                }
                return {
                    hours: 1,
                    month: today.getMonth() + 1,
                    date: today.getDate(),
                    year: today.getFullYear(),
                    title: '',
                    animal: '',
                    description: '',
                };
            } catch (error) {
                console.error('Error fetching default user data:', error);
                // Return an empty object or some default fallback values
                return {
                    hours: 1,
                    month: today.getMonth() + 1,
                    date: today.getDate(),
                    year: today.getFullYear(),
                    title: '',
                    animal: '',
                    description: '',
                };
            }
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        // TODO: check if date represents a valid Date
        // TODO: Use the authenticated user's ID to get the list of animals for the user.

        if (id) {
            // edit existing training log
            try {
                const response = await fetch(`/api/training-log/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ ...data, _id: id }),
                });
                const respBody = await response.json();

                if (response.ok) {
                    toast('Training log updated successfully.');
                    router.push('/dashboard/training-logs');
                } else {
                    setError('root.serverError', {
                        message: respBody.error,
                    });
                }
            } catch (error) {
                setError('root.serverError', {
                    message: 'Failed to edit the current training log entry',
                });
            }
        } else {
            //create new training log

            try {
                const response = await fetch('/api/training-log', {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(data),
                });

                const respBody = await response.json();

                if (response.ok) {
                    toast('Training log created successfully.');
                    router.push('/dashboard/training-logs');
                } else {
                    setError('root.serverError', {
                        message: respBody.error,
                    });
                }
            } catch (err) {
                setError('root.serverError', {
                    message: 'Failed to add a new training log entry',
                });
            }
        }
    };

    return (
        <div className="h-full w-4/5">
            <ToastContainer />
            <form
                className="m-2 grid grid-cols-3"
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
                    {errors.title?.type === 'required' && (
                        <p className="pl-4 text-red-400" role="alert">
                            Title is required
                        </p>
                    )}
                </div>
                <div className="col-span-3">
                    <FormInput
                        label="Select Animal"
                        placeholder="Select Animal"
                        type="dropdown"
                        dropdownOptions={
                            animals == null ? new Map([]) : animals
                        }
                        className="flex-1 p-4 text-2xl w-full rounded-lg "
                        {...register('animal', { required: true })}
                    />
                    {errors.animal?.type === 'required' && (
                        <p className="pl-4 text-red-400" role="alert">
                            Animal is required
                        </p>
                    )}
                </div>
                <div className="col-span-3">
                    <FormInput
                        label="Total hours trained"
                        placeholder="Total hours trained"
                        type="number"
                        className="flex-1 p-4 text-2xl w-full rounded-lg "
                        {...register('hours', {
                            required: true,
                            min: 1,
                        })}
                    />
                    {errors.hours?.type === 'required' && (
                        <p className="pl-4 text-red-400" role="alert">
                            Hours trained is required
                        </p>
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
                    {errors.month?.type === 'required' && (
                        <p className="pl-4 text-red-400" role="alert">
                            Month is required
                        </p>
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
                    {errors.date?.type === 'required' && (
                        <p className="pl-4 text-red-400" role="alert">
                            Date is required
                        </p>
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
                    {errors.year?.type === 'required' && (
                        <p className="pl-4 text-red-400" role="alert">
                            Year is required
                        </p>
                    )}
                </div>

                <div className="col-span-3">
                    <FormInput
                        label="Description"
                        placeholder="Description"
                        type="textarea"
                        className="flex-1 p-4 text-2xl w-full rounded-lg "
                        {...register('description', { required: true })}
                    />
                    {errors.description?.type === 'required' && (
                        <p className="pl-4 text-red-400" role="alert">
                            Please enter a description to describe training
                        </p>
                    )}
                </div>
                <div className="mt-2 flex gap-6 col-span-3">
                    <Link
                        className="px-4 text-center max-w-[256px] w-full py-2 text-2xl text-white bg-red-600 rounded-xl"
                        href="/dashboard/training-logs"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="px-4 max-w-[256px] w-full py-2 text-2xl text-white bg-red-600 rounded-xl"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTrainingLogForm;
