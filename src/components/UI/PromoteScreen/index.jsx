import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { GiConfirmed } from 'react-icons/gi';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useModalToggle } from '../../../context/ConfirmationModal.context';
import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';
import Button from '../../Button';
import SearchableSelect from '../../CustomSelect';

export default function PromoteScreen({ screenName, workerId }) {
  const queryClient = useQueryClient();
  const { closeModal } = useModalToggle();

  /**
   * Hook for Closing the modal
   */
  const handleClose = () => {
    closeModal();
  };

  const [isLoading, setIsLoading] = useState({
    getChurchDept: false,
  });
  const [showConfirmationButton, setShowConfirmationButton] = useState(false);
  const [showForm, setshowForm] = useState(true);
  const [dept, setDept] = useState([]);
  const [userValues, setUserValues] = useState({});
  const [formValues, setFormValues] = useState({
    departmentId: '',
  });
  const [submittingForm, setsubmittingForm] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [departmentID, setdepartmentID] = useState('');

  const addSoulSchema = Yup.object().shape({
    departmentId: Yup.number().required('Select Department'),
  });

  /**
   * Get Church Departments from the server
   */
  const getChurhDept = async () => {
    setIsLoading((prev) => ({
      ...prev,
      getChurchDept: true,
    }));
    try {
      const res = await api.get(appUrls.GETCHURCHDEPT);
      if (res?.status === 200) {
        //let data = [];
        const result = res?.data?.Data || [];

        //console.log(result);

        // for (let index = 0; index < result.length; index++) {
        //   data.push({
        //     label: result[index]?.DepartmentalNames,
        //     value: result[index]?.id,
        //   });
        // }
        // setDept((prev) => [...data]);
        const data = result.map((item) => ({
          label: item.DepartmentalNames,
          value: item.Id,
        }));
        setDept(data);
      }
    } catch (error) {
      toast.error('An Error Occurred while getting church dept...', {
        duration: 3000,
      });
      setDept([]);
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        getChurchDept: false,
      }));
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getChurhDept();
    }
    return () => {
      mounted = false;
    };
  }, []);

  /**
   * Handler that sends the payload to the server
   * when the user makes confirmation
   */
  const passToConfirmation = () => {
    setshowForm(false);
    setShowConfirmationButton(true);
  };

  /**
   * This handles all form inputs
   * @param {Object} formValues
   */
  const handleFormSubmit = async () => {
    console.log(userValues);
    //console.log(formValues.departmentId);
    setsubmittingForm(true);
    try {
      const res = await api.post(appUrls.PROMOTE_CONVERT_TO_MINISTRY, {
        id: workerId,
        departmentId: userValues.departmentId,
        status: 'Ministry',
      });

      if (res?.status === 200) {
        // Worker promoted successfully
        toast.success('Worker promoted successfully!', {
          duration: 3000,
        });
        queryClient.invalidateQueries('DtiConverts');
        queryClient.invalidateQueries('GetAllMinisters');
        // Close the modal
        handleClose();
      } else {
        // Worker promotion failed
        toast.error('An error occurred while promoting worker.', {
          duration: 3000,
        });
      }
    } catch (error) {
      // Worker promotion failed
      toast.error('An error occurred while promoting worker.', {
        duration: 3000,
      });
    } finally {
      setsubmittingForm(false);
    }
  };

  return (
    <>
      <div className="bg-white p-8 md:w-[400px] min-h-[220px] rounded-md flex flex-col gap-4 md:mt-0 mt-2 items-center justify-center">
        {showForm && (
          <>
            <GiConfirmed className="w-[48px] h-[48px] text-green-500" />
            <h4 className="text-gray-700 text-lg text-center">
              Are you sure you want to{' '}
              <span className="!text-red-900 font-bold">{screenName}</span> this
              worker ?
            </h4>
            <div>
              <Formik
                initialValues={{
                  departmentId: '',
                }}
                validationSchema={addSoulSchema}
                //onSubmit={handleFormSubmit}
                onSubmit={(values) => {
                  //setFormValues(values);
                  setUserValues((prev) => ({ ...prev, ...values }));
                  //handleFormSubmit(values);
                  passToConfirmation();
                }}
              >
                {({
                  handleChange,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                }) => (
                  <Form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-10"
                  >
                    <div className="w-full mt-2">
                      <label
                        className="text-sm md:text-black text-white leading-4"
                        htmlFor="departmentId"
                      >
                        Church dept <span className="text-primary ml-1">*</span>
                      </label>
                      <SearchableSelect
                        options={dept}
                        name="departmentId"
                        id="departmentId"
                        isLoading={isLoading?.getChurchDept}
                        value={values.departmentId}
                        setFieldValue={(label, value) => {
                          setFieldValue(label, value);
                          setFormValues({ departmentId: value }); // Update formValues
                          // Check form validity and update isFormValid accordingly
                          setIsFormValid(!!value);
                        }}
                        className="w-full outline-none"
                        placeholder="Select department"
                      />
                      {errors.departmentId && touched.departmentId ? (
                        <div className="text-xs mt-2 text-red-700">
                          {errors.departmentId}
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
                        disabled={!isFormValid}
                        title={screenName}
                        className="w-full h-[56px] text-center rounded-2xl"
                        backgroundColor="bg-[#38404b]"
                        type="submit"
                        //onClick={passToConfirmation}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </>
        )}

        {showConfirmationButton && (
          <div>
            <h3 className="mb-5 min-h-[180px]">
              Are you sure you want to promote this Convert?
            </h3>
            <Button
              isLoading={submittingForm}
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
      </div>
    </>
  );
}
