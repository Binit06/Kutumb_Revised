"use client";
import { generateAuthToken } from "@/lib/auth/generateAuthToken";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import createUser from "./_hook/registeruser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Oval } from "react-loader-spinner"

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false)
    const { push } = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const email = data.get('email') as string;
        localStorage.setItem('email', email);
        const password = data.get('password') as string;
        const name = data.get('name') as string;
        try {
            const response = await createUser(name, email, password)
            if(!response){
                console.log('Something Went wrong');
                setIsLoading(false)
            } else {
                push('/register/success')
            }
        } catch (error) {
            setIsLoading(false)
        }
    }
    return(
        <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
            <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12 w-[500px]">
                <h1 className="font-semibold text-2xl text-black text-center">Create your Account</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input name="name" placeholder="Name" type="text" className="text-center p-1 border-2 border-neutral-300 rounded-[3px] py-3 text-black" />
                    <input name="email" placeholder="Email" type="text" className="text-center p-1 border-2 border-neutral-300 rounded-[3px] py-3 text-black"/>
                    <input name="password" placeholder="Password" type="password" className="text-center p-1 border-2 border-neutral-300 rounded-[3px] py-3 text-black"/>
                    <button type="submit" className="w-full text-center bg-indigo-500 p-3 rounded-[5px] flex flex-row gap-3 items-center justify-center">
                        <span>
                            <Oval
                            height={'20'}
                            width={'20'}
                            visible={isLoading}
                            color="#000000"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass="" 
                            secondaryColor="rgb(99 102 241)"
                            />
                        </span>
                        {!isLoading ? "Create Account": null}
                    </button>
                </form>
                <p className="text-neutral-700 text-center">
                    Have an Account? {' '}
                    <Link className="text-indigo-500 hover:underline" href={'/login'}>
                    SignIn
                    </Link>{' '}
                </p>
            </div>
        </div>
    )
}