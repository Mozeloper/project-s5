import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { GiConfirmed } from 'react-icons/gi';
import { useQueryClient } from 'react-query';
import { useModalToggle } from '../../../context/ConfirmationModal.context';
import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';
import Button from '../../Button';

export default function PromoteConvertToDti({ screenName, workerId }) {
  const queryClient = useQueryClient();
  const { setIsOpen } = useModalToggle();

  /**
   * Handler for closing the modal
   */
  const handleClose = () => {
    setIsOpen(false);
  };

  const [showConfirmationButton, setShowConfirmationButton] = useState(false);
  const [showForm, setshowForm] = useState(true);

  /**
   * Handler in charge of displaying the confirmation button
   * This function sends the form data to the server once the user
   * confirms their action
   */
  const passToConfirmation = () => {
    setshowForm(false);
    setShowConfirmationButton(true);
  };

  /**
   * Submit form action in charge of hadnling form inputs
   */
  const handleFormSubmit = async () => {
    try {
      const res = await api.post(
        `${appUrls.PROMOTE_CONVERT_TO_DTI}?convertId=${workerId}&status=DTI`
      );

      if (res?.status === 200) {
        // Convert promoted successfully
        toast.success('Convert was promoted successfully!', {
          duration: 3000,
        });

        // Close the modal
        handleClose();
        queryClient.invalidateQueries('GetAllNewBelievers');
      } else {
        // Convert promotion failed
        toast.error('An error occurred while promoting Convert.', {
          duration: 3000,
        });
      }
    } catch (error) {
      // Convert promotion failed
      toast.error('An error occurred while promoting Convert.', {
        duration: 3000,
      });
    }
  };

  return (
    <>
      {showForm && (
        <div className="bg-white p-8 md:w-[400px] min-h-[220px] rounded-md flex flex-col gap-4 md:mt-0 mt-2 items-center justify-center">
          <GiConfirmed className="w-[48px] h-[48px] text-green-500" />
          <h4 className="text-gray-700 text-lg text-center">
            Are you sure you want to{' '}
            <span className="!text-red-900 font-bold">{screenName}</span> this
            Convert ?
          </h4>
          <div>
            <Formik
              onSubmit={() => {
                passToConfirmation();
              }}
            >
              {() => (
                <Form className="flex flex-col gap-10">
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
                      type="submit"
                      onClick={passToConfirmation}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      {showConfirmationButton && (
        <div>
          <h3 className="mb-5">
            Are you sure you want to promote this Convert to DTI stage?
          </h3>
          <Button
            title="Confirm"
            className="w-full h-[56px] text-center rounded-2xl"
            backgroundColor="bg-[#38404b]"
            type="button"
            onClick={
              // Promote the worker.
              handleFormSubmit
            }
          />
        </div>
      )}
    </>
  );
}
