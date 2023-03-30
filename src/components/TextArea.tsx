import { InputHTMLAttributes } from "react";

interface TextAreaProps {
    label: string;
    name: string;
    type?: string;
    value?: string;
    placeholder: string
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const TextArea: React.FC<TextAreaProps> = ({
    label,
    name,
    type,
    value,
    onChange,
    placeholder
}) => {
    return (
        <div className="mb-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-400 text-[16px] md:text-[16px] lg:text-[16px] 2xl:text-[18px] dark:text-white" htmlFor={name}>
                {label}
            </label>
            <textarea
                className="textarea border-2 mt-2 w-full max-w-full border border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-slate-800 rounded-lg
                focus:outline-none focus-visible:ring focus-visible:ring-lapak focus-visible:ring-opacity-75  
                bg-zinc-100 px-4 font-normal text-zinc-800 dark:text-slate-400 placeholder-slate-400 disabled:bg-slate-400 text-[16px]"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    )
}

export default TextArea;