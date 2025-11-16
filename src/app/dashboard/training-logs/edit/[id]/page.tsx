import EditTrainingLogForm from '@/components/EditTrainingLogForm';

export default function SignInPage() {
    return (
        <main className="min-h-full w-full bg-white dark:bg-black">
            <h1 className="m-8 text-left text-4xl font-bold text-gray-400 ">
                Training logs
            </h1>
            <hr className='border-gray-500'/>

            <div className="mt-4 flex flex-col justify-center items-center">
                <EditTrainingLogForm />{' '}
            </div>
        </main>
    );
}
