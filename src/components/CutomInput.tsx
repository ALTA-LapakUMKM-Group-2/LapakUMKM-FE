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
      <label className="text-zinc-800 text-[16px] md:text-[16px] lg:text-[16px] 2xl:text-[18px] font-semibold" htmlFor={name}>
        {label}
      </label>

      <input
        id={id}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border-2 mt-2 border-lapak input input-success w-full max-w-full rounded-lg bg-zinc-100 px-4 font-normal text-zinc-800 placeholder-slate-400 disabled:bg-slate-400 text-[16px]"
        {...props}
      />
    </div>
  );
};

export default CustomInput;