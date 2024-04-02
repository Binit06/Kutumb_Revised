'use server';

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import crypto from "crypto"

export default async function PasswordCheck(email: string, password: string): Promise<boolean> {
    try {
        if (password !== null) {
            const newPassword = crypto.createHash('sha256').update(password).digest('hex');
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                }
            });

            if (user && user.password === newPassword) {
                cookies().set('token', user.id);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.error("Something went wrong:", error);
        return false;
    }
}
