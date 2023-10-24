import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Button from '../../../../components/Button';
import SearchableSelect from '../../../../components/CustomSelect';

export default function PersonalInformation({
  userValues,
  setUserValues,
  setCurrentStep,
}) {
  const signupSchema = Yup.object().shape({
    gender: Yup.number().required('Gender is Required'),
    employmentStatus: Yup.string(),
    qualification: Yup.string(),
    maritalStatus: Yup.string().required('Select Marital status'),
    countryName: Yup.string().required('Select country'),
    stateName: Yup.string().required('Select country'),
    city: Yup.string(),
    nameOfOrganization: Yup.string(),
    homeAddress: Yup.string(),
    nearestBusStop: Yup.string(),
  });

  const maxDOBYear = new Date().getFullYear() - 8; // Calculate 8 years ago

  return (
    <div className="w-full h-full">
      <h2 className="font-black text-center text-2xl md:text-secondary text-white mb-4">
        Personal Information
      </h2>
      <Formik
        initialValues={{
          gender: userValues?.gender || '',
          dateOfBirth: '',
          employmentStatus: userValues?.employmentStatus || '',
          qualification: userValues?.qualification || '',
          maritalStatus: userValues?.maritalStatus || '',
          countryName: userValues?.countryName || '',
          stateName: userValues?.stateName || '',
          city: userValues?.city || '',
          nameOfOrganization: userValues?.nameOfOrganization || '',
          homeAddress: userValues?.homeAddress || '',
          nearestBusStop: userValues?.nearestBusStop || '',
        }}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          setUserValues((prev) => ({ ...prev, ...values }));
          setCurrentStep((prev) => prev + 1);
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
            <div className="w-full flex md:flex-row flex-col gap-2">
              <div className="w-full mt-2">
                <label
                  className="text-sm md:text-black text-white leading-4"
                  htmlFor="gender"
                >
                  Gender{' '}
                  <span className="text-yellow-500 md:text-primary ml-1">
                    *
                  </span>
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
                  <div className="text-xs mt-2 text-red-700">
                    {errors.gender}
                  </div>
                ) : null}
              </div>
              {/* <div className="mb-1 w-full">
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
              </div> */}
            </div>
            <div className="w-full flex md:flex-row flex-col gap-2 mb-2">
              <div className="w-full mt-2">
                <label
                  className="text-sm md:text-black text-white leading-4"
                  htmlFor="maritalStatus"
                >
                  Marital status{' '}
                  <span className="text-yellow-500 md:text-primary ml-1">
                    *
                  </span>
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
                  placeholder="Select Marital status"
                />
                {errors.maritalStatus && touched.maritalStatus ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.maritalStatus}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:flex-row flex-col gap-2 mb-2">
              <div className="w-full mt-2">
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
            </div>
            <div className="w-full flex md:flex-row flex-col gap-2 mb-2">
              <div className="w-full mt-2">
                <label
                  className="text-sm md:text-black text-white leading-4"
                  htmlFor="employmentStatus"
                >
                  Employment status{' '}
                  <span className="text-yellow-500 md:text-primary ml-1">
                    *
                  </span>
                </label>
                <SearchableSelect
                  options={[
                    { label: 'Employed', value: 'Employed' },
                    { label: 'Self-Employed', value: 'SelfEmployed' },
                    { label: 'Unemployed ', value: 'Unemployed' },
                  ]}
                  name="employmentStatus"
                  id="employmentStatus"
                  value={values.employmentStatus}
                  setFieldValue={(name, value) => setFieldValue(name, value)}
                  className="w-full outline-none"
                  placeholder="Select Employment status"
                />
                {errors.employmentStatus && touched.employmentStatus ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.employmentStatus}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:flex-row flex-col gap-2 mb-2">
              <div className="mb-1 w-full hidden">
                <label
                  htmlFor="nameOfOrganization"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Name of Organization
                </label>
                <input
                  type="hidden"
                  name="nameOfOrganization"
                  id="nameOfOrganization"
                  className={`w-full h-[56px] border border-secondary text-base px-4 rounded mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter Organization Name"
                  onChange={handleChange}
                  value={values?.nameOfOrganization}
                />
                {errors.nameOfOrganization && touched.nameOfOrganization ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.nameOfOrganization}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="w-full flex md:flex-row flex-col gap-2 mb-2">
              <div className="w-full mt-2">
                <label
                  className="text-sm md:text-black text-white leading-4"
                  htmlFor="countryName"
                >
                  Country Of Residence
                  <span className="text-yellow-500 md:text-primary ml-1">
                    *
                  </span>
                </label>
                {/* <input
                  type="text"
                  name="countryName"
                  id="countryName"
                  className={`w-full h-[56px] border border-secondary text-base px-4 rounded mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter Country Name"
                  onChange={handleChange}
                  value={values?.countryName}
                /> */}
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
              <div className="w-full mt-2">
                <label
                  className="text-sm md:text-black text-white leading-4"
                  htmlFor="stateName"
                >
                  State Of Residence{' '}
                  <span className="text-yellow-500 md:text-primary ml-1">
                    *
                  </span>
                </label>
                {/* <input
                  type="text"
                  name="stateName"
                  id="stateName"
                  className={`w-full h-[56px] border border-secondary text-base px-4 rounded mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter State Of Residence"
                  onChange={handleChange}
                  value={values?.stateName}
                /> */}
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
            </div>
            <div className="w-full flex md:flex-row flex-col gap-2 mb-2">
              <div className="w-full">
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
            <div className="w-full flex md:flex-row flex-col gap-2 mb-2">
              <div className="mb-1 w-full">
                <label
                  htmlFor="homeAddress"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Home Address
                </label>
                <textarea
                  type="text"
                  name="homeAddress"
                  id="homeAddress"
                  className={`w-full h-[100px] border border-secondary text-base p-4 rounded mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter Home Address"
                  onChange={handleChange}
                  value={values?.homeAddress}
                />
                {errors.homeAddress && touched.homeAddress ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.homeAddress}
                  </div>
                ) : null}
              </div>
              <div className="mb-1 w-full hidden">
                <label
                  htmlFor="nearestBusStop"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Nearest Bus-stop
                </label>
                <textarea
                  type="hidden"
                  name="nearestBusStop"
                  id="nearestBusStop"
                  className={`w-full h-[100px] border border-secondary text-base p-4 rounded mt-2 outline-none bg-background_white focus:bg-background_white`}
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
            <div className="flex justify-end w-full">
              <Button
                title="Proceed"
                className="w-[200px] h-[56px] text-center mt-5 md:mb-4 mb-10"
                backgroundColor="bg-primary"
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
