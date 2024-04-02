'use server';

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid"

export default async function authorizeUser(email: string, token: string){
    const vertoken = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            ActivateToken: {
                where: {
                    activatedAt: null,
                    createdAt: {
                        gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
                    },
                    token: token
                } 
            }
        }
    })

    console.log(vertoken?.ActivateToken)
    if(vertoken?.ActivateToken.length !== 1) return false;
    try{
        await prisma.$transaction(async (prismaClient) => {
            await prismaClient.user.update({
                where: {
                    email: email
                },
                data: {
                    active: true
                }
            })
            await prismaClient.activateToken.update({
                where: {
                    id: vertoken.ActivateToken[0].id
                },
                data: {
                    activatedAt: new Date(),
                }
            })
        })
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(user){
            await prisma.userProfile.create({
                data: {
                    id: uuid(),
                    userId: user?.id
                }
            })
            cookies().set('token', user?.id || '')
        }
        return true;
    } catch (error) {
        return false;
    }
}