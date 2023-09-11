import React, { useState } from "react";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BsFillEyeFill } from "react-icons/bs";

export default function PasswordField({
  labelName,
  className,
  name,
  isValid,
  placeholder = "password",
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <label
        htmlFor={name}
        className={`text-sm leading-4 mt-4 md:text-secondary text-secondary`}
      >
        {labelName || "Password"} <span className="text-primary ml-1">*</span>
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name || "password"}
          id={name || "password"}
          className={`block w-full h-[56px] text-black text-base px-4 border ${
            isValid ? "border-secondary" : "border-secondary"
          } rounded-lg mt-2 outline-none ${className}`}
          placeholder={placeholder}
          {...rest}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {showPassword ? (
            <BsFillEyeSlashFill
              className={`h-5 w-5 text-gray-500 cursor-pointer  ${
                isValid ? "text-secondary" : "text-secondary"
              }`}
              onClick={togglePasswordVisibility}
            />
          ) : (
            <BsFillEyeFill
              className={`h-5 w-5 text-gray-500 cursor-pointer ${
                isValid ? "text-secondary" : "text-secondary"
              }`}
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
      </div>
    </>
  );
}
