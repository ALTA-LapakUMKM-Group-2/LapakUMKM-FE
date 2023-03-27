import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: any
  label: string;
  size?: string
  loading?: boolean;
}

const CustomButton: FC<ButtonProps> = ({
  id,
  label,
  loading,
  size,
  ...props
}) => {
  return (
    <button
      id={id}
      disabled={loading}
      className={`rounded-xl bg-lapak w-full max-w-full ${size} px-6 py-2 text-[15px] md:text-[15px] lg:text-[14px] 2xl:text-[18px] font-semibold capitalize tracking-wider text-zinc-50 hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-zinc-400 ${loading && "cursor-not-allowed bg-zinc-400 text-zinc-800"
        }`}
      {...props}
    >
      {label}
    </button>
  );
};

export default CustomButton;
