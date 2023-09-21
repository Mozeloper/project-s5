import React, { useState} from 'react';
import { Form, Formik } from 'formik';
import Button from '../../Button';
import * as Yup from 'yup';
import SearchableSelect from '../../CustomSelect';
import { toast } from 'react-hot-toast';
import { appUrls } from '../../../services/urls';
import { api } from '../../../services/api';
import { phoneRegExp } from '../../../utils';
export default function AddSoulsFormControl() {
  // payload for newconvert
  //     {
  //   "surname": "string",
  //   "firstName": "string",
  //   "email": "string",
  //   "gender": "Male",
  //   "address": "string",
  //   "phoneNumber": "string",
  //   "nearestBusStop": "string"
  // }

  const [isLoading, setIsLoading] = useState(false);

  const addSoulSchema = Yup.object().shape({
    firstName: Yup.string().required('Firstname is Required'),
    surName: Yup.string().required('Surname is Required'),
    phoneNumber: Yup.string().required('Phone Number is Required')
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number is Required'),
    email: Yup.string().email('Not a proper email'),
    gender: Yup.number().required('Gender is Required'),
    address: Yup.string(),
    nearestBusStop: Yup.string().required('Nearest Bus Stop is Required'),
  });

    const handleAddSoul = async (values) => {
      setIsLoading(true);
      const payload = {
        surname: values?.surName,
        firstName: values?.firstName,
        email: values?.email,
        phoneNumber: values?.phoneNumber,
        gender: values?.gender,
        address: values?.address,
        nearestBusStop: values?.nearestBusStop,
      };
      console.log(payload)
      try {
        const res = await api.post(appUrls.ADD_NEW_CONVERT, payload);
        if (res?.status === 200) {
          toast.success("Soul was Succefully Added", { duration: 5000, })
        }
      } catch (error) {
        const errorMessage = error?.data?.message || 'Something went wrong, please try again';
        toast.error(errorMessage, {
          duration: 5000,
        });
        setIsLoading(false);
      }
    };

  return (
    <Formik
      initialValues={{
        firstName: '',
        surName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        address: '',
        nearestBusStop: '',
      }}
      validationSchema={addSoulSchema}
      onSubmit={(values) => {
        handleAddSoul(values);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        setFieldValue,
        values,
        touched,
        errors,
        dirty,
        isValid,
      }) => (
        <Form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                style={{ color: '#6B6B6B' }}
                type="text"
                name="surName"
                id="surName"
                className="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleChange}
                value={values?.surName}
              />
              {errors.surName && touched.surName ? (
                <div className="text-xs mt-2 text-red-700">
                  {errors.surName}
                </div>
              ) : null}
              <label
                htmlFor="surName"
                className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Surname
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                style={{ color: '#6B6B6B' }}
                type="text"
                name="firstName"
                id="firstName"
                className="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleChange}
                value={values?.firstName}
              />
              {errors.firstName && touched.firstName ? (
                <div className="text-xs mt-2 text-red-700">
                  {errors.firstName}
                </div>
              ) : null}
              <label
                htmlFor="firstName"
                className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                style={{ color: '#6B6B6B' }}
                type="tel"
                pattern="^\d{11}$"
                name="phoneNumber"
                id="phoneNumber"
                className="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleChange}
                value={values?.phoneNumber}
              />
              {errors.phoneNumber && touched.phoneNumber ? (
                <div className="text-xs mt-2 text-red-700">
                  {errors.phoneNumber}
                </div>
              ) : null}
              <label
                htmlFor="phoneNumber"
                className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number (08012345678)
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                style={{ color: '#6B6B6B' }}
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Email"
                onChange={handleChange}
                value={values?.email}
              />
              {errors.email && touched.email ? (
                <div className="text-xs mt-2 text-red-700">{errors.email}</div>
              ) : null}
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="gender"
              className="block mb-2 text-base font-medium text-gray-900 "
            >
              Gender <span className="text-primary ml-1">*</span>
            </label>
            <SearchableSelect
              options={[
                { label: 'Male', value: 0 },
                { label: 'Female', value: 1 },
              ]}
              name="gender"
              id="gender"
              value={values.gender}
              setFieldValue={(name, value) => setFieldValue(name, value)}
              className="w-full outline-none"
              placeholder="Select gender"
            />
            {errors.gender && touched.gender ? (
              <div className="text-xs mt-2 text-red-700">{errors.gender}</div>
            ) : null}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              style={{ color: '#6B6B6B' }}
              type="text"
              name="address"
              id="address"
              className="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleChange}
              value={values?.address}
            />
            <label
              htmlFor="address"
              className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              style={{ color: '#6B6B6B' }}
              type="text"
              name="nearestBusStop"
              id="nearestBusStop"
              className="block py-2.5 px-0 w-full text-gray-900 text-base bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleChange}
              value={values?.nearestBusStop}
            />
            <label
              htmlFor="nearestBusStop"
              className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nearest Bus Stop
            </label>
          </div>
          <Button
            title="Submit"
            className="w-[200px] h-[56px] text-center mt-3 md:mb-4 mb-10 rounded-2xl"
            backgroundColor="bg-primary"
            type="submit"
            isLoading={isLoading}
          />
          {/* <button
            type="submit"
            className="text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center bg-[#38404b]"
          >
            Submit
          </button> */}
        </Form>
      )}
    </Formik>
  );
}
