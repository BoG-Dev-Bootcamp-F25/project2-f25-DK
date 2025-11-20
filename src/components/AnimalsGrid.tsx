import { AnimalDocument } from '../../server/mongodb/models/Animal';
import AnimalCard from './AnimalCard';

const AnimalsGrid = ({
    isLoading,
    animals,
}: {
    isLoading: boolean;
    animals: AnimalDocument[];
}) => {
    return (
        <>
            {!isLoading && animals.length == 0 && (
                <div className="flex flex-row justify-center ">
                    <p className="p-4 text-center text-xl">No animals yet!</p>
                </div>
            )}
            <div className="flex-1 overflow-auto mt-8 mx-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1">
                {animals.map((a, i) => {
                    return (
                        <div
                            className="flex items-center justify-center"
                            key={i}
                        >
                            <AnimalCard data={a} />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default AnimalsGrid;
