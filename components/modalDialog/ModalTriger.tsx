import * as Dialog from "@radix-ui/react-dialog";
import React from "react";


interface ModalTrigerProps {
    children: React.ReactNode
}

export const ModalTriger:React.FC<ModalTrigerProps> = ({
    children
}) => {
    return (
        <>
            <Dialog.Trigger asChild>
               {children}
            </Dialog.Trigger>
        </>
    )
}