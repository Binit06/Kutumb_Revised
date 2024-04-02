'use server';

import { prisma } from "@/lib/prisma";
import getUserFromRedis from "./getUser";

const JoinOrganisation = async (orgName: string) => {
    try {
        const user = await getUserFromRedis();
        const existingOrgnaisation = await prisma.organisation.findUnique({
            where: {
                org_name: orgName,
            }
        })
        if(existingOrgnaisation) {
            await prisma.userProfile.update({
                where: {
                    userId: user.id,
                },
                data:{
                    organisation: {
                        connect: {
                            id: existingOrgnaisation?.id
                        }
                    }
                }
            })
            await prisma.organisation.update({
                where: {
                    org_id: existingOrgnaisation?.id
                },
                data: {
                    Members: {
                        connect: {
                            id: user.id
                        }
                    }
                }
            })
            return true;
        } else {
            return false;
        }
        
    } catch (error) {
        return false;
    }
}

export default JoinOrganisation;