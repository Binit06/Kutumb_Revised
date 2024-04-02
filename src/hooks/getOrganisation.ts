'use server';


import { prisma } from "@/lib/prisma";
import { Organisation } from "@prisma/client";
import { cookies } from "next/headers";
import { createClient } from "redis";
import getUserFromRedis from "./getUser";

export default async function getOrganisation() {
    const token = cookies().get('token')?.value;
    const client = await createClient().on('error', error => console.log('Redis Client Error', error)).connect();
    let data : Organisation | null = null;
    if(await client.get('organisation') === null) {
        const user = await getUserFromRedis()
        const main = await prisma.organisation.findUnique({
            where: {
                user_id: user.id
            }
        })
        if(main){
            data = main
            await client.set('organisation', JSON.stringify(data))
        }
    } else {
        const organisationData = await client.get('organisation');
        if(organisationData){
            data = JSON.parse(organisationData) as Organisation;
        }
    }
    return data as Organisation;
}