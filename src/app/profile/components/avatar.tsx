"use client";

interface MyAvatarProps {
    text: string;
    type: string;
}

const MyAvatar: React.FC<MyAvatarProps> = ({text, type}) => {
    return(
        <div className={`bg-[#99c5d9] ${type === "setting"? "rounded-[5px]" : "rounded-full"} overflow-hidden opacity-70 flex justify-center items-center aspect-square`}>
            <h1 className="font-semibold text-2xl text-[#131f23] text-center">{text}</h1>
        </div>
    )
}

export default MyAvatar