import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const loginhandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "POST"){
        return res.status(405).json({message: 'Method not allowed'});
    }

    const {email, password} = JSON.parse(req.body);

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    if(!user){
        console.log('User not found')
        return res.status(401).json({message: 'User not found'});
    }

    if(!user.active){
        return res.status(405).json({message: 'Your account is not active'});
    }

    if(user.password !== password){
        return res.status(405).json({message: 'Invalid credentials'});
    }

    res.status(200).json({message: 'You are logged in'});
}

export default loginhandler;