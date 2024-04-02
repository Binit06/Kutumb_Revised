"use client";

import { useEffect, useState } from "react";
import { Organisation } from "@prisma/client";
import getOrganisation from "@/hooks/getOrganisation";
import useVerificationModel from "@/hooks/modelStore/useVerificationModel";

const VerifyNGO = () => {
    const [org, setOrg] = useState<Organisation | null>(null);
    const VerificationModel = useVerificationModel();

    useEffect(() => {
        const fetchOrganisation = async () => {
            try {
                const userOrgs = await getOrganisation();
                console.log(userOrgs);
                if (userOrgs) {
                    setOrg(userOrgs);
                }
            } catch (error) {
                console.error("Error fetching organisation:", error);
            }
        };

        fetchOrganisation();
    }, []);

    return (
        <div className="text-black-900 px-40 w-full">
            <div className="flex flex-row justify-between w-full items-center">
                <div className="text-2xl font-bold font-mono">{org ? org.org_name : "No Organisation Found"}</div>
                <button className="py-2 px-3 bg-indigo-500 rounded-md text-white-A700 font-medium" onClick={() => {VerificationModel.onOpen()}}>{"+ Create New Verification Request"}</button>
            </div>
        </div>
    );
};

export default VerifyNGO;
