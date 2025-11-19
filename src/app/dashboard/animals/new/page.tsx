import EditAnimalForm from "@/components/EditAnimalForm";

export default function SignInPage() {
    return (
            <main className="min-h-full w-full bg-white dark:bg-black">
                <h1 className="mt-8 pl-8 pb-2 text-left text-4xl text-neutral-500 ">
                    New Animal
                </h1>
                <hr />
                <div className="my-4 flex flex-col justify-center items-center">
                    <EditAnimalForm />{' '}
                </div>
            </main>
    );
}
