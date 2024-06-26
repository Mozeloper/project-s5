import React, { useState } from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { useModalToggle } from '../../../context/ConfirmationModal.context';
import Button from '../../Button';

const SuspendConvert = ({ handleDeactivate, screenName }) => {
  const { closeModal } = useModalToggle();
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [SuspensionReason, setSuspensionReason] = useState('');

  const handleClose = () => {
    closeModal();
  };

  const handleConfirm = () => {
    closeModal();
    
    handleDeactivate(SuspensionReason);
    setSuspensionReason('')
  };

  return (
    <>
      {!confirmDeletion ? (
        <div className="bg-white p-8 md:w-[400px] min-h-[220px] rounded-md flex flex-col gap-4 md:mt-0 mt-2 items-center justify-center">
          <BsFillExclamationTriangleFill className="w-[48px] h-[48px] text-yellow-500" />
          <h2>
            You are about to{' '}
            <span className="!text-yellow-500 font-bold"> Disable </span> Account
          </h2>
          <h4 className="text-gray-700 text-lg text-center">
            Are you sure you want to continue ?
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
              title="Proceed"
              className="w-full h-[56px] text-center rounded-2xl"
              backgroundColor="bg-[#38404b]"
              type="button"
              onClick={() => setConfirmDeletion(true)}
            />
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 md:w-[400px] min-h-[220px] rounded-md flex flex-col gap-4 md:mt-0 mt-2 items-center justify-center">
          <form>
            <div className="w-full mb-5">
              <label
                htmlFor="reason"
                className="text-gray-700 text-lg text-center"
              >
                Kindly State Your Reason:
                <textarea
                  minLength="6"
                  id="reason"
                  name="reason"
                  className="mt-2 border-2 w-full border-primary rounded-md"
                  onChange={(e) => setSuspensionReason(e.target.value)}
                />
              </label>
            </div>
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
          </form>
        </div>
      )}
    </>
  );
};

export default SuspendConvert;
