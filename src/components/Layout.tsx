import React, { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="h-screen w-full overflow-auto ">
            <div className="h-full w-full overflow-auto bg-gray-100 dark:bg-slate-800">{children}</div>
        </div>
    );
};

export default Layout;
