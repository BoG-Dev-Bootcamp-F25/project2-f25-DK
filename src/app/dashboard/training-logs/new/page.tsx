import EditTrainingLogForm from '@/components/EditTrainingLogForm';

export default function SignInPage() {
    return (
        <main className="min-h-full  w-full  dark:bg-black">
            <h1 className="pl-4 pt-8 text-left text-2xl font-bold text-neutral-600">
                New Training Log
            </h1>
            <hr />
            <div className="my-4 flex flex-col justify-center items-center">
                <EditTrainingLogForm />{' '}
            </div>
        </main>
    );
}
