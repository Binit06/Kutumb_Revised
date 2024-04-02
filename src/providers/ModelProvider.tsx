"use client"

import VerificationModel from "@/hooks/modelUse/VerificationMode"
import { useEffect, useState } from "react"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted){
        return null
    }

    return(
        <div className="h-fit">
            <VerificationModel />
        </div>
    )
}

export default ModalProvider;