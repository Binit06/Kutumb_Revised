'use server';

import { Text } from "@/components";
import getOrganisation from "@/hooks/getOrganisation";
import getUserFromRedis from "@/hooks/getUser";
import { Organisation } from "@prisma/client";
import { NextApiRequest } from "next";
import React from "react";
import LayoutPage from "./components/LayoutPage";
import ModalProvider from "@/providers/ModelProvider";
import getMemberOrganisation from "@/hooks/getMemberOrganisations";

interface LayoutProps {
    children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = async ({ children }) => {

    const orgs : Organisation[] | null = await getMemberOrganisation();
    return (
        <>
        <ModalProvider />
        <LayoutPage organisation={orgs}>
            {children}
        </LayoutPage>
        </>
    )
}

export default Layout;