import Skeleton from 'react-loading-skeleton';
import { TrainingLogDocument } from '../../server/mongodb/models/TrainingLog';
import TrainingLogCard from './TrainingLogCard';

const TrainingLogList = ({
    isLoading,
    logs,
}: {
    isLoading: boolean;
    logs: TrainingLogDocument[];
}) => {
    console.log('Training logs ', logs);
    return (
        <div className="mt-8 mx-4 overflow-y-scroll flex-1 flex flex-col gap-4 justify-start items-center">
            {isLoading ? (
                <Skeleton count={10} />
            ) : (
                logs.map((l, i) => (
                    <TrainingLogCard
                        key={i}
                        data={{
                            ...l,
                            _id: l._id.toString(),
                            user: l.user as any,
                            animal: l.animal as any,
                            date: l.date as any,
                        }}
                    />
                ))
            )}
            {!isLoading && logs.length == 0 && (
                <p className="text-xl">No training logs yet!</p>
            )}
        </div>
    );
};

export default TrainingLogList;
