import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { GiConfirmed } from 'react-icons/gi';
import * as Yup from 'yup';
import { useModalToggle } from '../../../context/ConfirmationModal.context';
import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';
import Button from '../../Button';
import SearchableSelect from '../../CustomSelect';
import { promoteAWorker } from '../../../services/worker.api';


export default function PromoteWorkerToAdmin({ screenName, workerId, promoteCallback }) {

  const { closeModal } = useModalToggle();

  const handleClose = () => {
    closeModal();
  };



  const [showConfirmationButton, setShowConfirmationButton] = useState(false);
  const [showForm, setshowForm] = useState(true);
  const role = [
    { label: 'Admin', value: 'SuperAdmin' },
    { label: 'Ministry Admin', value: 'MinistryAdmin' },
    { label: 'DTI Admin', value: 'DTIAdmin' },
    { label: 'New Believers Admin', value: 'NewConvertAdmin' },
  ];

  const [formValues, setFormValues] = useState({
    adminRole: '',
    userId: `${workerId}`,
  });

  const addAdminSchema = Yup.object().shape({
    adminRole: Yup.string().required('You need to Select A Role'),
  });



  const passToConfirmation = () => {
      setshowForm(false);
      setShowConfirmationButton(true);
  };

    const handleAdminRoleChange = (selectedOption) => {
      setFormValues((prev) => ({ ...prev, adminRole: selectedOption.value }));
    };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues, workerId);

    try {
      const res = await promoteAWorker(formValues.userId, formValues.adminRole);
      console.log(res)
      // if (res?.status === 200) {
      //   // Close the modal
      //   //handleClose();
      // }
      promoteCallback();
      handleClose();
    } catch (error) {
      // Worker promotion failed
      toast.error('An error occurred while promoting worker.', {
        duration: 3000,
      });
    }
  };


  return (
    <>
      {showConfirmationButton && (
        <div className="bg-white p-8 md:w-[400px] min-h-[220px] rounded-md flex flex-col gap-4 md:mt-0 mt-2 items-center justify-center">
          <GiConfirmed className="w-[48px] h-[48px] text-green-500" />
          <h4 className="text-gray-700 text-lg text-center">
            Please select the 
            <span className="!text-red-900 font-bold"> role</span> to want to
            assign to this worker.
          </h4>
          <div>
            <Formik
              initialValues={formValues}
              validationSchema={addAdminSchema}
              onSubmit={(values) => {
                setFormValues((prev) => ({ ...prev, ...values }));
                //handleFormSubmit();
                console.log(formValues)
              }}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form
                 onSubmit={handleFormSubmit}
                //  onSubmit={(e) => {e.preventDefault()
                // console.log(formValues)}}
                  className="flex flex-col gap-10"
                >
                  <div className="w-full mt-2">
                    <label
                      className="text-sm md:text-black text-white leading-4"
                      htmlFor="roleId"
                    >
                      Admin Roles <span className="text-primary ml-1">*</span>
                    </label>
                    <SearchableSelect
                      options={role}
                      name="roleId"
                      id="roleId"
                      isLoading={false}
                      value={values.adminRole}
                      onChange={handleAdminRoleChange}
                      className="w-full outline-none"
                      placeholder="Select department"
                    />
                    {errors.adminRole && touched.adminRole ? (
                      <div className="text-xs mt-2 text-red-700">
                        {errors.adminRole}
                      </div>
                    ) : null}
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
                      title="Proceed"
                      className="w-full h-[56px] text-center rounded-2xl"
                      backgroundColor="bg-[#38404b]"
                      type="submit"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      {showForm && (
        <div>
          <GiConfirmed className="w-[48px] h-[48px] text-green-500" />
          <h4 className="text-gray-700 text-lg text-center">
            Are you sure you want to{' '}
            <span className="!text-red-900 font-bold">{screenName}</span> this
            worker ?
          </h4>
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
            onClick={() => passToConfirmation()}
          />
        </div>
      )}
    </>
  );
}
