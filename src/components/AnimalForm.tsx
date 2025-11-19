import { useParams, useRouter } from 'next/navigation';
import FormInput from './FormInput';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    AnimalName: string;
    Breed: string;
    TotalHours: number;
    Month: string;
    Date: string;
    Year: number;
    Note: string;
};
const AnimalForm = () => {
    const params = useParams();
    const { id } = params;
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        // TODO: Use the authenticated user's ID to get the list of animals for the user.
        if (id) {
            // edit existing animal
        } else {
            //create new animal

            try {
                const response = await fetch('/api/animal', {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify(data),
                });
            } catch (err) {
                setError('root.serverError', {
                    message: 'Failed to add a new animal',
                });
            }
        }
    };

    return (
        <div>
            <FormInput
                label="Animal Name"
                placeholder="Name"
                type="text"
                className="flex-1 p-4 text-2xl w-full rounded-lg "
            />
            <FormInput
                label="Breed"
                placeholder="Breed"
                type="text"
                className="flex-1 p-4 text-2xl w-full rounded-lg "
            />
            <FormInput
                label="Total Hours Trained"
                placeholder="100"
                type="text"
                className="flex-1 p-4 text-2xl w-full rounded-lg "
            />
            <div className="flex gap-4">
                <div>
                    <FormInput
                        label="Birth Month"
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
                        className="flex-1 p-4 mt-4 text-xl w-auto rounded-lg"
                    />
                </div>
                <div>
                    <FormInput
                        label="Date"
                        placeholder="Date"
                        type="number"
                        className="flex-1 p-4 text-2xl w-2/3 rounded-lg "
                    />
                </div>

                <div>
                    <FormInput
                        label="Year"
                        placeholder="Year"
                        type="text"
                        className="flex-1 p-4 text-2xl w-full rounded-lg"
                    />
                </div>
            </div>
            <div>
                <FormInput
                    label="Notes"
                    placeholder="Notes"
                    type="textarea"
                    className="flex-1 p-4 text-2xl w-full min-h-16 rounded-lg"
                />
            </div>
            <div className="mt-2 flex gap-6 col-span-3">
                {/* <button className='ml-4 max-w-[256px] w-full px-4 py-2 text-2xl border-4 rounded-xl text-red-500 border-red-500'>Cancel</button> */}
                {/* <button className='px-4 max-w-[256px] w-full py-2 text-2xl text-white bg-red-600 rounded-xl'>Save</button> */}
            </div>
        </div>
    );
};
export default AnimalForm;
