'use client';

import React, { useState } from "react";
import createOrganisation from "../_hook/createOrganisation";

export interface MemberDetails {
    memberName: string;
    memberDesignation: string;
    memberEmail: string;
    memberPanCard: boolean;
}

const RegisterOrganisation: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [orgName, setOrgName] = useState<string>("");
    const [orgType, setOrgType] = useState<string>("");
    const [estDate, setEstDate] = useState<string>("");
    const [member, setMember] = useState<MemberDetails[]>([])
    const [webURL, setWebURL] = useState<string>("")
    const [socialURL, setSocialURL] = useState<string>("")


    const handleSubmit = async () => {
        const organisationName = orgName;
        const organisationType = orgType;
        const organisationEstDate = new Date(estDate);
        const members: MemberDetails[] = member;
        const organisationWebsiteUrl = webURL;
        const organisationSocialURL = socialURL;

        const response = await createOrganisation(organisationName, organisationType, organisationEstDate, members, organisationWebsiteUrl, organisationSocialURL)
        if (response) {
            alert("Organisation created successfully")
        } else {
            alert("Failed")
        }

    };

    const handleAddMember = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const newMember = {
            memberName: formData.get('member_name') as string,
            memberDesignation: formData.get('member_designation') as string,
            memberEmail: formData.get('member_email') as string,
            memberPanCard: formData.get('member_pan') as string === "YES" ? true : false
        }
        setMember([...member, newMember])
        event.currentTarget.reset()
    }

    return (
        <div className="w-full px-40 pb-40">
            <div className="text-5xl font-normal font-serif text-center text-white-A700 bg-black-900 w-full py-20">
                Please Fill in your Information
            </div>
            <div className="text-neutral-700 pt-5 pb-3 px-3 border-b-2 border-neutral-400 w-full">
                Create New Organisation
            </div>
            <div className="grid grid-cols-2">
                <div className="py-5 px-3 flex flex-col gap-2">
                    <div className="text-sm text-neutral-500 italic">
                        Organisation Name <span className="text-red-800 font-bold">*</span>
                    </div>
                    <div>
                        <input value={orgName} onChange={(e) => setOrgName(e.target.value)} type="text" name="org_name" placeholder="Organisation Name" className="w-full py-3 px-3 rounded-md text- text-black-900 bg-neutral-200 focus:outline-0" autoSave="false" />
                    </div>
                </div>
                <div className="py-5 px-3 flex flex-col gap-2">
                    <div className="text-sm text-neutral-500 italic">
                        Organisation Type <span className="text-red-800 font-bold">*</span>
                    </div>
                    <div>
                        <input type="text" value={orgType} onChange={(e) => setOrgType(e.target.value)} name="org_type" placeholder="Organisation Type" className="w-full py-3 px-3 rounded-md text- text-black-900 bg-neutral-200 focus:outline-0" autoSave="false" />
                    </div>
                </div>
                <div className="py-5 px-3 flex flex-col gap-2">
                    <div className="text-sm text-neutral-500 italic">
                        Establishment Date <span className="text-red-800 font-bold">*</span>
                    </div>
                    <div>
                        <input value={estDate} onChange={(e) => setEstDate(e.target.value)} type="date" name="org_name" placeholder="Establishment Date" className="w-full py-3 px-3 rounded-md text- text-black-900 bg-neutral-200 focus:outline-0" autoSave="false" />
                    </div>
                </div>
            </div>
            <div className="text-neutral-700 pt-5 pb-3 px-3 border-b-2 border-neutral-400 w-full">
                {"Member's Details"} <span className="font-bold text-sm text-red-700">*</span> <span className="text-sm italic text-neutral-600">{"(Members should be registered in the app)"}</span>
            </div>
            <div className="grid grid-cols-4">
                <div className="text-black-900 border-b-2 border-r-2 border-l-2 border-neutral-300 py-3 px-3">Member Name</div>
                <div className="text-black-900 border-b-2 border-r-2 border-neutral-300 py-3 px-3">Designation</div>
                <div className="text-black-900 border-b-2 border-r-2 border-neutral-300 py-3 px-3">Email ID <span className="italic text-sm text-neutral-400">{"(As registered in Kutumb)"}</span></div>
                <div className="text-black-900 border-b-2 border-r-2 border-neutral-300 py-3 px-3">PAN CARD AVAILABLE</div>
                {member?.map((value, index) => (
                    <>
                        <input key={index} type="text" value={value.memberName} className="p-3 bg-neutral-300 text-neutral-800 border-b-2 border-r-2 border-l-2 border-neutral-400" />
                        <input key={index} type="text" value={value.memberDesignation} className="p-3 bg-neutral-300 text-neutral-800 border-b-2 border-r-2 border-neutral-400" />
                        <input key={index} type="text" value={value.memberEmail} className="p-3 bg-neutral-300 text-neutral-800 border-b-2 border-r-2 border-neutral-400" />
                        <input key={index} type="text" value={(value.memberPanCard).toString()} className="p-3 bg-neutral-300 text-neutral-800 border-b-2 border-r-2 border-neutral-400" />
                    </>
                ))}
            </div>
            <form onSubmit={handleAddMember} className={`w-full grid grid-cols-4 relative ${member.length < 4 ? "visible" : "hidden"}`}>
                <input type="text" name="member_name" className="p-3 bg-neutral-300 text-neutral-800 border-r-2 border-l-2 border-neutral-400 focus:outline-0" autoSave="false" />
                <input type="text" name="member_designation" className="p-3 bg-neutral-300 text-neutral-800 border-r-2 border-neutral-400 focus:outline-0" autoSave="false" />
                <input type="text" name="member_email" className="p-3 bg-neutral-300 text-neutral-800 border-r-2 border-neutral-400 focus:outline-0" autoSave="false" />
                <input type="text" name="member_pan" className="p-3 bg-neutral-300 text-neutral-800 border-r-2 border-neutral-400 focus:outline-0" autoSave="false" />
                <button className="absolute right-[-45px] text-white-A700 font-bold top-1/2 translate-y-[-50%] p-2 rounded-full bg-black-900 text-lg w-8 h-8 flex items-center justify-center cursor-pointer">+</button>
            </form>
            <div className="text-neutral-700 pt-5 pb-3 px-3 border-b-2 border-neutral-400 w-full">
                Website Details
            </div>
            <div className="grid grid-cols-2">
                <div className="py-5 px-3 flex flex-col gap-2">
                    <div className="text-sm text-neutral-500 italic">
                        Website URL <span className="text-red-800 font-bold">*</span>
                    </div>
                    <div>
                        <input type="url" value={webURL} onChange={(e) => setWebURL(e.target.value)} name="org_url" placeholder="Organisation URL" className="w-full py-3 px-3 rounded-md text- text-black-900 bg-neutral-200 focus:outline-0" autoSave="false" />
                    </div>
                </div>
                <div className="py-5 px-3 flex flex-col gap-2">
                    <div className="text-sm text-neutral-500 italic">
                        Any Social URL
                    </div>
                    <div>
                        <input type="url" value={socialURL} onChange={(e) => setSocialURL(e.target.value)} name="org_social_url" placeholder="Organisation Social URL" className="w-full py-3 px-3 rounded-md text- text-black-900 bg-neutral-200 focus:outline-0" autoSave="false" />
                    </div>
                </div>
            </div>
            <div className="text-neutral-700 pt-5 pb-3 px-3 border-b-2 border-neutral-400 w-full">
                Target Issues
            </div>
            <div className="flex justify-between py-3">
                <div className="italic text-neutral-500">{"(The registration details can't be changed once registered please see it carefully)"}</div>
                <button onClick={handleSubmit} className="py-2 px-3 rounded-md bg-indigo-500">Proceed For Registration</button>
            </div>
        </div>
    );
};

export default RegisterOrganisation;
