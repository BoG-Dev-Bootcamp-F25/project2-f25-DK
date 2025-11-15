type FormInputProps = {
    label: string;
    type: 'text' | 'email' | 'password' | 'checkbox';
    placeholder?: string;
};

const FormInput = ({ label, type, placeholder, ...props }: FormInputProps) => {
    const labelId = `form-${label.replaceAll(' ', '-')}`;
    return (
        <div className="m-4 flex flex-col items-start">
            {type != 'checkbox' ? (
                <>
                    <label htmlFor={labelId} className="pb-4 font-medium hidden">
                        {label}
                    </label>
                    <input
                        {...props}
                        id={labelId}
                        type={type}
                        className="flex-1 pt-2 text-2xl w-full border-0 border-b-4 border-red-500"
                        placeholder={placeholder}
                    ></input>
                </>
            ) : (
                <>
                    <div className="flex items-center gap-2">
                        <input
                            id={labelId}
                            type={type}
                            className="flex-1 pt-2 appearance-none w-6 h-6 border-2 border-red-400 rounded-sm bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            placeholder={placeholder}
                        ></input>
                        <label htmlFor={labelId} className="text-2xl font-medium">
                            {label}
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

export default FormInput;
