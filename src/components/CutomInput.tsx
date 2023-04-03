import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  name: string
  placeholder: string;
  type?: string;
  value?: string | number
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  classes?: string
}

const CustomInput = ({ id, label, name, type, placeholder, value, onChange, classes, ...props }: InputProps) => {
  return (
    <div>
      <label className="text-xs font-medium text-gray-700  text-[16px] md:text-[16px] lg:text-[16px] 2xl:text-[18px] dark:text-white" htmlFor={name}>
        {label}
      </label>

      <input
        id={id}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border-2 mt-2 overflow-x-scroll input w-full max-w-full  border-gray-400 focus-visible:border-transparent dark:border-gray-700 dark:bg-slate-800 rounded-lg
        focus:outline-none focus-visible:ring focus-visible:ring-lapak focus-visible:ring-opacity-75  
        bg-zinc-100 px-4 font-normal text-zinc-800 dark:text-slate-400 placeholder-slate-400 disabled:bg-slate-400 text-[16px]"
        {...props}
      />
    </div>
  );
};

export default CustomInput;