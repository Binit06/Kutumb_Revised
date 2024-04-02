'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import dashboardImage from "../../public/dashboard_icon.svg";
import profileImage from "../../public/profile_icon.svg";
import collaborationImage from "../../public/collaboration_icon.svg";
import volunteerMatchIcon from "../../public/volunteer_match_icon.svg";
import volunteerIcon from "../../public/volunteer_icon.svg";

interface NavBarProps {
    children: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
    const pathname = usePathname();

    const NavRoutes = useMemo(
        () => [
            {
                label: "DashBoard",
                active: pathname === "/dashboard" || pathname === "/",
                icon: dashboardImage,
                href: "/dashboard",
            },
            {
                label: "Profile",
                active: pathname === "/profile",
                icon: profileImage,
                href: "/profile",
            },
            {
                label: "Collaboration",
                active: pathname === "/collaboration",
                icon: collaborationImage,
                href: "/collaboration",
            },
            {
                label: "Volunteer Matching",
                active: pathname === "/match",
                icon: volunteerMatchIcon,
                href: "/match",
            },
            {
                label: "Volunteers",
                active: pathname === "/volunteers",
                icon: volunteerIcon,
                href: "/volunteers",
            },
        ],
        [pathname]
    );

    const [isNavBarOpen, setIsNavBarOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsNavBarOpen(true);
    };

    const handleMouseLeave = () => {
        setIsNavBarOpen(false);
    };

    return (
        <div
            className={`flex flex-row`}
        >
            <div className="absolute w-20 left-0 h-screen top-0 flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
                <div
                    className={`flex flex-col gap-12 py-8 absolute left-0 top-1/2 translate-y-[-50%] px-4 ${
                        isNavBarOpen ? "translate-x-4" : "-translate-x-full"
                    } transition-all duration-300 bg-white-A700 shadow-lg rounded-3xl`}
                >
                    {NavRoutes.map((item) => (
                        <a
                            key={item.label}
                            title={item.label}
                            href={item.href}
                            className={`${
                                item.active
                                    ? "text-black-900"
                                    : "text-black-900 opacity-50"
                            } hover:opacity-100 transition-all text-lg relative aspect-square p-2 rounded-md bg-white-A700`}
                        >
                            <Image
                                src={item.icon}
                                width={35}
                                height={35}
                                alt="DashBoardImage"
                            />
                        </a>
                    ))}
                </div>
            </div>
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default NavBar;
