'use client';
import { useParams, useRouter } from 'next/navigation';
import FormInput from './FormInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';

type Inputs = {
    name: string;
    breed: string;
    hoursTrained: number;
    profilePicture: string;
};

const EditAnimalForm = () => {
    const params = useParams();
    const { id } = params;
    const router = useRouter();
    const today = new Date();
    console.log(today.getMonth());

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            hoursTrained: 1,
            profilePicture: 'https://www.vidavetcare.com/wp-content/uploads/sites/234/2022/04/golden-retriever-dog-breed-info.jpeg',
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        // TODO: Use the authenticated user's ID to get the list of animals for the user.
        if (id) {
            // edit existing training log
        } else {
            //create new training log
            try {
                const response = await fetch('/api/animal', {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(data),
                });
                const respBody = await response.json();
                const animal = respBody.data;
                if (!animal) {
                    setError('root.serverError', {
                        message: respBody.error,
                    });
                }
                toast('Animal created successfully!');
                reset();
            } catch (err) {
                console.log
                setError('root.serverError', {
                    message: 'Failed to create a new animal',
                });
            }
        }
    };
    return (
        <div className="w-full max-w-6xl">
            {errors?.root?.serverError && (
                <p className="p-4 text-lg text-red-400">
                    {errors?.root?.serverError.message}
                </p>
            )}
            <form
                className="h-full m-2 grid grid-cols-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <ToastContainer />
                <div className="col-span-3">
                    <FormInput
                        label="Animal Name"
                        placeholder="Name"
                        type="text"
                        className="flex-1 p-4 text-2xl w-full rounded-lg "
                        {...register('name', { required: true })}
                    />
                    {errors.name && (
                        <p className="pl-4 text-red-400" role="alert">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div className="col-span-3">
                    <FormInput
                        label="Breed"
                        placeholder="Breed"
                        type="dropdown"
                        dropdownOptions={
                            new Map([
                                ['Labrador Retriever', 'Labrador Retriever'],
                                ['German Shepherd', 'German Shepherd'],
                            ])
                        }
                        className="flex-1 p-4 text-2xl w-full rounded-lg "
                        {...register('breed', { required: true })}
                    />
                    {errors.breed?.type === 'required' && (
                        <p className="pl-4 text-red-400" role="alert">
                            Password is required
                        </p>
                    )}
                </div>
                <div className="col-span-3">
                    <FormInput
                        label="Total hours trained"
                        placeholder="Total hours trained"
                        type="number"
                        className="flex-1 p-4 text-2xl w-full rounded-lg "
                        {...register('hoursTrained', {
                            required: true,
                            min: 1,
                        })}
                    />
                    {errors.hoursTrained?.type == 'required' && (
                        <p className="pl-4 text-red-400" role="alert">
                            Number of hours trained is required
                        </p>
                    )}
                    {errors.hoursTrained?.type == 'min' && (
                        <p className="pl-4 text-red-400" role="alert">
                            Number of hours trained cannot be less than zero.
                        </p>
                    )}
                </div>
                <div className="col-span-3">
                    <FormInput
                        label="Path to profile picture"
                        placeholder="Profile picture"
                        type="text"
                        className="flex-1 p-4 text-2xl w-full rounded-lg "
                        {...register('profilePicture', { required: true })}
                    />
                    {errors.profilePicture && (
                        <p className="pl-4 text-red-400" role="alert">
                            {errors.profilePicture.message}
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

export default EditAnimalForm;