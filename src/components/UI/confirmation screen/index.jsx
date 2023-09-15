import React from "react";
import { GiConfirmed } from "react-icons/gi";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";

export default function ConfirmDeactivate({ setDeactivateConfirmation, handleDeactivate, screenName }) {
//   const navigate = useNavigate();

//   const handleDeactivate = () => {
//     // sessionStorage.clear();
//     // navigate("/");
//   };
  return (
    <>
      <div className="bg-white p-8 w-[400px] h-[220px] rounded-md flex flex-col gap-4 md:mt-0 mt-48 items-center justify-center">
        <GiConfirmed className="w-[48px] h-[48px] text-[#38404b]" />
        <h4 className="text-gray-700 text-lg text-center">Are you sure you want to  <span className="!text-red-900 font-bold">{screenName}</span> this worker ?</h4>
        <div className="w-full flex gap-2">
          <Button
            title="cancel"
            className="w-full h-[56px] text-[#38404b] text-center rounded-2xl border border-[#D0D5DD]"
            backgroundColor="bg-none"
            textColor="#38404b"
            type="button"
            onClick={() => setDeactivateConfirmation(false)}
          />
          <Button
            title={screenName}
            className="w-full h-[56px] text-center rounded-2xl"
            backgroundColor="bg-[#38404b]"
            type="button"
            onClick={handleDeactivate}
          />
        </div>
      </div>
    </>
  );
}
