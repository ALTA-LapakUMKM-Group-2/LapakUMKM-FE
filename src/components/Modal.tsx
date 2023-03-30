import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { HiOutlineXMark } from 'react-icons/hi2'
import { clsx } from "clsx";
import React, { Fragment } from "react";

interface DialogProps {
    isOpen: boolean;
    isClose?: React.MouseEventHandler;
    title?: string;
    children?: React.ReactNode;
    size?: string
}

const Modal: React.FC<DialogProps> = ({isOpen, isClose, title, children, size}) => {

    return (
    <DialogPrimitive.Root open={isOpen}>
        <DialogPrimitive.Portal forceMount>
            <Transition.Root show={isOpen}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <DialogPrimitive.Overlay
                forceMount
                className="fixed inset-0 z-20 backdrop-blur"
                />
            </Transition.Child>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <DialogPrimitive.Content
                forceMount
                className={clsx(
                    "fixed z-50",
                    `${size} rounded-lg p-4`,
                    "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                    "bg-white dark:bg-slate-700",
                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                )}
                >
                <DialogPrimitive.Title className="text-xl font-semibold ml-10 text-gray-900 dark:text-gray-100">
                    {title}
                </DialogPrimitive.Title>
                    {children}
                <DialogPrimitive.Close
                    className={clsx(
                    "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                    )}
                    onClick={isClose}
                >
                    <HiOutlineXMark className="h-8 w-8 text-gray-500 hover:text-lapak dark:hover:text-lapak dark:text-gray-500" />
                </DialogPrimitive.Close>
                </DialogPrimitive.Content>
            </Transition.Child>
            </Transition.Root>
        </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
    );
};

export default Modal;