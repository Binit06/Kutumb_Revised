'use server';
import { User } from "@/context/user/UserContext";
import { createClient } from "redis";
import getUser from "./getUserDataFromToken";

const getUserFromRedis = async () => {
    let data : User | null = null;
    const client = await createClient().on('error', error => console.log('Redis Client Error', error)).connect();
    if(await client.get('newUser') === null) {
        data = await getUser()
        await client.set('newUser', JSON.stringify(data))
    } else {
        const userString = await client.get('newUser')
        if(userString){
            data = JSON.parse(userString) as User;
        }
    }

    return data as User;
}

export default getUserFromRedis;