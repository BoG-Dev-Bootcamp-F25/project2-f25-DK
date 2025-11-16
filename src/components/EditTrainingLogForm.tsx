"use client";
import { useParams, useRouter } from 'next/navigation';
import FormInput from './FormInput';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    title: string;

}

const EditTrainingLogForm = () => {
    const params = useParams();
    const {id} = params;
    console.log('Current id is ', id)
    const router = useRouter();
        const { register, handleSubmit, formState: { errors }} = useForm<Inputs>()
    
        const onSubmit: SubmitHandler<Inputs> = (data) => {
    
           router.push('/dashboard')
    
        }
    // TODO: Use the currently logged in user ID to get the list of animals for the user.

    return (
        <div className="w-full max-w-6xl">
            <form className="h-full  grid grid-cols-3">
            <div className="col-span-3">
                <FormInput
                    label="Title"
                    placeholder="Title"
                    type="text"
                    className="flex-1 p-4 text-2xl w-full rounded-lg "
                />
            </div>
            <div className="col-span-3">
                <FormInput
                    label="Select Animal"
                    placeholder="Select Animal"
                    type="dropdown"
                    dropdownOptions={[
                        'Lucy - Golden Retriever',
                        'Lucy - Golden Retriever',
                        'Lucy - Golden Retriever',
                    ]}
                    className="flex-1 p-4 text-2xl w-full rounded-lg "
                />
            </div>
            <div className="col-span-3">
                <FormInput
                    label="Total hours trained"
                    placeholder="Total hours trained"
                    type="number"
                    className="flex-1 p-4 text-2xl w-full rounded-lg "
                />
            </div>
            <div>
                <FormInput
                    label="Month"
                    placeholder="Month"
                    type="dropdown"
                    dropdownOptions={[
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                    ]}
                    className="flex-1 p-4 mt-4 text-2xl w-full rounded-lg"
                />
            </div>
            <div>
                <FormInput
                    label="Date"
                    placeholder="Date"
                    type="number"
                    className="flex-1 p-4 text-2xl w-full rounded-lg "
                />
            </div>

            <div>
                <FormInput
                    label="Year"
                    placeholder="Year"
                    type="number"
                    className="flex-1 p-4 text-2xl w-full rounded-lg "
                />
            </div>

            <div className="col-span-3">
                <FormInput
                    label="Note"
                    placeholder="Title"
                    type="textarea"
                    className="flex-1 p-4 text-2xl w-full rounded-lg "
                />
            </div>
            <div className='mt-2 flex gap-6 col-span-3'>
                {/* <button className='ml-4 max-w-[256px] w-full px-4 py-2 text-2xl border-4 rounded-xl text-red-500 border-red-500'>Cancel</button> */}
                {/* <button className='px-4 max-w-[256px] w-full py-2 text-2xl text-white bg-red-600 rounded-xl'>Save</button> */}
            </div>
            </form>
        </div>
    );
};

export default EditTrainingLogForm;
