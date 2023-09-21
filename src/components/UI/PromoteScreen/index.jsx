import { GiConfirmed } from 'react-icons/gi';
import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../../Button';
import SearchableSelect from '../../CustomSelect';
import { api } from '../../../services/api';
import { toast } from 'react-hot-toast';
import { appUrls } from '../../../services/urls';

export default function PromoteScreen({
  setDeactivateConfirmation,
  screenName,
  workerId,
}) {
  const [isLoading, setIsLoading] = useState({
    getChurchDept: false,
  });
  const [showConfirmationButton, setShowConfirmationButton] = useState(false);
  const [showForm, setshowForm] = useState(true);
  const [dept, setDept] = useState([]);

  const [formValues, setFormValues] = useState({
    departmentId: '',
  });

  const addSoulSchema = Yup.object().shape({
    departmentId: Yup.number().required('Select Department'),
  });

  const getChurhDept = async () => {
    setIsLoading((prev) => ({
      ...prev,
      getChurchDept: true,
    }));
    try {
      const res = await api.get(appUrls.GETCHURCHDEPT);
      if (res?.status === 200) {
        let data = [];
        const result = res?.data?.data || [];
        for (let index = 0; index < result.length; index++) {
          data.push({
            label: result[index]?.departmentalNames,
            value: result[index]?.id,
          });
        }
        setDept((prev) => [...data]);
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

  const handleFormSubmit = async (values) => {
    console.log(values)
    try {
      const res = await api.post(appUrls.PROMOTE_CONVERT_TO_MINISTRY, {
        id: workerId,
        departmentId: values?.departmentId,
        status: 'Ministry',
      });

      if (res?.status === 200) {
        // Worker promoted successfully
        toast.success('Worker promoted successfully!', {
          duration: 3000,
        });
        // Close the modal
        setDeactivateConfirmation(false);
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
    }
  };

  return (
    <>
      {showForm && (
        <div className="bg-white p-8 w-[400px] h-[220px] rounded-md flex flex-col gap-4 md:mt-0 mt-48 items-center justify-center">
          <GiConfirmed className="w-[48px] h-[48px] text-green-500" />
          <h4 className="text-gray-700 text-lg text-center">
            Are you sure you want to{' '}
            <span className="!text-red-900 font-bold">{screenName}</span> this
            worker ?
          </h4>
          <div>
            <Formik
              initialValues={formValues}
              validationSchema={addSoulSchema}
              onSubmit={(values) => {
                //handleFormSubmit(values);
                setFormValues(values);
                setshowForm(false);
                setShowConfirmationButton(true);
              }}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form>
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
                      setFieldValue={(name, value) =>
                        setFieldValue(name, value)
                      }
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
                      onClick={() => setDeactivateConfirmation(false)}
                    />
                    <Button
                      title={screenName}
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
      {showConfirmationButton && (
        <div>
          <h3 className='mb-5'>Are you sure you want to promote this Convert?</h3>
          <Button
            title="Confirm"
            className="w-full h-[56px] text-center rounded-2xl"
            backgroundColor="bg-[#38404b]"
            type="button"
            onClick={async () => {
              // Promote the worker.
              await handleFormSubmit(formValues);
            }}
          />
        </div>
      )}
    </>
  );
}