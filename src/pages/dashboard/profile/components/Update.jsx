import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Button from '../../../../components/Button';
import { appUrls } from '../../../../services/urls';
import { api } from '../../../../services/api';
import { toast } from 'react-hot-toast';
import SearchableSelect from '../../../../components/CustomSelect';
import { formatToISODate } from '../../../../utils';

export default function Update({ setOpenModal, data, handleGetUser }) {
  const updateUserSchema = Yup.object().shape({
    Email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    FirstName: Yup.string().required('First Name is required'),
    SurName: Yup.string().required('Last Name is required'),
    PhoneNumber: Yup.string().required('Phone number is required'),
    Gender: Yup.string().required('Gender is required'),
    OtherNames: Yup.string(),
  });
  const maxDOBYear = new Date().getFullYear() - 8; // Calculate 8 years ago

  const handleUpdateUser = async (payload, actions) => {
    try {
      const res = await api.post(appUrls.UPDATEUSER_URL, payload);
      if (res?.status === 200) {
        handleGetUser();
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
        Update Information
      </h2>
      <Formik
        initialValues={{
          FirstName: data?.FirstName || '',
          SurName: data?.SurName || '',
          OtherNames: data?.OtherNames || '',
          Email: data?.Email || '',
          PhoneNumber: data?.PhoneNumber || '',
          Gender: data?.Gender || '',
          phoneNumber: data?.PhoneNumber || '',
          dateOfBirth: data?.DateOfBirth || '',
          department: data?.department || '',
          employmentStatus: data?.EmploymentStatus || '',
          maritalStatus: data?.MaritalStatus || '',
          countryName: data?.CountryName || '',
          stateName: data?.StateName || '',
          localGovtName: data?.LocalGovtName || '',
          homeAddress: data?.HomeAddress || '',
          nearestBusStop: data?.NearestBusStop || '',
          qualification: data?.Qualification || '',
          nameOfOrganization: data?.NameOfOrganization || '',
          yearJoined: data?.YearJoined || '',
        }}
        validationSchema={updateUserSchema}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          const formattedDateOfBirth = formatToISODate(values?.dateOfBirth);
          // const formattedDate = moment(data?.DateOfBirth).format(
          //   "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
          // );
          const payload = {
            firstName: data?.FirstName,
            userName: data?.UserName,
            surName: data?.SurName,
            otherNames: values?.OtherNames,
            email: data?.Email,
            gender: data?.Gender,
            phoneNumber: values?.PhoneNumber,
            dateOfBirth: formattedDateOfBirth,
            department: data?.Department,
            employmentStatus: data?.EmploymentStatus,
            maritalStatus: values?.maritalStatus,
            countryName: values?.countryName,
            stateName: values?.stateName,
            localGovtName: data?.LocalGovtName,
            homeAddress: values?.homeAddress,
            nearestBusStop: data?.NearestBusStop,
            qualification: data?.Qualification,
            nameOfOrganization: data?.NameOfOrganization,
            yearJoined: values?.yearJoined,
          };
          handleUpdateUser(payload, actions);
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
                  htmlFor="FirstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  readOnly
                  name="FirstName"
                  id="FirstName"
                  className={`w-full h-[41px] text-sm px-4 border border-secondary rounded-lg mt-2 outline-none bg-grey700 read-only:cursor-not-allowed disabled:cursor-not-allowed`}
                  placeholder="First Name"
                  onChange={handleChange}
                  value={values?.FirstName}
                />
                {errors.FirstName && touched.FirstName ? (
                  <div className="text-xs text-red-700">{errors.FirstName}</div>
                ) : null}
              </div>
              <div className="w-full flex flex-col">
                <label
                  className="text-sm text-black leading-4"
                  htmlFor="SurName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  readOnly
                  name="SurName"
                  id="SurName"
                  className={`w-full h-[41px] text-sm px-4  border border-secondary rounded-lg mt-2 outline-none bg-grey700 read-only:cursor-not-allowed disabled:cursor-not-allowed`}
                  placeholder="Last Name"
                  onChange={handleChange}
                  value={values?.SurName}
                />
                {errors.SurName && touched.SurName ? (
                  <div className="text-xs text-red-700">{errors.SurName}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:flex-row-reserve flex-col-reverse gap-3">
              <div className="w-full flex flex-col">
                <label
                  className="text-sm text-black leading-4"
                  htmlFor="OtherNames"
                >
                  Other Names
                </label>
                <input
                  type="text"
                  name="OtherNames"
                  id="OtherNames"
                  className={`w-full h-[41px] text-sm px-4  border border-secondary rounded-lg mt-2 outline-none bg-grey700 focus:bg-none active:bg-transparent disabled:cursor-not-allowed`}
                  placeholder="Other Names"
                  onChange={handleChange}
                  value={values?.OtherNames}
                />
                {errors.OtherNames && touched.OtherNames ? (
                  <div className="text-xs text-red-700">
                    {errors.OtherNames}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:flex-row flex-col gap-3">
              <div className="w-full flex flex-col">
                <label className="text-sm text-black leading-4" htmlFor="Email">
                  Email Address
                </label>
                <input
                  type="text"
                  name="Email"
                  id="Email"
                  className={`w-full h-[41px] text-sm px-4  border border-secondary rounded-lg mt-2 outline-none bg-grey700 read-only:cursor-not-allowed disabled:cursor-not-allowed`}
                  placeholder="Email Address"
                  onChange={handleChange}
                  value={values?.Email}
                  readOnly
                />
                {errors.Email && touched.Email ? (
                  <div className="text-xs text-red-700">{errors.Email}</div>
                ) : null}
              </div>
              <div className="w-full flex flex-col">
                <label
                  className="text-sm text-black leading-4"
                  htmlFor="PhoneNumber"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  name="PhoneNumber"
                  id="PhoneNumber"
                  className={`w-full h-[41px] text-sm px-4  border border-secondary rounded-lg mt-2 outline-none bg-grey700`}
                  placeholder="Enter Username"
                  onChange={handleChange}
                  value={values?.PhoneNumber}
                />
                {errors.PhoneNumber && touched.PhoneNumber ? (
                  <div className="text-xs text-red-700">
                    {errors.PhoneNumber}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:flex-row flex-col gap-3">
              <div className="w-full flex flex-col">
                {/* <label
                  className="text-sm text-black leading-4"
                  htmlFor="homeAddress"
                >
                  BOD
                </label>
                <input
                  type="text"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  className={`w-full h-[41px] text-sm px-4  border border-secondary rounded-lg mt-2 outline-none bg-grey700`}
                  placeholder="Date Of Birth"
                  onChange={handleChange}
                  value={values?.dateOfBirth}
                />
                {errors.dateOfBirth && touched.dateOfBirth ? (
                  <div className="text-xs text-red-700">
                    {errors.dateOfBirth}
                  </div>
                ) : null} */}
                <label
                  htmlFor="dateOfBirth"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Date Of birth{' '}
                  <span className="text-yellow-500 md:text-primary ml-1">
                    *
                  </span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  max={`${maxDOBYear}-12-31`} // Set the max date to 8 years ago
                  className={`w-full h-[40px] border border-secondary text-base px-4 rounded mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter Your Date Of Birth"
                  onChange={handleChange}
                  value={values?.dateOfBirth}
                />
                {errors.dateOfBirth && touched.dateOfBirth ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.dateOfBirth}
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <label className="text-sm ext-black leading-4" htmlFor="Gender">
                  Gender
                </label>
                <SearchableSelect
                  options={[
                    { label: 'Male', value: 0 },
                    { label: 'Female', value: 1 },
                  ]}
                  name="Gender"
                  id="Gender"
                  isDisabled={true}
                  value={values.Gender}
                  setFieldValue={(name, value) => setFieldValue(name, value)}
                  className="w-full outline-none"
                  placeholder="Select Gender"
                  defaultValue={data?.Gender}
                />
                {errors.Gender && touched.Gender ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.Gender}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="w-full flex md:flex-row flex-col gap-3">
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
                  className="text-sm text-black leading-4"
                  htmlFor="homeAddress"
                >
                  Home Address
                </label>
                <textarea
                  type="text"
                  name="homeAddress"
                  id="homeAddress"
                  className={`w-full min-h-[56px] text-sm px-4 py-4 border border-secondary rounded mt-2 outline-none bg-grey700`}
                  placeholder="Home Address"
                  onChange={handleChange}
                  value={values?.homeAddress}
                />
                {errors.homeAddress && touched.homeAddress ? (
                  <div className="text-xs text-red-700">
                    {errors.homeAddress}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="w-full flex md:flex-row flex-col gap-3">
              <div className="w-full flex flex-col">
                <label
                  className="text-sm md:text-black text-white leading-4"
                  htmlFor="localGovtName"
                >
                  City Of Residence
                  <span className="text-yellow-500 md:text-primary ml-1">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="localGovtName"
                  id="localGovtName"
                  className={`w-full h-[56px] border border-secondary text-base px-4 rounded mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter City Of Residence (Optional)"
                  onChange={handleChange}
                  value={values?.localGovtName}
                />
                {errors.localGovtName && touched.localGovtName ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.localGovtName}
                  </div>
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
