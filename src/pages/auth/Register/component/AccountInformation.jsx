import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { checkUppercase, containsNumber, phoneRegExp } from "../../../../utils";
import Button from "../../../../components/Button";
import PasswordField from "../../../../components/FormInputs/PasswordField";
import password_correct from "../../../../assets/icons/password_correct.svg";
import password_initial from "../../../../assets/icons/password_initial.svg";

export default function AccountInformation({
  userValues,
  setUserValues,
  setCurrentStep,
}) {
  const [passwordCharacterCheck, setPasswordCharacterCheck] = useState({
    password_length: false,
    contains_uppercase: false,
    contains_number: false,
    unique_character: false,
    confirm_password_match: false,
  });

  const signupSchema = Yup.object().shape({
    firstName: Yup.string().required("Firstname is Required"),
    otherNames: Yup.string(),
    surName: Yup.string().required("Surname is Required"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is Required"),
    email: Yup.string()
      .email("Not a proper email")
      .required("Email Address is required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Password is required")
      .test("password", null, function (password) {
        if (password?.trim() !== "") {
          if (password?.length >= 8) {
            setPasswordCharacterCheck((prev) => ({
              ...prev,
              password_length: true,
            }));
          } else {
            setPasswordCharacterCheck((prev) => ({
              ...prev,
              password_length: false,
            }));
          }
          if (checkUppercase(password)) {
            setPasswordCharacterCheck((prev) => ({
              ...prev,
              contains_uppercase: true,
            }));
          } else {
            setPasswordCharacterCheck((prev) => ({
              ...prev,
              contains_uppercase: false,
            }));
          }
          if (containsNumber(password)) {
            setPasswordCharacterCheck((prev) => ({
              ...prev,
              contains_number: true,
            }));
          } else {
            setPasswordCharacterCheck((prev) => ({
              ...prev,
              contains_number: false,
            }));
          }
          if (password?.match(/\W/)) {
            setPasswordCharacterCheck((prev) => ({
              ...prev,
              unique_character: true,
            }));
          } else {
            setPasswordCharacterCheck((prev) => ({
              ...prev,
              unique_character: false,
            }));
          }
        }
      }),
    confirmPassword: Yup.string()
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
          firstName: userValues?.firstName || "",
          otherNames: userValues?.otherNames || "",
          surName: userValues?.surName || "",
          email: userValues?.email || "",
          phoneNumber: userValues?.phoneNumber || "",
          password: userValues?.password || "",
          confirmPassword: userValues?.confirmPassword || "",
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
          <Form onSubmit={handleSubmit} className="mt-6 w-full">
            <div className="w-full flex md:flex-row flex-col gap-2 mb-6">
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
            <div className="w-full flex md:flex-row flex-col gap-2 mb-6">
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
            <div className="w-full flex md:flex-row flex-col gap-2 mb-6">
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
            </div>
            <div className="w-full flex md:flex-row flex-col gap-4 mb-6">
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
                  name="confirmPassword"
                  value={values?.confirmPassword}
                  onChange={handleChange}
                  isValid={!(isValid && dirty)}
                  placeholder="Confirm New password"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.confirmPassword}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-4">
              <ul className="flex flex-col gap-1">
                <li className="flex gap-2 md:text-black text-white">
                  {passwordCharacterCheck?.password_length ? (
                    <img
                      src={password_correct}
                      alt="password_correct"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={password_initial}
                      alt="password_initial"
                      loading="lazy"
                    />
                  )}
                  Minimum of 8 characters
                </li>
                <li className="flex gap-2 md:text-black text-white">
                  {passwordCharacterCheck?.contains_uppercase ? (
                    <img src={password_correct} alt="password_correct" />
                  ) : (
                    <img src={password_initial} alt="password_initial" />
                  )}
                  One UPPERCASE character
                </li>
                <li className="flex gap-2 md:text-black text-white">
                  {passwordCharacterCheck?.contains_number ? (
                    <img src={password_correct} alt="password_correct" />
                  ) : (
                    <img src={password_initial} alt="password_initial" />
                  )}
                  One number
                </li>
                <li className="flex gap-2 md:text-black text-white">
                  {passwordCharacterCheck?.unique_character ? (
                    <img src={password_correct} alt="password_correct" />
                  ) : (
                    <img src={password_initial} alt="password_initial" />
                  )}
                  {`One unique character (e.g !@#$%&*)?>`}
                </li>
              </ul>
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
