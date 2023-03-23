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
            <label className="text-zinc-800 text-[18px] font-semibold" htmlFor={name}>
                {label}
            </label>
            <textarea
                className="textarea textarea-lapak border-lapak w-full"
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