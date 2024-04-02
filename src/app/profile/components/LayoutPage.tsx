'use client';

import { Text } from "@/components";
import { Organisation } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import SideBarItems from "./SideBarItems";
import { v4 as uuid} from "uuid"

interface LayoutPageProps {
    children: React.ReactNode;
    organisation: Organisation[];
}

const LayoutPage : React.FC<LayoutPageProps> = ({children, organisation}) => {
    const pathName = usePathname();
    const [orgId, setOrgId] = useState<string | null>(null);
    const Personalroutes = useMemo(() => [
        {
            label: 'Account',
            active: pathName === '/profile' || pathName === '/profile/account',
            href: '/profile'
        },
        {
            label: 'Notifications',
            active: pathName === '/profile/notifications',
            href: '/profile/notifications'
        },
        {
            label: 'Organisations',
            active: pathName === '/profile/organisations',
            href: '/profile/organisations'
        },
        {
            label: 'Become a NGO',
            active: pathName === '/profile/newngo',
            href: '/profile/newngo'
        }
    ], [pathName])

    const OrganisationalRoutes = useMemo(() => [
        {
            label: 'General',
            active: pathName === '/profile/organisations/general',
            href: `/profile/organisations/general`
        },
        {
            label: 'Members',
            active: pathName === '/profile/organisations/members',
            href: `/profile/organisations/members`
        },
        {
            label: 'SSO',
            active: pathName === '/profile/organisations/sso',
            href: `/profile/organisations/sso`
        },
        {
            label: 'Integration',
            active: pathName === '/profile/organisations/integration',
            href: `/profile/organisations/integration`
        },
        {
            label: 'Billing',
            active: pathName === '/profile/organisations/billing',
            href: `/profile/organisations/billing`
        }
    ], [pathName])
    return(
        <div className="flex flex-row justify-center w-full bg-white-A700 h-screen overflow-hidden">
            <div className="flex flex-col py-4 md:px-8 bg-gray-100">
                <div className="flex ml-[13px] p-[7px] md:ml-0">
                    <Text size="md" as="r" className="self-end !font-semibold">
                        Profile
                    </Text>
                </div>
                <div className="flex flex-col items-start">
                    <div className="px-5 mt-[19px] self-stretch py-3 border-t-[1px] border-black-900/30">
                        <Text as={"p"} size="s" className="!font-semibold">Personal</Text>
                    </div>
                    <div className="flex flex-col items-start w-full md:ml-0 gap-1">
                        {Personalroutes.map((values, index) => (
                            <SideBarItems key={values.href} {...values} />
                        )) }
                    </div>
                    {organisation.map((values) => (
                        <div key={values.id}>
                            <div key={values.org_id} className="px-5 mt-[19px] self-stretch py-3 border-t-[1px] border-black-900/30">
                                <Text as={"p"} size="s" className="!font-semibold">{values.org_name}</Text>
                            </div>
                            <div key={values.id} className="flex flex-col items-start mt-1 md:ml-0 w-full gap-1">
                                {OrganisationalRoutes.map((item) => (
                                    <SideBarItems key={item.label} label={item.label} active={item.active} href={item.href + '/?id=' + values.id} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-start md:self-stretch bg-white-A700 flex-1 mt-10 h-screen overflow-auto pb-24">
                {children}
            </div>
        </div>
    )
}

export default LayoutPage