'use server';

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid"
import { MemberDetails } from "../organisation/page";

interface CreateOrganisationProps {
    org_name : string;
    org_type : string;
    org_Est_data : Date;
    members : MemberDetails[];
    org_web_url : string;
    org_social_url : string;
}
function camelCase(str : string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

const createOrganisation = async (
    org_name : string,
    org_type : string,
    org_Est_data : Date,
    members : MemberDetails[],
    org_web_url : string,
    org_social_url : string
) => {
    const token = cookies().get('token')?.value;
    const user = await prisma.user.findUnique({
        where: {
            id: token
        }
    })

    if(!user){
        console.error("No User Found")
        return false
    }

    const org_email = camelCase(org_name) + '.organisation.com'

    const creationId = uuid();
    
    try {
        await prisma.organisation.create({
            data: {
                id: creationId,
                org_name: org_name,
                org_id: uuid(),
                org_mail: org_email,
                org_key: uuid(),
                verificaion: 'NOTVERIFIED',
                est_date: org_Est_data,
                web_url: org_web_url,
                user_id: user.id,
                social_url: org_social_url,
            }
        })

        for(const member of members) {
            const user = await prisma.user.findUnique({
                where: {
                    email: member.memberEmail
                }
            })

            if(user){
                if(member.memberDesignation === "HEAD"){
                    await prisma.userProfile.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            status: "NGO"
                        }
                    })
                }
                await prisma.userProfile.update({
                    where: {
                        userId: user.id,
                    },
                    data: {
                        organisation: {
                            connect: {
                                id: creationId
                            }
                        }
                    }
                })
            }
        }


    
        return true;
    } catch (error) {
        console.log(error)
        return false
    }
}

export default createOrganisation