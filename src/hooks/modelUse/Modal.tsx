"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io"
import useVerificationModel from "../modelStore/useVerificationModel";

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({
    isOpen,
    onChange,
    title,
    description,
    children
}) => {
    const verificationModel = useVerificationModel();
    return(
        <div>
            <Dialog.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}
            >
                <Dialog.Portal>
                    <Dialog.Overlay 
                    className="
                    bg-neutral-900/90
                    backdrop-blur-sm
                    fixed
                    inset-0
                    "
                    />
                    <Dialog.Content
                        className="
                        fixed
                        drop-shadow-md
                        border
                        border-neutral-700
                        top-[50%]
                        left-[50%]
                        max-h-full
                        h-full
                        md:h-full
                        md:max-h-[85vh]
                        w-full
                        md:w-[90vw]
                        md:max-w-[70vw]
                        translate-x-[-50%]
                        translate-y-[-50%]
                        rounded-md
                        bg-white-A700
                        p-[25px]
                        focus:outline-none
                        overflow-auto
                        scrollbar
                        "
                    >
                        <Dialog.Title
                        className="
                        text-xl
                        text-black-900
                        text-center
                        font-bold
                        mb-4
                        "
                        >
                            {title}
                        </Dialog.Title>
                        <Dialog.Description className="
                        mb-5
                        text-black-900
                        text-sm
                        loading-normal
                        text-center
                        ">
                            {description}
                        </Dialog.Description>
                        <div>
                            {children}
                        </div>
                        <Dialog.Close asChild>
                            <button className="
                            text-black-900
                            hover:text-white
                            absolute
                            top-[10px]
                            right-[10px]
                            inline-flex
                            h-[25px]
                            w-[25px]
                            appearance-none
                            items-center
                            justify-center
                            rounded-full
                            focus:outline-none
                            "
                            onClick={verificationModel.onClose}>
                                <IoMdClose />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}

export default Modal