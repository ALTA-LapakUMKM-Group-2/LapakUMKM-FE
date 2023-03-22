import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  name: string
  placeholder: string;
  type?: string;
}

const CustomInput = ({ id, label, name, type, placeholder, ...props }: InputProps) => {
  return (
    <div>
      <label className="text-zinc-800 text-[18px] font-semibold" htmlFor={name}>
        {label}
      </label>

      <input
        id={id}
        placeholder={placeholder}
        type={type}
        name={name}
        className="border-2 mt-2 border-lapak input input-success w-full max-w-full rounded-lg bg-zinc-100 px-4 font-normal text-zinc-800 placeholder-slate-400 disabled:bg-slate-400 text-[16px]"
        {...props}
      />
    </div>
  );
};

export default CustomInput;