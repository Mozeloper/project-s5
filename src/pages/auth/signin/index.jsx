import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import Button from "../../../components/Button";
import PasswordField from "../../../components/FormInputs/PasswordField";
import logo from "../../../assets/icons/Operation-5S-logo.png";
import { api } from "../../../services/api";
import { appUrls } from "../../../services/urls";

export default function Signin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const [isLoading, setIsLoading] = useState(false);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Not a proper email")
      .required("email is Required"),
    password: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is Required"),
  });

  const handleLogin = async (values) => {
    setIsLoading(true);
    const payload = {
      email: values?.email,
      password: values?.password,
    };
    try {
      const res = await api.post(appUrls.LOGIN_URL, payload);
      if (res?.status === 200) {
        sessionStorage.setItem("token", res?.data?.data?.token);
        sessionStorage.setItem("refreshToken", res?.data?.data?.refreshToken);
        sessionStorage.setItem("role", JSON.stringify(res?.data?.data?.roles));
        handleGetUserDetails();
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "Unable to login";
      toast.error(errorMessage, {
        duration: 5000,
      });
      setIsLoading(false);
    }
  };

  const handleGetUserDetails = async () => {
    try {
      const res = await api.get(appUrls?.GETSINGLEWORKERDETAILS_URL);
      if (res?.status === 200) {
        sessionStorage.setItem("userObj", JSON.stringify(res?.data?.Data));
        navigate(from);
        toast.success("Login Successful", {
          icon: "👏",
          duration: 2000,
        });
      }
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        "Unable to login this user is not Approved yet contact system Administrator...";
      toast.error(errorMessage, {
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen h-screen justify-center items-center bg-gray-900 md:p-4 p-5">
      <div className="bg-white md:w-[500px] w-full min-h-[300px] md:h-auto h-full flex flex-col justify-between md:items-center md:pt-16 rounded-lg md:p-6 p-5">
        <div className="w-full flex justify-center">
          <img src={logo} alt="logo" className="md:w-[300px] w-[200px]" />
        </div>
        <h3 className="text-gray-900 font-black lg:text-3xl md:text-2xl text-lg md:mt-4 flex justify-center">
          Account Sign In
        </h3>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            handleLogin(values);
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
            <Form onSubmit={handleSubmit} className="md:mt-3 w-full">
              <div className="mb-3 w-full">
                <label
                  htmlFor="email"
                  className={`text-sm text-black leading-4`}
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={`w-full h-[56px] border border-secondary text-sm px-4 rounded-lg mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Email"
                  onChange={handleChange}
                  value={values?.email}
                />
                {errors.email && touched.email ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.email}
                  </div>
                ) : null}
              </div>
              <div>
                <PasswordField
                  value={values?.password}
                  onChange={handleChange}
                  isValid={!(isValid && dirty)}
                  placeholder="Enter your Password"
                />
              </div>
              {errors.password && touched.password ? (
                <div className="text-xs mt-2 text-red-700">
                  {errors.password}
                </div>
              ) : null}
              <p
                onClick={() => navigate("/forget-password")}
                className="text-indigo-600 flex justify-end hover:text-indigo-500 font-sm leading-4 my-4 cursor-pointer"
              >
                Forgot Password ?
              </p>
              <Button
                title="Sign in"
                className="w-full h-[56px] text-center mt-6 rounded-2xl"
                backgroundColor="bg-primary"
                type="submit"
                isLoading={isLoading}
                // disabled={!(isValid && dirty)}
              />
              <div className="w-full flex justify-between">
                <p className="text-secondary font-sm leading-4 my-4">
                  Don't have an account?
                </p>
                <p
                  onClick={() => navigate("/begin-registration")}
                  className="text-indigo-600 hover:text-indigo-500 font-sm leading-4 my-4 cursor-pointer hover:border-b hover:border-indigo-600"
                >
                  Register
                </p>
              </div>
            </Form>
          )}
        </Formik>
        <div className="text-center"><small className="text-primary font-bold">Powered by The Potters House of Lagos</small></div>
      </div>
    </div>
  );
}
