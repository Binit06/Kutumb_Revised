'use server';

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import getUserFromRedis from "./getUser";
import { createClient } from "redis";
import { UserProfile } from "@prisma/client";

export default async function getUserProfile() {
    const token = cookies().get('token')?.value;
    const client = await createClient().on('error', error => console.log('Redis Client Error', error)).connect();
    let data : UserProfile | null = null;
    if(await client.get('profile') === null) {
        const user = await getUserFromRedis()
        const userProfile = await prisma.userProfile.findUnique({
            where: {
                userId: user?.id
            },
        })

        if(userProfile){
            data = userProfile
            await client.set('profile', JSON.stringify(data))
        }
    } else {
        const profileData = await client.get('profile');
        if(profileData){
            data = JSON.parse(profileData) as UserProfile;
        }
    }

    return data as UserProfile;
}