import EditTrainingLogForm from '@/components/EditTrainingLogForm';

export default function SignInPage() {
    return (
            <main className="min-h-full  w-full bg-white dark:bg-black">
                <h1 className="mt-8 pl-8 pb-2  text-left text-2xl font-bold text-neutral-600">
                    New Training Log
                </h1>
                <hr />
                <div className="my-4 flex flex-col justify-center items-center">
                    <EditTrainingLogForm />{' '}
                </div>
            </main>
    );
}
