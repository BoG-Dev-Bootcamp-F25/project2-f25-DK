import FormInput from './FormInput';

const EditTrainingLogForm = () => {
    return (
        <div className=" w-full max-w-7xl grid grid-cols-3">
            <div className="col-span-3">
                <FormInput
                    label="Title"
                    placeholder="Title"
                    type="text"
                    className="flex-1 p-4 text-2xl w-full rounded-lg "
                />
            </div>
            <div className="col-span-3">
                <FormInput
                    label="Select Animal"
                    placeholder="Select Animal"
                    type="text"
                    className="flex-1 p-4 text-2xl w-full rounded-lg "
                />
            </div>
            <div className="col-span-3">
                <FormInput
                    label="Total hours trained"
                    placeholder="Title"
                    type="text"
                    className="flex-1 p-4 text-2xl w-full rounded-lg "
                />
            </div>
            <FormInput
                label="Month"
                placeholder="Month"
                type="dropdown"
                dropdownOptions={['January', 'February', 'October']}
                className="flex-1 p-2 text-2xl w-full rounded-lg "
            />
            <FormInput
                label="Date"
                placeholder="Date"
                type="number"
                className="flex-1 p-4 text-2xl w-full rounded-lg "
            />

            <FormInput
                label="Year"
                placeholder="Year"
                type="number"
                className="flex-1 p-4 text-2xl w-full rounded-lg "
            />

            <div className="col-span-3">
                <FormInput
                    label="Note"
                    placeholder="Title"
                    type="textarea"
                    className="flex-1 p-4 text-2xl w-full rounded-lg "
                />
            </div>
        </div>
    );
};

export default EditTrainingLogForm;
