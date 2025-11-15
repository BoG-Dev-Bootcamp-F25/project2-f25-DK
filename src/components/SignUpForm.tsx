"use client";
import Link from "next/link";
import FormInput from "./FormInput";
import {useForm, SubmitHandler} from 'react-hook-form'

type Inputs = {
    fullName :string;
    email: string;
    password: string;
    confirmPassword: string;
    isAdmin: boolean;
}

const SignUpForm = () => {

    const { register, handleSubmit, watch, formState: { errors }} = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {

        //  - First compares Password and Confirm Password inputs and if they do not match notifies the user and keeps the user on the page

        if (data.password != data.confirmPassword) {

        }
        // - Second handles creating a user using your backend code
        // - If creating the user was successful then it routes to the Training Logs Dashboard
        // - If creating the user was unsuccessful then there is some display to inform the user of the issue and remains on the create account page


    }

    return <div className='w-[700px] h-[682px] flex flex-col'>
        <form className="h-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center font-bold text-6xl">Create Account</h1>
        
        <div className='mt-4 flex-1 flex flex-col justify-around'>
            <FormInput type={'text'} label={'Full Name'} placeholder="Full Name" {...register("fullName", {required: true})} />
             {errors.fullName?.type === "required" && (
                <p className='pl-4' role="alert">Full name is required</p>
            )}
            <FormInput type={'email'} label={'Email'} placeholder="Email" {...register("email", {required: true})} />
             {errors.email?.type === "required" && (
                <p className='pl-4' role="alert">Email name is required</p>
            )}

            <FormInput type={'password'} label={'Password'} placeholder="Password" {...register("password", {required: true})}/>
             {errors.password?.type === "required" && (
                <p className='pl-4' role="alert">Password is required</p>
            )}
            <FormInput type={'password'} label={'Confirm Password'} placeholder="Confirm Password" {...register("confirmPassword", {required: true})}/>
             {errors.confirmPassword?.type === "required" && (
                <p className='pl-4' role="alert">You must confirm your password</p>
            )}
            <FormInput type={'checkbox'} label={'Admin Access'} {...register("isAdmin")} />
        </div>
        <button type="submit" className='w-full mt-4 p-4 rounded-xl border-2 bg-red-700 text-white text-4xl font-bold'>Sign up</button>
        </form>
        <p className='pt-4 text-center'>Already have an account? <Link href="/signin" className="font-bold">Sign In</Link></p>
    </div>
}
 
export default SignUpForm;