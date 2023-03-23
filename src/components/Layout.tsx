import React, { FC } from "react";

interface Props {
    children: React.ReactNode
    image?: string | any
}

const Layout: FC<Props> = ({ children, image }) => {
    {
        return (
            <div className={`flex flex-col justify-center items-center w-full h-full bg-gray-100  ${image}`}>
                {children}
            </div>
        )
    }
};

export default Layout;