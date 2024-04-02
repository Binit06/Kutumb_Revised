import VerifyNGO from "@/app/register/onboard/verification/page";
import RegisterOrganisation from "@/app/register/organisation/page"
import getUserProfile from "@/hooks/getUserProfile";
import { prisma } from "@/lib/prisma";

const NewNGO = async () => {
    const userProfile = await getUserProfile();
    const mainProfile = await prisma.userProfile.findUnique({
        where: {
            id: userProfile.id,
        }
    })
    return(
        <div className="flex w-full h-screen pb-80 overflow-auto pt-12">
            {mainProfile?.status !== "NGO" ? (
                <RegisterOrganisation />
            ): (
                <VerifyNGO />
            )}
        </div>
    )
}

export default NewNGO;