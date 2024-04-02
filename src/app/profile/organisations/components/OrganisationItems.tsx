'use client';

import Link from "next/link";

interface OrganisationItemProps {
    organisationName: string;
    organisationMail: string;
    verificationStatus: string;
    href: string;
}

const OrganisationItem : React.FC<OrganisationItemProps> = ({
    organisationName,
    organisationMail,
    verificationStatus,
    href
}) => {
    return(
        <div className="text-black-900 flex flex-col gap-3 p-5 w-[20rem] aspect-video rounded-2xl shadow-md shadow-neutral-800/20">
            <div className="flex flex-col gap-2">
                <div className="!font-bold text-xl">
                    {organisationName}
                </div>
                <div className="text-neutral-600">
                    {organisationMail}
                </div>
            </div>
            <div className="px-2">
                This organisation aims to bring knowledge and diverseness even to the lowest community present in the society
            </div>
            <div className="flex flex-row justify-between items-center p-2">
                <div className="text-neutral-400">{verificationStatus}</div>
                <Link href={href} passHref>
                    <div className="text-indigo-500">
                        View NGO
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default OrganisationItem