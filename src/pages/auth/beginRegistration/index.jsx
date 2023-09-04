import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/icons/logo.png";
import Button from "../../../components/Button";

export default function BeginRegistration() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex md:items-center md:pt-0 pt-16  xl:px-36 lg:px-16 md:px-4 px-2">
      <div className="2xl:w-[65%] xl:w-[75%] lg:w-[100%] w-full flex flex-col gap-4 cursor-pointer">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="logo"
          className="w-[100px] h-[100px]"
        />
        <h2 className="text-4xl font-black md:text-secondary text-white leading-9">
          Welcome to Project 5s portal
        </h2>
        <p className="md:text-textDark_200 text-white font-normal text-lg leading-7">
          Please be informed that to successfully create an account, you need to
          be a member of the TPHOL'S workforce.
        </p>
        <p className="md:text-textDark_200 text-white font-normal text-lg mb-3 leading-7">
          Kindly click the button below to begin the registraion process.
        </p>
        <div className="flex md:flex-row flex-col gap-3">
          <Button
            onClick={() => navigate("/sign-up")}
            title="Begin Registration"
            backgroundColor="bg-primary"
          />

          <Button
            onClick={() => navigate("/")}
            title="Login"
            backgroundColor="bg-none"
            className="md:w-[180px] w-full border border-primary"
            textColor="md:text-primary text-white"
          />
        </div>
      </div>
    </div>
  );
}
