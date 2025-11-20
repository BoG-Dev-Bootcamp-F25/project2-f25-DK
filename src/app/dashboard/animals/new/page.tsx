import EditAnimalForm from '@/components/EditAnimalForm';

export default function SignInPage() {
    return (
        <main className="min-h-full w-full bg-white dark:bg-black">
            <h1 className="pl-4 pt-8 text-left text-2xl font-bold text-neutral-600">
                New Animal
            </h1>
            <hr />
            <div className="my-4 flex flex-col justify-center items-center">
                <EditAnimalForm />{' '}
            </div>
        </main>
    );
}
