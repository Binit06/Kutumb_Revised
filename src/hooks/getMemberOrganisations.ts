'use server';

import { prisma } from "@/lib/prisma";
import getUserFromRedis from "./getUser";
import { Organisation } from "@prisma/client";

const getMemberOrganisation = async () => {
    const user = await getUserFromRedis();
    const memberOrg = await prisma.userProfile.findUnique({
        where: {
            userId: user.id,
        },
        include: {
            organisation: true
        }
    })
    return memberOrg?.organisation as Organisation[];
}

export default getMemberOrganisation;