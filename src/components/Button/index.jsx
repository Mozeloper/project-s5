import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa6";

const Button = ({
  backgroundColor,
  showPlus = false,
  showExport = false,
  disabled,
  isLoading = false,
  textColor,
  title,
  onClick,
  className,
  style,
  size,
  type = "button",
  loadingText = "Please wait...",
}) => {
  return (
    <button
      className={`
            flex flex-row gap-2 items-center justify-center p-4 h-[41px] rounded font-medium leading-6 ${className}
            ${backgroundColor || "bg-[#000]"} 
            ${disabled ? "opacity-[0.3]" : "opacity-100"}
            ${isLoading ? "opacity-[0.3]" : "opacity-100"}
            ${
              size === "medium"
                ? "text-[48px]"
                : size === "small"
                ? "text-[36px]"
                : "56px"
            }
            ${textColor || "text-[#FFFFFF]"}
        `}
      onClick={onClick}
      style={style}
      type={type}
      disabled={disabled || isLoading}
    >
      {showPlus ? <AiOutlinePlus /> : null}
      {isLoading ? 
      <div className="flex items-center gap-3">
        <FaSpinner className="animate-spin" />
        {loadingText}
      </div> : 
      title}
    </button>
  );
};

export default Button;
