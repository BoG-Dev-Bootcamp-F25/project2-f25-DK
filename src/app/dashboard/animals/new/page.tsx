import EditAnimalForm from '@/components/EditAnimalForm';

export default function SignInPage() {
    return (
        <main className="h-full min-h-0 overflow-hidden w-full flex flex-col ">
            <h1 className="pl-4 pt-8 text-left text-2xl font-bold">
                New Animal
            </h1>
            <hr />
            <div className="flex-1 overflow-auto flex flex-col justify-center items-center">
                <EditAnimalForm />{' '}
            </div>
        </main>
    );
}
