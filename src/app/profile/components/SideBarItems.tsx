import { Text } from "@/components"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

interface SideBarItemsProps {
    label: string,
    active?: boolean,
    href: string
}

const SideBarItems : React.FC<SideBarItemsProps> = ({label, active, href}) => {
    return (
        <Link href={href} className={twMerge(`flex px-8 py-2 cursor-pointer hover:bg-white-A700 w-full rounded-md hover:rounded-md`, active && "bg-white-A700")}>
            <Text as="p" size="s">
                {label}
            </Text>
        </Link>
    )
}

export default SideBarItems