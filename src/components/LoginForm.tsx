'use client';
import Link from 'next/link';
import FormInput from './FormInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

type Inputs = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const result = await signIn('credentials', {
            redirect: false, // Prevent NextAuth from redirecting automatically

            email: data.email,
            password: data.password,
        });
        console.log(result);

        if (!result || result.error) {
            if (result?.status == 401) {
                setError('root.serverError', {
                    type: result.status as any,
                    message: 'Your email or password is incorrect.'
                })
            }
        } else {
            // Login successful, handle redirection or other actions
            window.location.href = '/dashboard/training-logs';
        }
    };

    return (
        <div className="w-[700px] flex flex-col">
            <form
                className="h-full flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="text-center font-bold text-6xl">Log In</h1>

                {errors?.root?.serverError && <p>{errors.root.message}</p>}
                <div className="mt-4 flex-1 flex flex-col justify-around">
                    <FormInput
                        type={'email'}
                        label={'Email'}
                        placeholder="Email"
                        {...register('email', { required: true })}
                    />
                    {errors.email?.type === 'required' && (
                        <p className="pl-4 text-red-500 text-lg" role="alert">
                            Email name is required
                        </p>
                    )}

                    <FormInput
                        type={'password'}
                        label={'Password'}
                        placeholder="Password"
                        {...register('password', { required: true })}
                    />
                    {errors.password?.type === 'required' && (
                        <p className="pl-4 text-red-500 text-lg" role="alert">
                            Password is required
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 p-4 rounded-xl border-2 bg-red-700 text-white text-4xl font-bold"
                >
                    Log In
                </button>
            </form>
            <p className="pt-4 text-center">
                Don't have an account?{' '}
                <Link href="/signup" className="font-bold">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
