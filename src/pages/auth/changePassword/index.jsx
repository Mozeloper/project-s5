import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import Button from "../../../components/Button";
import logo from "../../../assets/icons/logo.png";
import PasswordField from "../../../components/FormInputs/PasswordField";
import OTPInput from "react-otp-input";
import { api } from "../../../services/api";
import { appUrls } from "../../../services/urls";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isLoading, setLoading] = useState(false);

  const handleChangePassword = async (data) => {
    setLoading(true);
    try {
      const res = await api.post(appUrls?.RESETPASSWORD_URL, data);
      if (res?.status === 200) {
        navigate("/");
        toast.success(res?.data?.message, {
          icon: "👏",
          duration: 4000,
        });
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "An error Occured";
      toast.error(errorMessage, {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      const checkState = state;
      if (mounted && state === null) {
        navigate("/forget-password");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const changePasswordSchema = Yup.object().shape({
    token: Yup.string()
      .required("OTP is Required")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
    newPassword: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please Confirm your password...."),
  });

  return (
    <div className="flex min-h-screen h-screen justify-center items-center bg-gray-900 md:p-4 p-0">
      <div className="bg-white md:w-[500px] w-full min-h-[600px] md:h-auto h-full flex flex-col justify-center items-center rounded-lg md:p-6 p-3">
        <div className="w-full flex justify-center">
          <img src={logo} alt="logo" className="md:w-[100px] w-[70px]" />
        </div>
        <h3 className="text-gray-900 font-black lg:text-3xl md:text-2xl text-lg mt-4 flex md:justify-center justify-start">
          Change Account Password
        </h3>
        <p className="text-gray-600 md:px-8 px-4 text-base font-light md:text-center text-start mt-2">
          Please enter OTP sent to your email and your new password.
        </p>
        <Formik
          initialValues={{
            token: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={changePasswordSchema}
          onSubmit={(values) => {
            const payload = {
              ...values,
              email: state,
            };
            handleChangePassword(payload);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            dirty,
            setFieldValue,
            isValid,
          }) => (
            <Form onSubmit={handleSubmit} className="mt-3 w-full">
              <div className="w-full">
                <label
                  className="text-text_grey text-xs leading-4 mb-4"
                  htmlFor="token"
                >
                  Enter OTP
                </label>
                <OTPInput
                  containerStyle="flex gap-3 justify-between"
                  value={values.token}
                  name="token"
                  onChange={(e) => setFieldValue("token", e)}
                  numInputs={6}
                  focusStyle={false}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  className="rounded bg-neutral text-secondary border w-[48px] h-[48px] border-secondary p-3"
                />
                {errors.token && touched.token ? (
                  <div className="text-xs text-red-700 my-2">
                    {errors.token}
                  </div>
                ) : null}
              </div>
              <div className="w-full flex flex-col gap-4">
                <div className="w-full">
                  <PasswordField
                    labelName="Password"
                    name="newPassword"
                    value={values?.newPassword}
                    onChange={handleChange}
                    isValid={!(isValid && dirty)}
                    placeholder="New Password"
                  />
                  {errors.newPassword && touched.newPassword ? (
                    <div className="text-xs mt-2 text-red-700">
                      {errors.newPassword}
                    </div>
                  ) : null}
                </div>
                <div className="w-full">
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
              <Button
                title="Create password"
                className="w-full h-[56px] text-center mt-6 rounded-2xl"
                backgroundColor="bg-primary"
                type="submit"
                isLoading={isLoading}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
