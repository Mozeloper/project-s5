import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { phoneRegExp } from "../../../../utils";
import Button from "../../../../components/Button";
import PasswordField from "../../../../components/FormInputs/PasswordField";

export default function AccountInformation({
  userValues,
  setUserValues,
  setCurrentStep,
}) {
  const signupSchema = Yup.object().shape({
    userName: Yup.string().required("Username is Required"),
    firstName: Yup.string().required("Firstname is Required"),
    otherNames: Yup.string().required("otherName is Required"),
    surName: Yup.string().required("Surname is Required"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is Required"),
    email: Yup.string()
      .email("Not a proper email")
      .required("Email Address is required"),
    password: Yup.string()
      .min(7, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please Confirm your password...."),
  });

  return (
    <div className="w-full h-full">
      <h2 className="font-black text-center text-2xl md:text-secondary text-white mb-2">
        Account Information
      </h2>
      <Formik
        initialValues={{
          userName: userValues?.userName || "",
          firstName: userValues?.firstName || "",
          otherNames: userValues?.otherNames || "",
          surName: userValues?.surName || "",
          email: userValues?.email || "",
          phoneNumber: userValues?.phoneNumber || "",
          password: userValues?.password || "",
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
          isValid,
        }) => (
          <Form onSubmit={handleSubmit} className="mt-3 w-full">
            <div className="w-full flex md:flex-row flex-col gap-2">
              <div className="mb-1 w-full">
                <label
                  htmlFor="userName"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Username <span className="text-primary ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  className={`w-full h-[56px] border border-secondary text-sm px-4 rounded-lg mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter Username"
                  onChange={handleChange}
                  value={values?.userName}
                />
                {errors.userName && touched.userName ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.userName}
                  </div>
                ) : null}
              </div>
              <div className="mb-1 w-full">
                <label
                  htmlFor="firstName"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Firstname <span className="text-primary ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={`w-full h-[56px] border border-secondary text-sm px-4 rounded-lg mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter Firstname"
                  onChange={handleChange}
                  value={values?.firstName}
                />
                {errors.firstName && touched.firstName ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.firstName}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:flex-row flex-col gap-2">
              <div className="mb-1 w-full">
                <label
                  htmlFor="otherNames"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Othernames <span className="text-primary ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="otherNames"
                  id="otherNames"
                  className={`w-full h-[56px] border border-secondary text-sm px-4 rounded-lg mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter otherNames"
                  onChange={handleChange}
                  value={values?.otherNames}
                />
                {errors.otherNames && touched.otherNames ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.otherNames}
                  </div>
                ) : null}
              </div>
              <div className="mb-1 w-full">
                <label
                  htmlFor="surName"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Surname <span className="text-primary ml-1">*</span>
                </label>
                <input
                  type="surName"
                  name="surName"
                  id="surName"
                  className={`w-full h-[56px] border border-secondary text-sm px-4 rounded-lg mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter Surname"
                  onChange={handleChange}
                  value={values?.surName}
                />
                {errors.surName && touched.surName ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.surName}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:flex-row flex-col gap-2">
              <div className="mb-1 w-full">
                <label
                  htmlFor="otherNames"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Phone number <span className="text-primary ml-1">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  className={`w-full h-[56px] border border-secondary text-sm px-4 rounded-lg mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter phone number"
                  onChange={handleChange}
                  value={values?.phoneNumber}
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.phoneNumber}
                  </div>
                ) : null}
              </div>
              <div className="mb-1 w-full">
                <label
                  htmlFor="email"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Email <span className="text-primary ml-1">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`w-full h-[56px] border border-secondary text-sm px-4 rounded-lg mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter Email"
                  onChange={handleChange}
                  value={values?.email}
                />
                {errors.email && touched.email ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.email}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:flex-row flex-col gap-4">
              <div className="md:w-[400px] w-full">
                <PasswordField
                  labelName="Password"
                  name="password"
                  value={values?.password}
                  onChange={handleChange}
                  isValid={!(isValid && dirty)}
                  placeholder="New Password"
                />
                {errors.password && touched.password ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.password}
                  </div>
                ) : null}
              </div>
              <div className="md:w-[400px] w-full">
                <PasswordField
                  labelName="Confirm Password"
                  name="confirm_password"
                  value={values?.confirm_password}
                  onChange={handleChange}
                  isValid={!(isValid && dirty)}
                  placeholder="Confirm New password"
                />
                {errors.confirm_password && touched.confirm_password ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.confirm_password}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-end w-full">
              <Button
                title="Proceed"
                className="w-[200px] h-[56px] text-center mt-3 mb-10 rounded-2xl"
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
