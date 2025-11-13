type FormInputProps = {
    label: string;
    type: 'text' | 'email' | 'password' | 'checkbox';
    placeholder?: string;
};

const FormInput = ({ label, type, placeholder }: FormInputProps) => {
    const labelId = `form-${label.replaceAll(' ', '-')}`;
    return (
        <div className="m-4 flex flex-col items-start">
            {type != 'checkbox' ? (
                <>
                    <label htmlFor={labelId} className="pb-4 font-medium">
                        {label}
                    </label>
                    <input
                        id={labelId}
                        type={type}
                        className="flex-1 w-full border-b-4 border-red-500"
                        placeholder={placeholder}
                    ></input>
                </>
            ) : (
                <>
                    <div className="flex items-center gap-2">
                        <input
                            id={labelId}
                            type={type}
                            className="flex-1 w-full border-b-4 border-red-500 text-center"
                            placeholder={placeholder}
                        ></input>
                        <label htmlFor={labelId} className="font-medium">
                            {label}
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

export default FormInput;
