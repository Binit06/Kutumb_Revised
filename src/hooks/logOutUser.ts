'use server';

import { cookies } from "next/headers";
import { createClient } from "redis"

const LogOutUser = async () => {
    const client = await createClient().on('error', (err) => {console.log(err)}).connect();

    await client.del('newUser')

    cookies().delete('token')

    await client.quit();

}

export default LogOutUser