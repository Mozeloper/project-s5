import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Button from '../Button';
import { appUrls } from '../../services/urls';
import { api } from '../../services/api';
import { toast } from 'react-hot-toast';
import SearchableSelect from '../CustomSelect';

export default function EditConvertDetails({
  setOpenModal,
  data,
  // handleConvertUpdate,
}) {
  const updateConvertSchema = Yup.object().shape({
    email: Yup.string(),
    firstName: Yup.string().required('First Name is required'),
    surName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string().required('Address is required'),
    nearestBusStop: Yup.string(),
    maritalStatus: Yup.string(),
    employmentStatus: Yup.string(),
    qualification: Yup.string(),
    countryName: Yup.string(),
    stateName: Yup.string(),
    city: Yup.string(),
    yearJoined: Yup.number(),
  });

  const handleUpdateConvert = async (payload, actions) => {
    try {
      const res = await api.post(appUrls.UPDATE_CONVERT, payload);
      if (res?.status === 200) {
        // handleConvertUpdate();
        setOpenModal(false);
        toast.success('Updated Successful', {
          icon: '👏',
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(error?.data?.message, 4);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1000px] w-[1000px] max-h-[80vh] min-h-[680px] md:h-auto h-full bg-white p-[2%] rounded-lg overflow-y-auto overflow-x-hidden">
      <div className="flex justify-end w-full">
        <AiOutlineCloseCircle
          className="cursor-pointer w-[30px] h-[30px] text-secondary"
          onClick={() => setOpenModal(false)}
        />
      </div>
      <h2 className="mb-4 font-bold first-letter:text-3xl first-letter:font-bold text-normal text-lg leading-7">
        Update Convert Information
      </h2>
      <Formik
        initialValues={{
          surname: data?.Surname || '',
          firstName: data?.FirstName || '',
          email: data?.Email || '',
          address: data?.Address || '',
          phoneNumber: data?.PhoneNumber || '',
          gender: data?.Gender || 'Male',
          nearestBusStop: data?.NearestBusStop || '',
          maritalStatus: data?.MaritalStatus || 'Single',
          employmentStatus: data?.EmploymentStatus || null,
          qualification: data?.Qualification || 'LeavingSchoolCertificate',
          countryName: data?.CountryName || '',
          stateName: data?.StateName || '',
          additionalInformation: '',
          city: data?.City || '',
          yearJoined: data?.YearJoined || 0,
        }}
        //validationSchema={updateConvertSchema}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          console.log(values);
          const payload = {
            surname: values?.surname,
            firstName: values?.firstName,
            email: data?.Email,
            address: values?.address,
            phoneNumber: values?.phoneNumber,
            gender: data?.Gender,
            nearestBusStop: values?.nearestBusStop,
            maritalStatus: values?.maritalStatus,
            employmentStatus: values?.employmentStatus,
            qualification: values?.qualification,
            countryName: values?.countryName,
            stateName: values?.stateName,
            additionalInformation: values?.additionalInformation,
            city: values?.city,
            yearJoined: values?.yearJoined,
          };
          handleUpdateConvert(payload, actions);
        }}
      >
        {({
          handleSubmit,
          setFieldValue,
          handleChange,
          values,
          isSubmitting,
          touched,
          errors,
        }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <h3 className="font-bold mt-5 text-primary">
              Personal Information
            </h3>
            <div className="w-full flex md:flex-row flex-col gap-3">
              <div className="w-full flex flex-col">
                <label
                  className="text-sm text-black leading-4"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={`w-full h-[41px] text-sm px-4 border border-secondary rounded-lg mt-2 outline-none bg-grey700 read-only:cursor-not-allowed disabled:cursor-not-allowed`}
                  placeholder="First Name"
                  onChange={handleChange}
                  value={values?.firstName}
                />
                {errors.firstName && touched.firstName ? (
                  <div className="text-xs text-red-700">{errors.firstName}</div>
                ) : null}
              </div>
              <div className="w-full flex flex-col">
                <label
                  className="text-sm text-black leading-4"
                  htmlFor="surname"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  className={`w-full h-[41px] text-sm px-4  border border-secondary rounded-lg mt-2 outline-none bg-grey700 read-only:cursor-not-allowed disabled:cursor-not-allowed`}
                  placeholder="Last Name"
                  onChange={handleChange}
                  value={values?.surname}
                />
                {errors.surname && touched.surname ? (
                  <div className="text-xs text-red-700">{errors.surname}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:flex-row flex-col gap-3">
              <div className="w-full flex flex-col">
                <label className="text-sm text-black leading-4" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={`w-full h-[41px] text-sm px-4  border border-secondary rounded-lg mt-2 outline-none bg-grey700 read-only:cursor-not-allowed disabled:cursor-not-allowed`}
                  placeholder="email Address"
                  onChange={handleChange}
                  value={values?.email}
                />
                {errors.email && touched.email ? (
                  <div className="text-xs text-red-700">{errors.email}</div>
                ) : null}
              </div>
              <div className="w-full flex flex-col">
                <label
                  className="text-sm text-black leading-4"
                  htmlFor="phoneNumber"
                >
                  Phone number
                </label>
                <input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  className={`w-full h-[41px] text-sm px-4  border border-secondary rounded-lg mt-2 outline-none bg-grey700`}
                  placeholder="Enter Phone Number"
                  onChange={handleChange}
                  value={values?.phoneNumber}
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className="text-xs text-red-700">
                    {errors.phoneNumber}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:flex-row flex-col gap-3">
              {/* <div className="w-full">
                <label className="text-sm ext-black leading-4" htmlFor="gender">
                  Gender
                </label>
                <SearchableSelect
                  options={[
                    { label: 'Male', value: 0 },
                    { label: 'Female', value: 1 },
                  ]}
                  name="gender"
                  id="gender"
                  isDisabled={true}
                  value={values.gender}
                  setFieldValue={(name, value) => setFieldValue(name, value)}
                  className="w-full outline-none"
                  placeholder="Select Gender"
                  defaultValue={data?.Gender}
                />
                {errors.gender && touched.gender ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.gender}
                  </div>
                ) : null}
              </div> */}
              <div className="w-full">
                <label
                  className="text-sm ext-black leading-4"
                  htmlFor="maritalStatus"
                >
                  Marital Status
                </label>
                <SearchableSelect
                  options={[
                    {
                      label: 'Married',
                      value: 'Married',
                    },
                    {
                      label: 'Single',
                      value: 'Single',
                    },
                    {
                      label: 'Divorced',
                      value: 'Divorced',
                    },
                    {
                      label: 'Widowed',
                      value: 'Widowed',
                    },
                  ]}
                  name="maritalStatus"
                  id="maritalStatus"
                  value={values.maritalStatus}
                  setFieldValue={(name, value) => setFieldValue(name, value)}
                  className="w-full outline-none"
                  placeholder="Select maritalStatus"
                  defaultValue={data?.maritalStatus}
                />
                {errors.maritalStatus && touched.maritalStatus ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.maritalStatus}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="w-full flex md:flex-row flex-col gap-3">
              <div className="w-full">
                <label
                  className="text-sm md:text-black text-white leading-4"
                  htmlFor="qualification"
                >
                  Qualification{' '}
                  <span className="text-yellow-500 md:text-primary ml-1">
                    *
                  </span>
                </label>
                <SearchableSelect
                  options={[
                    {
                      label: 'LeavingSchoolCertificate',
                      value: 'LeavingSchoolCertificate',
                    },
                    {
                      label: 'SSCE',
                      value: 'SSCE',
                    },
                    { label: 'OND', value: 'OND' },
                    { label: 'HND', value: 'HND' },
                    { label: 'BSc', value: 'BSc' },
                    { label: 'MSc', value: 'MSc' },
                    { label: 'PhD', value: 'PhD' },
                    { label: 'Others', value: 'Others' },
                  ]}
                  name="qualification"
                  id="qualification"
                  value={values.qualification}
                  setFieldValue={(name, value) => setFieldValue(name, value)}
                  className="w-full outline-none"
                  placeholder="Select Employment status"
                />
                {errors.qualification && touched.qualification ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.qualification}
                  </div>
                ) : null}
              </div>

              <div className="w-full flex flex-col">
                <label
                  className="text-sm text-black leading-4"
                  htmlFor="yearJoined"
                >
                  Member Since
                </label>
                <input
                  type="text"
                  name="yearJoined"
                  id="yearJoined"
                  className={`w-full h-[41px] text-sm px-4  border border-secondary rounded-lg mt-2 outline-none bg-grey700`}
                  placeholder="Date Of Birth"
                  onChange={handleChange}
                  value={values?.yearJoined}
                />
                {errors.yearJoined && touched.yearJoined ? (
                  <div className="text-xs text-red-700">
                    {errors.yearJoined}
                  </div>
                ) : null}
              </div>
            </div>

            <h3 className="font-bold mt-10 text-primary">
              Contact Information
            </h3>
            <div className="w-full flex md:flex-row flex-col gap-3">
              <div className="w-full flex flex-col">
                <label
                  htmlFor="nearestBusStop"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Nearest Bus-stop
                </label>
                <input
                  type="text"
                  name="nearestBusStop"
                  id="nearestBusStop"
                  className={`w-full min-h-[46px] border border-secondary text-base p-4 rounded mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter Your Nearest Bus Stop"
                  onChange={handleChange}
                  value={values?.nearestBusStop}
                />
                {errors.nearestBusStop && touched.nearestBusStop ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.nearestBusStop}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:flex-row flex-col gap-3">
              <div className="w-full flex flex-col">
                <label
                  className="text-sm text-black leading-4"
                  htmlFor="address"
                >
                  Home Address
                </label>
                <textarea
                  type="text"
                  name="address"
                  id="address"
                  className={`w-full min-h-[56px] text-sm px-4 py-4 border border-secondary rounded mt-2 outline-none bg-grey700`}
                  placeholder="Home Address"
                  onChange={handleChange}
                  value={values?.address}
                />
                {errors.address && touched.address ? (
                  <div className="text-xs text-red-700">{errors.address}</div>
                ) : null}
              </div>
            </div>

            <div className="w-full flex md:flex-row flex-col gap-3">
              <div className="w-full flex flex-col">
                <label
                  className="text-sm md:text-black text-white leading-4"
                  htmlFor="city"
                >
                  City Of Residence
                  <span className="text-yellow-500 md:text-primary ml-1">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className={`w-full h-[56px] border border-secondary text-base px-4 rounded mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter City Of Residence (Optional)"
                  onChange={handleChange}
                  value={values?.city}
                />
                {errors.city && touched.city ? (
                  <div className="text-xs mt-2 text-red-700">{errors.city}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:flex-row flex-col gap-3">
              <div className="w-full flex flex-col">
                <label
                  className="text-sm md:text-black text-white leading-4"
                  htmlFor="stateName"
                >
                  State Of Residence{' '}
                  <span className="text-yellow-500 md:text-primary ml-1">
                    *
                  </span>
                </label>
                <SearchableSelect
                  options={[
                    { label: 'Lagos', value: 'Lagos' },
                    { label: 'Abuja', value: 'Abuja' },
                    { label: 'Abia', value: 'Abia' },
                    { label: 'Adamawa', value: 'Adamawa' },
                    { label: 'Akwa Ibom', value: 'Akwa Ibom' },
                    { label: 'Anambra', value: 'Anambra' },
                    { label: 'Bauchi', value: 'Bauchi' },
                    { label: 'Bayelsa', value: 'Bayelsa' },
                    { label: 'Benue', value: 'Benue' },
                    { label: 'Borno', value: 'Borno' },
                    { label: 'Cross River', value: 'Cross River' },
                    { label: 'Delta', value: 'Delta' },
                    { label: 'Ebonyi', value: 'Ebonyi' },
                    { label: 'Edo', value: 'Edo' },
                    { label: 'Ekiti', value: 'Ekiti' },
                    { label: 'Enugu', value: 'Enugu' },
                    { label: 'Gombe', value: 'Gombe' },
                    { label: 'Imo', value: 'Imo' },
                    { label: 'Jigawa', value: 'Jigawa' },
                    { label: 'Kaduna', value: 'Kaduna' },
                    { label: 'Kano', value: 'Kano' },
                    { label: 'Katsina', value: 'Katsina' },
                    { label: 'Kebbi', value: 'Kebbi' },
                    { label: 'Kogi', value: 'Kogi' },
                    { label: 'Kwara', value: 'Kwara' },
                    { label: 'Nasarawa', value: 'Nasarawa' },
                    { label: 'Niger', value: 'Niger' },
                    { label: 'Ogun', value: 'Ogun' },
                    { label: 'Ondo', value: 'Ondo' },
                    { label: 'Osun', value: 'Osun' },
                    { label: 'Oyo', value: 'Oyo' },
                    { label: 'Plateau', value: 'Plateau' },
                    { label: 'Rivers', value: 'Rivers' },
                    { label: 'Sokoto', value: 'Sokoto' },
                    { label: 'Taraba', value: 'Taraba' },
                    { label: 'Yobe', value: 'Yobe' },
                    { label: 'Zamfara', value: 'Zamfara' },
                  ]}
                  name="stateName"
                  id="stateName"
                  value={values.stateName}
                  setFieldValue={(name, value) => setFieldValue(name, value)}
                  className="w-full outline-none"
                  placeholder="Select State Of Residence"
                />
                {errors.stateName && touched.stateName ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.stateName}
                  </div>
                ) : null}
              </div>
              <div className="w-full flex flex-col">
                <label
                  className="text-sm md:text-black text-white leading-4"
                  htmlFor="countryName"
                >
                  Country Of Residence
                  <span className="text-yellow-500 md:text-primary ml-1">
                    *
                  </span>
                </label>

                <SearchableSelect
                  options={[{ label: 'Nigeria', value: 'Nigeria' }]}
                  name="countryName"
                  id="countryName"
                  value={values.countryName}
                  setFieldValue={(name, value) => setFieldValue(name, value)}
                  className="w-full outline-none"
                  placeholder="Select Country Of Residence"
                />
                {errors.countryName && touched.countryName ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.countryName}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:justify-end md:flex-row flex-col-reverse md:gap-3 gap-0 mt-8">
              <Button
                title="Cancel"
                className="min-w-[150px] h-[43px] text-sm rounded-md border border-secondary"
                backgroundColor="bg-white"
                textColor="text-secondary"
                onClick={() => setOpenModal(false)}
              />
              <Button
                title="Save changes"
                className="h-[43px] text-sm rounded-md mb-4"
                backgroundColor="bg-secondary"
                type="submit"
                isLoading={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
