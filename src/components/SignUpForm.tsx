'use client';
import Link from 'next/link';
import FormInput from './FormInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import router from 'next/router';
import { toast, ToastContainer } from 'react-toastify';

type Inputs = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    admin: boolean;
};

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<Inputs>({ defaultValues: { admin: false } });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        //  - First compares Password and Confirm Password inputs and if they do not match notifies the user and keeps the user on the page
        if (data.password != data.confirmPassword) {
            setError('password', { message: 'Passwords do not match' });
            return;
        }

        await fetch('/api/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(async (response) => {
                const respBody = await response.json();
                console.log('Create user response ', respBody);
                if (response.ok) {
                    toast('User created successfully!');
                    reset();
                } else {
                    setError('root.serverError', { message: respBody.error });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    console.log(errors);
    return (
        <div className="w-[700px] h-860px min-h-0 overflow-hidden flex flex-col z-20 bg-white">
            <form
                className="h-full min-h-0 overflow-hidden flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <ToastContainer />
                <h1 className="text-center font-bold text-6xl">
                    Create Account
                </h1>

                {errors?.root?.serverError && (
                    <p className="p-4 text-center text-2xl text-red-400">
                        {errors?.root?.serverError.message}
                    </p>
                )}
                <div className="h-full overflow-auto mt-4 flex-1 flex flex-col justify-around">
                    <FormInput
                        type={'text'}
                        label={'Full Name'}
                        placeholder="Full Name"
                        {...register('fullName', { required: true })}
                    />
                    {errors.fullName?.type === 'required' && (
                        <p className="pl-4 text-2xl text-red-400" role="alert">
                            Full name is required
                        </p>
                    )}
                    <FormInput
                        type={'email'}
                        label={'Email'}
                        placeholder="Email"
                        {...register('email', { required: true })}
                    />
                    {errors.email?.type === 'required' && (
                        <p className="pl-4 text-2xl text-red-400" role="alert">
                            Email name is required
                        </p>
                    )}

                    <FormInput
                        type={'password'}
                        label={'Password'}
                        placeholder="Password"
                        {...register('password', {
                            required: true,
                            minLength: 8,
                        })}
                    />
                    {errors.password?.type === 'required' && (
                        <p className="pl-4 text-2xl text-red-400" role="alert">
                            Password is required
                        </p>
                    )}
                    {errors.password?.type === 'minLength' && (
                        <p className="pl-4 text-2xl text-red-400" role="alert">
                            Password must be at least 8 characters long
                        </p>
                    )}
                    <FormInput
                        type={'password'}
                        label={'Confirm Password'}
                        placeholder="Confirm Password"
                        {...register('confirmPassword', { required: true })}
                    />
                    {errors.confirmPassword?.type === 'required' && (
                        <p className="pl-4 text-2xl text-red-400" role="alert">
                            You must confirm your password
                        </p>
                    )}
                    <FormInput
                        type={'checkbox'}
                        label={'Admin Access'}
                        {...register('admin')}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 p-4 rounded-xl border-2 bg-red-700 text-white text-4xl font-bold"
                >
                    Sign up
                </button>
            </form>
            <p className="pt-4 text-center">
                Already have an account?{' '}
                <Link href="/signin" className="font-bold">
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default SignUpForm;
