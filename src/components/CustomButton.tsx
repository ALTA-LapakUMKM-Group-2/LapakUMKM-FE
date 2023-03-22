import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  label: string;
  loading?: boolean;
}

const CustomButton: FC<ButtonProps> = ({
  id,
  label,
  loading,
  ...props
}) => {
  return (
    <button
      id={id}
      disabled={loading}
      className={`rounded-xl bg-lapak w-full max-w-full px-6 py-2 text-[18px] font-semibold capitalize tracking-wider text-zinc-50 hover:bg-green-400 hover:text-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400 ${loading && "cursor-not-allowed bg-zinc-400 text-zinc-800"
        }`}
      {...props}
    >
      {label}
    </button>
  );
};

export default CustomButton;
