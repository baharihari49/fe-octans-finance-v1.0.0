import React, { FC } from "react";

interface ModalFooterProps {
    children: React.ReactNode;
}

export const ModalBodyFooter: FC<ModalFooterProps> = ({ children }) => {
    return (
        <div className="modal-footer">
            {children}
        </div>
    );
};
