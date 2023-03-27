import React, { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="max-h-full min-h-screen w-full overflow-auto ">
            <div className="h-full w-full overflow-auto bg-gray-100 dark:bg-slate-500">{children}</div>
        </div>
    );
};

export default Layout;
