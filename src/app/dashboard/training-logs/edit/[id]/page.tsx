import EditTrainingLogForm from '@/components/EditTrainingLogForm';

export default function SignInPage() {
    return (
        <main className="h-full w-full bg-white dark:bg-black flex flex-col min-h-0">
            <div>
                <h1 className="p-8 pl-8 pb-2 text-left text-4xl text-neutral-500 ">
                    Training logs
                </h1>
                <hr />
            </div>
            <div className="min-h-0 overflow-y-auto flex-1 flex justify-center items-center">
                <EditTrainingLogForm />{' '}
            </div>
        </main>
    );
}
