"use client";

import verifyUser from "@/hooks/verifyActiveUser";
import Link from "next/link";
import PasswordCheck from "./_hook/passwordCheck";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

export default function LoginPage(){
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    // const { updateUser } = useUser();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data)
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const response = await verifyUser(email);
        if(response === false){
            setIsLoading(false);
        } else { 
            const verified = await PasswordCheck(email, password);
            if(verified){
                const userData = {email: email}
                router.push('/')
            } else {
                alert("Your Password is Incorrect")
            }
        }
        setIsLoading(false)
    }
    return(
        <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
            <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12 w-[500px]">
                <h1 className="font-semibold text-2xl text-black-900 text-center">Login to your Account</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input name="email" placeholder="Email" type="text" className="text-center p-1 border-2 border-neutral-300 rounded-md py-3 text-black"/>
                    <input name="password" placeholder="Password" type="password" className="text-center p-1 border-2 border-neutral-300 rounded-md py-3 text-black"/>
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
                        {!isLoading ? "Login To Account": null}
                    </button>
                </form>
                <p className="text-neutral-700 text-center">
                    Do not have an Account? {' '}
                    <Link className="text-indigo-500 hover:underline" href={'/register'}>
                    SignUp
                    </Link>{' '}
                </p>
            </div>
        </div>
    )
}