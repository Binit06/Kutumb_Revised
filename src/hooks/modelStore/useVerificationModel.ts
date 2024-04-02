import { create } from "zustand"

interface VerificationModelStore {
    isOpen : boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useVerificationModel = create<VerificationModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useVerificationModel;