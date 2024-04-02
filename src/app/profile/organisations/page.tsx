'use client';

import getOrganisation from "@/hooks/getOrganisation";
import { Organisation } from "@prisma/client";
import { useEffect, useState } from "react";
import OrganisationItem from "./components/OrganisationItems";
import { CiCirclePlus } from "react-icons/ci";
import getMemberOrganisation from "@/hooks/getMemberOrganisations";

const OrganisationsPage = () => {
    const [orgData, setOrgData] = useState<Organisation[] | null>(null);
    useEffect(() => {
        const fetchOrganisatiion = async() => {
            const orgData = await getMemberOrganisation();
            setOrgData(orgData);
        }

        fetchOrganisatiion();
    }, [])
    return (
        <div className="grid grid-cols-3 gap-4 px-40">
            {orgData?.map((value, index) => (
                <OrganisationItem key={value.org_id} organisationName={value.org_name} organisationMail={value.org_mail} verificationStatus={value.verificaion} href={`/?ngo=${value.org_id}`}/>
            ))}
            {/* <div className="flex items-center cursor-pointer"> */}
                {/*Create a new link where user can find all the organisation and go on from there also give the option to join using ID from there only*/}
                {/* <CiCirclePlus color="black" size={35} className="opacity-50 hover:opacity-100 transition-all" title="Join New NGO"/> */}
            {/* </div> */}
        </div>
    )
}

export default OrganisationsPage;