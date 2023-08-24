import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import Button from "../../../components/Button";
import logo from "../../../assets/icons/logo.png";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Not a proper email")
      .required("Email Address is required"),
  });

  return (
    <div className="flex min-h-screen h-screen justify-center items-center bg-gray-900 md:p-4 p-0">
      <div className="bg-white md:w-[500px] w-full min-h-[600px] md:h-auto h-full flex flex-col justify-center items-center rounded-lg md:p-6 p-3">
        <div className="w-full flex justify-center">
          <img src={logo} alt="logo" className="md:w-[100px] w-[70px]" />
        </div>
        <h3 className="text-gray-900 font-black lg:text-3xl md:text-2xl text-lg mt-4 flex justify-center">
          Reset Account Password
        </h3>
        <p className="text-gray-600 md:px-8 px-4 text-base font-light text-center mt-2">
          Please enter your Email Address below. We will send you a reset link
          to create a new password.
        </p>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => {
            navigate(from);
            toast.success("Link sent Successfully", {
              icon: "👏",
              duration: 4000,
            });
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
            isValid,
          }) => (
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
                title="Send Link"
                className="w-full h-[56px] text-center mt-6 rounded-2xl"
                backgroundColor="bg-primary"
                type="submit"
                isLoading={isSubmitting}
                // disabled={!(isValid && dirty)}
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
