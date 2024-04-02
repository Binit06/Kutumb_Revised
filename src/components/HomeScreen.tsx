'use client';

import { User, useUser } from "@/context/user/UserContext"
import getOrganisation from "@/hooks/getOrganisation";
import JoinOrganisation from "@/hooks/joinOrg";
import LogOutUser from "@/hooks/logOutUser";
import { Organisation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HomeScreenProps {
    userCurrent: User | null;
}

const HomeScreen : React.FC<HomeScreenProps> = ({userCurrent}) => {
    const router = useRouter();
    const { user, updateUser } = useUser()
    const [organisationName, setOrganisationName] = useState<Organisation[] | null>(null);
    useEffect(() => {
        if(!user){
            updateUser(userCurrent)
        }
    }, [user])

    useEffect(() => {
        const handleOrganisation = async () => {
            const userOrgs : Organisation[] = await getOrganisation();
            console.log(userOrgs);
            if(userOrgs.length > 0){
                setOrganisationName(userOrgs);
            }
        }

        handleOrganisation();
    }, [])

    const handleLogOut = async () => {
        LogOutUser();
        router.refresh();
    }

    const handleOrganisatinJoin = async () => {
        if(organisationName){
            JoinOrganisation(organisationName[0].org_name)
        }
    }
    return (
        <div className="home-screen">
            <h1>Organisations : {organisationName?.map((val, index) => (
                <div>{val.org_name}</div>
            ))}</h1>
            <h1>Welcome {user?.name}</h1>
            <input
                type="text"
                placeholder="Enter Organisation Name"
                className="p-2 rounded-md text-black-900"
                onChange={() => {}}
            />
            <br />
            <button onClick={handleOrganisatinJoin}>Join An Organisation By ID</button><br/>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default HomeScreen;