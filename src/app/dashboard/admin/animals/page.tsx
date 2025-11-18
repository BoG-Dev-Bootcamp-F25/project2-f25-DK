import Link from 'next/link';
import Image from 'next/image';

export default function AdminAnimalsPage() {
    return (
        <main className="min-h-full w-full bg-white dark:bg-black flex flex-col">
            <div className="p-8  flex flex-row justify-between items-center">
                <h1 className="text-left text-2xl font-bold text-neutral-600">
                    All Animals
                </h1>
                <Link className=" xl:mr-16" href="/dashboard/animals/new">
                    <div className="flex flex-row gap-2">
                        <Image
                            width={24}
                            height={24}
                            src="/images/createNewLogo.png"
                            alt="create new animal"
                        />{' '}
                        <span className="font-bold text-neutral-400 ">
                            Create New
                        </span>
                    </div>
                </Link>
            </div>

            <hr />
            <div className="mt-8 mx-4 grid xl:grid-cols-3 gap-1"></div>
        </main>
    );
}
