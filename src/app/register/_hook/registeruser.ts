'use server';

import { mailOptions, transporter } from "@/config/nodemailer";
import { generateAuthToken } from "@/lib/auth/generateAuthToken";
import { prisma } from "@/lib/prisma"
import { v4 as uuid } from "uuid"
import crypto from "crypto"

export default async function createUser(name: string, email: string, password: string) {
    if(name === "" || email === "" || password === ""){
        return false;
    }
    const user = await prisma.user.create({
        data: {
            id: uuid(),
            name: name,
            email: email,
            password: crypto.createHash('sha256').update(password).digest("hex"),
        }
    })
    if (!user) {
        console.log({ error: 'Something went wrong' });
        return false;
    }

    const token = generateAuthToken();
    await prisma.activateToken.create({
        data: {
            token: token,
            userId: user.id,
        }
    })
    // try {
    //     await transporter.sendMail({
    //         ...mailOptions,
    //         subject: "Kutumb Email Verification",
    //         text: `Your OTP is : ${token} this token will expire in 24 hours.`,
    //         html: `<h1>Your OTP is : ${token} this token</h1>`,
    //     })
    // } catch (err) {
    //     console.log(err)
    //     return false;
    // }
    return true;
}