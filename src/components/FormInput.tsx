
type FormInputProps = {
    label: string;
    type: 'text' | 'email' | 'password'
}

const FormInput = ({label, type} : FormInputProps) => {
    return <div className='mt-2'>
        <label></label><input className='w-100' placeholder="some input"></input>
    </div>
}
 
export default FormInput;