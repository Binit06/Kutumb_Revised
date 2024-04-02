'use server';


import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { cookies } from "next/headers";

export default async function getUser() {
    const token = cookies().get('token')?.value;
    console.log(token)
    const userDetails = await prisma.user.findUnique({
        where: {
            id: token
        }
    })

    return userDetails as User;
}