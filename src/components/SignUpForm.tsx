import Link from "next/link";
import FormInput from "./FormInput";



const LoginForm = () => {
    return <div className='w-[700px] h-[682px] flex flex-col'>

        <h1 className="text-center font-bold text-6xl">Create Account</h1>
        <div className='mt-4 flex-1 flex flex-col justify-around'>
            <FormInput type={'text'} label={'Full Name'} placeholder="Full Name" />
            <FormInput type={'email'} label={'Email'} placeholder="Email" />
            <FormInput type={'password'} label={'Password'} placeholder="Password" />
            <FormInput type={'password'} label={'Confirm Password'} placeholder="Confirm Password" />
            <FormInput type={'checkbox'} label={'Admin Access'} />
        </div>
        <button className='mt-4 p-4 rounded-xl border-2 bg-red-700 text-white text-4xl font-bold'>Sign up</button>
        <p className='pt-4 text-center'>Already have an account? <Link href="/signin" className="font-bold">Sign In</Link></p>
    </div>
}
 
export default LoginForm;