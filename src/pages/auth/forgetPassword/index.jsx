import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import Button from "../../../components/Button";
import logo from "../../../assets/icons/logo.png";
import { api } from "../../../services/api";
import { appUrls } from "../../../services/urls";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleForgetPassword = async (email) => {
    setLoading(true);
    try {
      const res = await api.get(
        appUrls?.FORGETPASSWORD_URL + `?EmailAddress=${email}`
      );
      if (res?.status === 200) {
        navigate("/change-password", { state: email });
        toast.success(res?.data?.data, {
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

  const forgetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Not a proper email")
      .required("Email Address is required"),
  });

  return (
    <div className="flex min-h-screen h-screen justify-center items-center bg-gray-900 md:p-4 p-0">
      <div className="bg-white md:w-[500px] w-full min-h-[600px] md:h-auto h-full flex flex-col md:justify-center md:items-center md:pt-0 pt-16 rounded-lg md:p-6 p-3">
        <div className="w-full flex justify-center">
          <img src={logo} alt="logo" className="md:w-[100px] w-[70px]" />
        </div>
        <h3 className="text-gray-900 font-black lg:text-3xl md:text-2xl text-lg mt-4 flex md:justify-center justify-start">
          Reset Account Password
        </h3>
        <p className="text-gray-600 md:px-8 text-base font-light text-start md:text-center mt-2">
          Please enter your Email Address below. We will send you a one time otp
          to create a new password.
        </p>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={forgetPasswordSchema}
          onSubmit={(values) => {
            handleForgetPassword(values?.email);
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form onSubmit={handleSubmit} className="mt-3 w-full">
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
                  placeholder="Enter Your Email"
                  onChange={handleChange}
                  value={values?.email}
                />
                {errors.email && touched.email ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.email}
                  </div>
                ) : null}
              </div>
              <Button
                title="Submit"
                className="w-full h-[56px] text-center mt-6 rounded-2xl"
                backgroundColor="bg-primary"
                type="submit"
                isLoading={isLoading}
              />
              <div className="w-full flex justify-between">
                <p className="text-secondary font-sm leading-4 my-4">
                  Remember Password?
                </p>
                <p
                  onClick={() => navigate("/")}
                  className="text-indigo-600 hover:text-indigo-500 font-sm leading-4 my-4 cursor-pointer hover:border-b hover:border-indigo-600"
                >
                  Login
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
