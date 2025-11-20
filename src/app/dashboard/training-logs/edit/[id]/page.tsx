import EditTrainingLogForm from '@/components/EditTrainingLogForm';

export default function SignInPage() {
    return (
        <main className="h-full w-full bg-white dark:bg-black flex flex-col min-h-0">
            <h1 className="pl-4 pt-8 text-left text-2xl font-bold text-neutral-600">
                Training logs
            </h1>
            <hr />
            <div className="min-h-0 overflow-y-auto flex-1 flex justify-center items-center">
                <EditTrainingLogForm />{' '}
            </div>
        </main>
    );
}
