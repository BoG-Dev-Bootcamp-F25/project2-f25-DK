/**
 * Form input with default styles that can be overriden
 */

type FormInputProps = {
    label: string;
    type:
        | 'text'
        | 'email'
        | 'password'
        | 'checkbox'
        | 'textarea'
        | 'dropdown'
        | 'number';
    placeholder?: string;
    className?: string;
    dropdownOptions?: string[];
};

const FormInput = ({
    label,
    type,
    placeholder,
    className,
    dropdownOptions,
    ...props
}: FormInputProps) => {
    const labelId = `form-${label.replaceAll(' ', '-')}`;
    return (
        <div className="m-4 flex flex-col items-start">
            {type == 'textarea' ? (
                <>
                    <label
                        htmlFor={labelId}
                        className="pb-4 text-2xl font-medium"
                    >
                        {label}
                    </label>
                    <textarea
                        {...props}
                        id={labelId}
                        className={
                            className
                                ? className
                                : 'flex-1 pt-2 text-2xl w-full border-0 border-b-4 border-red-500'
                        }
                        placeholder={placeholder}
                    ></textarea>
                </>
            ) : type == 'dropdown' && dropdownOptions ? (
                <>
                    <label htmlFor={labelId} className="text-2xl font-medium">
                        {label}
                    </label>
                    <select
                        id={labelId}
                        className={
                            className
                                ? className
                                : 'flex-1 text-2xl w-full border-0 border-b-4 border-red-500'
                        }
                    >
                        {dropdownOptions.map((o, i) => {
                            return <option value={o} key={i}>{o}</option>;
                        })}
                    </select>
                </>
            ) : type == 'checkbox' ? (
                <>
                    <div className="flex items-center gap-2">
                        <input
                            id={labelId}
                            type={type}
                            className="flex-1 pt-2 appearance-none w-6 h-6 border-2 border-red-400 rounded-sm bg-white checked:bg-red-500 checked:border-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            placeholder={placeholder}
                        ></input>
                        <label
                            htmlFor={labelId}
                            className="text-2xl font-medium"
                        >
                            {label}
                        </label>
                    </div>
                </>
            ) : (
                <>
                    <label
                        htmlFor={labelId}
                        className="pb-4 text-2xl font-medium"
                    >
                        {label}
                    </label>
                    <input
                        {...props}
                        id={labelId}
                        type={type}
                        className={
                            className
                                ? className
                                : 'flex-1 pt-2 text-2xl w-full focus:ring-0 border-0 border-b-4 border-red-500'
                        }
                        placeholder={placeholder}
                    ></input>
                </>
            )}
        </div>
    );
};

export default FormInput;
