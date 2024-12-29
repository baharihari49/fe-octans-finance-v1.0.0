import React from "react";

interface ModalBodyProps {
    children: React.ReactNode
}

export const ModalBody:React.FC<ModalBodyProps> = ({children}) => {
    return (
        <> 
             <div className="grid gap-4 py-4 border-b">
                {children}
            </div>
        </>
    )
}