"use client";

import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import useVerificationModel from "../modelStore/useVerificationModel";
import Modal from "./Modal";
import { deleteFile } from "@/app/server/deleteFile";
import { useEffect, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";

const VerificationModel = () => {
    const model = useVerificationModel();
    const { isOpen, onClose } = useVerificationModel();
    const [registrationURL, setRegistrationURL] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false)
    const [isDeletingPan, setIsDeletingPan] = useState(false)
    const [panNumber, setPanNumber] = useState<string>("");
    const [panURL, setPanURL] = useState<string | null>("")
    const [darpanId, setDarpanId] = useState<string>("");
    const onChange = (open: boolean) => {
        if(!open){
            model.onClose();
        }
    }

    const onSubmit = async () => {

    }

    const deletefile = async (path : string) => {
        setIsDeleting(true)
        const FileID = path.substring(path.lastIndexOf("/") + 1);
        const res = await deleteFile(FileID)
        if(res === true){
            setRegistrationURL(null)
            setIsDeleting(false)
        } else {
            setIsDeleting(false)
        }
    }

    const deletefilePAN = async (path : string) => {
        setIsDeletingPan(true)
        const FileID = path.substring(path.lastIndexOf("/") + 1);
        const res = await deleteFile(FileID)
        if(res === true){
            setPanURL(null)
            setIsDeletingPan(false)
        } else {
            setIsDeletingPan(false)
        }
    }
    return(
        <Modal
        title="Fill the Verification Form"
        description="Ths form is required to verify your NGO and making you eligible for raising funds"
        isOpen={isOpen}
        onChange={onChange}
        >
            <div className="text-black-900 px-20">
                <div><span className="text-black-900 font-bold text-lg">Upload your Registration Card</span> <span className="italic text-neutral-500 text-sm">{"(or any other document that proofs that you are government verified)"}</span></div>
                {registrationURL ? (
                    <div className="w-full h-52 flex flex-col gap-2 items-center justify-center border-2 border-dashed rounded-md border-neutral-500 mt-3">
                        <div>
                            <a href={registrationURL} target="_blank" rel="noreferrer" className="text-blue-500">
                                Preview Uploaded File
                            </a>
                        </div>
                        <button onClick={() => {deletefile(registrationURL)}} className="px-3 py-2 bg-indigo-500 rounded-md flex flex-row gap-2" disabled={isDeleting}>
                        <span>
                            <Oval
                            height={'20'}
                            width={'20'}
                            visible={isDeleting}
                            color="#000000"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass="" 
                            secondaryColor="rgb(99 102 241)"
                            />
                            </span>
                            {!isDeleting ? "Remove File": "Removing File"}
                        </button>
                    </div>
                ): (
                    <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        setRegistrationURL(res[0].url)
                        alert(`Upload completed : ${res[0].url}`);
                    }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`)
                    }}
                    />
                )}
                <div className="mt-4"><span className="text-black-900 font-bold text-lg">PAN Card Number</span> <span className="italic text-neutral-500 text-sm">{"(as written under the PAN Card issued by Government Of India for your Organisation)"}</span></div>
                <div className="flex flex-row gap-2 mt-2">
                    <input type="text" className="w-64 border-b-2 border-neutral-700 h-fit text-2xl tracking-[0.5em] overflow-hidden py-3 font-semibold font-mono text-black-900 text-center focus:outline-0" value={panNumber} onChange={(e) => {setPanNumber((e.target.value).toUpperCase())}}/>
                </div>
                <div className="mt-4"><span className="text-black-900 font-thin text-lg">Upload your PAN Card</span> <span className="italic text-neutral-500 text-sm">{""}</span></div>
                {panURL ? (
                    <div className="w-full h-52 flex flex-col gap-2 items-center justify-center border-2 border-dashed rounded-md border-neutral-500 mt-3">
                        <div>
                            <a href={panURL} target="_blank" rel="noreferrer" className="text-blue-500">
                                Preview Uploaded File
                            </a>
                        </div>
                        <button onClick={() => {deletefilePAN(panURL)}} className="px-3 py-2 bg-indigo-500 rounded-md flex flex-row gap-2" disabled={isDeletingPan}>
                        <span>
                            <Oval
                            height={'20'}
                            width={'20'}
                            visible={isDeletingPan}
                            color="#000000"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass="" 
                            secondaryColor="rgb(99 102 241)"
                            />
                            </span>
                            {!isDeletingPan ? "Remove File": "Removing File"}
                        </button>
                    </div>
                ): (
                    <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        setPanURL(res[0].url)
                        alert(`Upload completed : ${res[0].url}`);
                    }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`)
                    }}
                    />
                )}
                <div className="mt-4"><span className="text-black-900 font-bold text-lg">NGO Darpan ID</span> <span className="italic text-neutral-500 text-sm">{"(as issued by ngo darpan)"}</span></div>
                <div className="flex flex-row gap-2 mt-2">
                    <input type="text" className="w-64 border-b-2 border-neutral-700 h-fit text-2xl tracking-[0.5em] overflow-hidden py-3 font-semibold font-mono text-black-900 text-center focus:outline-0" value={darpanId} onChange={(e) => {setDarpanId((e.target.value).toUpperCase())}}/>
                </div>
                <div className="mt-4 flex w-full items-center justify-center">
                    <button className="px-3 py-3 rounded-md bg-indigo-500 text-white-A700 font-medium">Apply For Verification</button>
                </div>
            </div>
        </Modal>
    )
}

export default VerificationModel;