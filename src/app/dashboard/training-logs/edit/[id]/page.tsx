import EditTrainingLogForm from '@/components/EditTrainingLogForm';

export default function SignInPage() {
    return (
            <main className="min-h-full w-full bg-white dark:bg-black">
                <h1 className="pl-8 pb-2 text-left text-4xl text-gray-900 ">
                    Training logs
                </h1>
                <hr />
                <div className="mt-4 flex flex-col justify-center items-center">
                    <EditTrainingLogForm />{' '}
                </div>
            </main>
    );
}
