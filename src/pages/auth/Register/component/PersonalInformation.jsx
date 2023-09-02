import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../../../components/Button";
import SearchableSelect from "../../../../components/CustomSelect";

export default function PersonalInformation({
  userValues,
  setUserValues,
  setCurrentStep,
}) {
  const signupSchema = Yup.object().shape({
    gender: Yup.number().required("Gender is Required"),
    dateOfBirth: Yup.string().required("Date Of Birth is Required"),
    employmentStatus: Yup.string(),
    maritalStatus: Yup.string().required("Select Marital status"),
    countryName: Yup.string().required("Select country"),
    stateName: Yup.string().required("Select country"),
    localGovtName: Yup.string().required("Select LGA"),
    nameOfOrganization: Yup.string(),
    homeAddress: Yup.string(),
    nearestBusStop: Yup.string(),
  });

  return (
    <div className="w-full h-full">
      <h2 className="font-black text-center text-2xl md:text-secondary text-white mb-4">
        Personal Information
      </h2>
      <Formik
        initialValues={{
          gender: userValues?.gender || "",
          dateOfBirth: userValues?.dateOfBirth || "",
          employmentStatus: userValues?.employmentStatus || "",
          maritalStatus: userValues?.maritalStatus || "",
          countryName: userValues?.countryName || "",
          stateName: userValues?.stateName || "",
          localGovtName: userValues?.localGovtName || "",
          nameOfOrganization: userValues?.nameOfOrganization || "",
          homeAddress: userValues?.homeAddress || "",
          nearestBusStop: userValues?.nearestBusStop || "",
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
                  Gender <span className="text-primary ml-1">*</span>
                </label>
                <SearchableSelect
                  options={[
                    { label: "Male", value: 0 },
                    { label: "Female", value: 1 },
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
              <div className="mb-1 w-full">
                <label
                  htmlFor="dateOfBirth"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Date Of birth <span className="text-primary ml-1">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  className={`w-full h-[56px] border border-secondary text-sm px-4 rounded-lg mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter dateOfBirth"
                  onChange={handleChange}
                  value={values?.dateOfBirth}
                />
                {errors.dateOfBirth && touched.dateOfBirth ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.dateOfBirth}
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
                  Employment status
                </label>
                <SearchableSelect
                  options={[
                    { label: "Employed", value: "Employed" },
                    { label: "Self-Employed", value: "SelfEmployed" },
                    { label: "Unemployed ", value: "Unemployed" },
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
              <div className="w-full mt-2">
                <label
                  className="text-sm md:text-black text-white leading-4"
                  htmlFor="maritalStatus"
                >
                  Marital status <span className="text-primary ml-1">*</span>
                </label>
                <SearchableSelect
                  options={[
                    {
                      label: "Married",
                      value: "Married",
                    },
                    {
                      label: "Single",
                      value: "Single",
                    },
                    {
                      label: "Divorced",
                      value: "Divorced",
                    },
                    {
                      label: "Widowed",
                      value: "Widowed",
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
                  htmlFor="countryName"
                >
                  Country<span className="text-primary ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="countryName"
                  id="countryName"
                  className={`w-full h-[56px] border border-secondary text-sm px-4 rounded-lg mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter Organization Name"
                  onChange={handleChange}
                  value={values?.countryName}
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
                  State <span className="text-primary ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="stateName"
                  id="stateName"
                  className={`w-full h-[56px] border border-secondary text-sm px-4 rounded-lg mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter Organization Name"
                  onChange={handleChange}
                  value={values?.stateName}
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
                  htmlFor="localGovtName"
                >
                  LGA<span className="text-primary ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="localGovtName"
                  id="localGovtName"
                  className={`w-full h-[56px] border border-secondary text-sm px-4 rounded-lg mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter Organization Name"
                  onChange={handleChange}
                  value={values?.localGovtName}
                />
                {errors.localGovtName && touched.localGovtName ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.localGovtName}
                  </div>
                ) : null}
              </div>
              <div className="mb-1 w-full">
                <label
                  htmlFor="nameOfOrganization"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Name of Organization
                </label>
                <input
                  type="text"
                  name="nameOfOrganization"
                  id="nameOfOrganization"
                  className={`w-full h-[56px] border border-secondary text-sm px-4 rounded-lg mt-2 outline-none bg-background_white focus:bg-background_white`}
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
                  className={`w-full h-[100px] border border-secondary text-sm p-4 rounded-lg mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter home Address"
                  onChange={handleChange}
                  value={values?.homeAddress}
                />
                {errors.homeAddress && touched.homeAddress ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.homeAddress}
                  </div>
                ) : null}
              </div>
              <div className="mb-1 w-full">
                <label
                  htmlFor="nearestBusStop"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Nearest Bus-stop
                </label>
                <textarea
                  type="text"
                  name="nearestBusStop"
                  id="nearestBusStop"
                  className={`w-full h-[100px] border border-secondary text-sm p-4 rounded-lg mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter home Address"
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
                className="w-[200px] h-[56px] text-center mt-3 md:mb-4 mb-10 rounded-2xl"
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
