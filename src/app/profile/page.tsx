"use client";

import { User } from "@/context/user/UserContext";
import MyAvatar from "./components/avatar";
import getUserFromRedis from "@/hooks/getUser";
import { useEffect, useState } from "react";
import Section from "./components/section";
import { Input, Text } from "@/components";

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUserFromRedis();
            setUser(userData);
        }

        fetchData();
    }, [])
    return (
        <div className="flex flex-col items-start md:self-stretch bg-white-A700 flex-1 px-40 mt-10 h-screen overflow-auto pb-24">
            <div className="flex md:ml-0">
                <Text size="md" as="p" className="font-semibold">
                    Account
                </Text>
            </div>
            <Text size="s" as="p" className="md:ml-0 !text-black-900_7f mt-2">
                Manage your profile, preferences and account settings
            </Text>
            <div className="flex flex-col w-[88%] md:w-full mt-[46px] mb-[5px] gap-[29px] md:ml-0">
                <div className="flex flex-col pb-[30px] gap-[27px] sm:pb-5 border-black-900_4c border border-solid rounded-[5px]">
                    <div className="flex p-[19px] border-black-900_33 border-b border-solid">
                        <Text size="s" as="p" className="self-start">
                            Your Profile
                        </Text>
                    </div>
                    <div className="flex p-2.5">
                        <div className="flex w-fit ml-5 pr-4">
                            <div className="flex w-20 hover:opacity-50 transition-all cursor-pointer">
                                <MyAvatar text={(user?.name || '')[0]} type="home"/>
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <Text size="s" as="p" className="!font-medium">
                                    Profile Picture
                                </Text>
                                <Text size="xs" as="p" className="!text-black-900_7f !font-thin">
                                    Use a picture that is 132px or larger
                                </Text>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex self-start px-[19px] py-4">
                            <Text size="s" as="p" className="ml-5 md:ml-0">
                                Full Name
                            </Text>
                        </div>
                        <div className="w-full px-8">
                            <input name="john_doe" placeholder={`John Doe`} defaultValue={user?.name || ''} className="w-full border-black-900_7f border-[1px] p-2 rounded-md text-black-900" disabled />
                        </div>
                    </div>
                </div>
                <div className="pb-[30px] sm:pb-5 border-black-900_4c border border-solid rounded-[5px]">
                    <div className="flex flex-col gap-[27px]">
                        <div className="flex p-[19px] border-black-900_33 border-b border-solid">
                            <Text size="s" as="p" className="self-start">
                                Login Details
                            </Text>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex self-start px-[19px] py-4">
                                <Text size="s" as="p" className="ml-5 md:ml-0">
                                    Email
                                </Text>
                            </div>
                            <div className="w-[100%] px-10">
                                <input name="email" placeholder={`johndoes@gmail.com`} defaultValue={user?.email} className="w-full border-black-900_7f border-[1px] p-2 rounded-md text-black-900 placeholder:text-black-900" disabled />
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="flex self-start px-[19px] py-4">
                                <Text size="s" as="p" className="self-end ml-[22px] md:ml-0">
                                    Organisation Email
                                </Text>
                            </div>
                            <div className="w-[100%] px-10">
                                <input name="weburl" placeholder={`binitlenka.organisation.com`} defaultValue={`binitlenka.organisation.com`} className="w-full border-black-900_7f border-[1px] p-2 rounded-md text-black-900 placeholder:text-black-900" disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;