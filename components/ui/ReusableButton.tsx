import React from "react";

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const ReusableButton = ({ text, onClick, icon}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2  bg-[#41ECC3]  opacity-100 text-black text-4xl p-5 mt-10"
    >
      {text && (
        <span className="text-[#000000]  text-[20px] leading-[100%] tracking-[5%] ">
          {text}
        </span>
      )}
      {icon && <span className="">{icon}</span>}
    </button>
  );
};

export default ReusableButton;

