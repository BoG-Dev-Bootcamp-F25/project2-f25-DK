import FormInput from "./FormInput";



const LoginForm = () => {
    return <div className='w-[700px] h-[682px] flex flex-col'>

        <h1>Create Account</h1>
        <FormInput type={'text'} label={'Full Name'} />
        <button>Sign up</button>
    </div>
}
 
export default LoginForm;