import React from 'react'
import { GiConfirmed } from 'react-icons/gi'
import { useModalToggle } from '../../../context/ConfirmationModal.context'
import Button from '../../Button'
import { BsFillExclamationTriangleFill } from 'react-icons/bs';


export default function ConfirmDeactivate({ handleDeactivate, name = null, screenName }) {
    const { closeModal } = useModalToggle();


  const handleClose = () => {
    closeModal();
  };

  const handleConfirm = () => {
    closeModal();
    handleDeactivate();
  };

  return (
    <>
      <div className="bg-white p-8 md:w-[400px] min-h-[220px] rounded-md flex flex-col gap-4 md:mt-0 mt-2 items-center justify-center">
        <BsFillExclamationTriangleFill className="w-[48px] h-[48px] text-yellow-400" />
        <h4 className="text-gray-700 text-lg text-center mb-5">
          Are you sure you want to{' '}
          <span className="!text-yellow-400 font-semibold lowercase">{screenName}</span>{' '}
          <span className="!text-red-900 font-bold">
            {`${name}'s ` || 'this '}
          </span>
          account ?
        </h4>
        <div className="w-full flex gap-2">
          <Button
            title="cancel"
            className="w-full h-[56px] text-[#38404b] text-center rounded-2xl border border-[#D0D5DD]"
            backgroundColor="bg-none"
            textColor="#38404b"
            type="button"
            onClick={handleClose}
          />
          <Button
            title={screenName}
            className="w-full h-[56px] text-center rounded-2xl"
            backgroundColor="bg-[#38404b]"
            type="button"
            onClick={handleConfirm}
          />
        </div>
      </div>
    </>
  );
}
