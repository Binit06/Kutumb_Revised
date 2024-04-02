"use client";

import { useRouter } from "next/navigation";
import authorizeUser from "../_hook/authorizeuser";

export default function SuccessPage() {
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const data = new FormData(event.currentTarget);
        const email = localStorage.getItem('email') as string;
        const OTP = data.get('otp') as string;
        const response = await authorizeUser(email, OTP);
        console.log(response)
        if(response){
            router.push('/')
            router.refresh()
        } else {
            alert("Failed")
        }
    }
    return(
        <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
            <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12 w-[500px]">
                <h1 className="font-semibold text-2xl text-black text-center">Create your Account</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input name="otp" placeholder="OTP" type="text" className="text-center p-1 border-2 border-neutral-300 rounded-md py-3 text-black" />
                    <button type="submit" className="w-full text-center bg-indigo-500 p-3 rounded-md">Create Account</button>
                </form>
            </div>
        </div>
    )
}