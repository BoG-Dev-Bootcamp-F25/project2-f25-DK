import EditTrainingLogForm from '@/components/EditTrainingLogForm';

export default function SignInPage() {
    return (
        <main className="h-full min-h-0 overflow-hidden w-full bg-white dark:bg-black flex flex-col">
            <h1 className="pl-4 pt-8 text-left text-2xl font-bold text-neutral-600">
                Training logs
            </h1>
            <hr />
            <div className="flex-1 overflow-auto flex justify-center items-center">
                <EditTrainingLogForm />{' '}
            </div>
        </main>
    );
}
