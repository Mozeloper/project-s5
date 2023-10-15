import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../../../components/Button';
import SearchableSelect from '../../../../components/CustomSelect';
import { api } from '../../../../services/api';
import { appUrls } from '../../../../services/urls';
import { formatToISODate } from '../../../../utils';

export default function ChurchInformation({
  userValues,
  setUserValues,
  // setCurrentStep,
}) {
  const navigate = useNavigate();
  //make sure the user can not put a date passed the current year in the year joined input
  const currentYear = new Date().getFullYear();
  const [isLoading, setIsLoading] = useState({
    getChurchDept: false,
    register: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [dept, setDept] = useState([]);

  const signupSchema = Yup.object().shape({
    yearJoined: Yup.number()
      .required('Input Year You Joined Church')
      .min(2010, 'Year Joined should be greater than or equal to 2010')
      .max(currentYear, `Year Joined cannot be greater than ${currentYear}`), // Optional: Add a maximum year constraint

    departmentId: Yup.number().required('Select Department'),
  });

  const handleRegisterUser = async (values) => {
    setIsLoading((prev) => ({
      ...prev,
      register: true,
    }));
    // const formattedDate = moment(userValues?.dateOfBirth).format(
    //   'YYYY-MM-DDTHH:mm:ss.SSS[Z]'
    // );

    // Format the date using native JavaScript Date
    const formattedDateOfBirth = formatToISODate(userValues?.dateOfBirth);

    const payload = {
      ...userValues,
      dateOfBirth: formattedDateOfBirth,
      ...values, // Include the form values
    };
    try {
      const res = await api.post(appUrls.REGISTER, payload);
      if (res?.status === 201) {
        toast.success(res?.data?.message, {
          icon: '👏',
          duration: 3000,
        });
        navigate('/');
      }
    } catch (error) {
      const errorMessage = error?.data?.message || 'An Error Occured';
      toast.error(errorMessage, {
        duration: 5000,
      });
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        register: false,
      }));
    }
  };

  const getChurhDept = async () => {
    setIsLoading((prev) => ({
      ...prev,
      getChurchDept: true,
    }));
    try {
      const res = await api.get(appUrls.GETCHURCHDEPT);
      if (res?.status === 200) {
        // let data = [];
        const result = res?.data?.Data || [];
        //   for (let index = 0; index < result.length; index++) {
        //     data.push({
        //       label: result[index]?.DepartmentalNames,
        //       value: result[index]?.Id,
        //     });
        //   }
        //   setDept((prev) => [...data]);
        // }
        const data = result.map((item) => ({
          label: item.DepartmentalNames,
          value: item.Id,
        }));
        setDept(data);
      }
    } catch (error) {
      toast.error('An Error Occured while getting church dept...', {
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
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        getChurhDept();
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-full h-full">
      <h2 className="font-black text-center text-2xl md:text-secondary text-white mb-4">
        Church Information
      </h2>
      <Formik
        initialValues={{
          yearJoined: userValues?.yearJoined || '',
          departmentId: userValues?.departmentId || '',
        }}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          setUserValues((prev) => ({ ...prev, ...values }));
          handleRegisterUser(values);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          setFieldValue,
          isValid,
        }) => (
          <Form onSubmit={handleSubmit} className="mt-3 w-full">
            <div className="w-full flex flex-col-reverse gap-2">
              <div className="w-full mt-2">
                <label
                  className="text-sm md:text-black text-white leading-4"
                  htmlFor="departmentId"
                >
                  Church dept{' '}
                  <span className="text-yellow-500 md:text-primary ml-1">
                    *
                  </span>
                </label>
                <SearchableSelect
                  options={dept}
                  name="departmentId"
                  id="departmentId"
                  isLoading={isLoading?.getChurchDept}
                  value={values.departmentId}
                  setFieldValue={(name, value) => {
                    setFieldValue(name, value);
                    // Check form validity and update isFormValid accordingly
                    setIsFormValid(!!values.yearJoined && !!value);
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
              <div className="mb-1 w-full">
                <label
                  htmlFor="yearJoined"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Year Joined Church{' '}
                  <span className="text-yellow-500 md:text-primary ml-1">*</span>
                </label>
                <input
                  type="number"
                  name="yearJoined"
                  id="yearJoined"
                  min="2010"
                  max={`${currentYear}`}
                  step="1"
                  className={`w-full h-[40px] border border-secondary text-base px-4 rounded mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Year Joined Church"
                  onChange={handleChange}
                  value={values?.yearJoined}
                />
                {errors.yearJoined && touched.yearJoined ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.yearJoined}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex justify-end w-full">
              <Button
                disabled={!isFormValid}
                title="Submit"
                className="w-[200px] h-[56px] text-center mt-5 md:mb-4 mb-10"
                backgroundColor="bg-primary"
                type="submit"
                isLoading={isLoading?.register}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
