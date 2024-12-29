import React from 'react';

type AuthLayoutProps = {
    children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md">{children}</div>
        </div>
    );
};

export default AuthLayout;
