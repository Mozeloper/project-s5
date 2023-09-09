import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Button";
import ProfileImg from "../../../assets/images/profile-img.svg";
import PasswordField from "../../../components/FormInputs/PasswordField";
import { api } from "../../../services/api";
import { appUrls } from "../../../services/urls";
import ModalPopup from "../../../components/ModalPopup";
import { toast } from "react-hot-toast";
import Update from "./components/Update";

export default function PersonalDetailsSettings() {
  const [data, setData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const changePassowordSchema = Yup.object().shape({
    current_password: Yup.string()
      .min(7, "Too Short!")
      .max(50, "Too Long!")
      .required("Current Password is required"),
    new_password: Yup.string()
      .min(7, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Please Confirm your password...."),
  });

  const handleChangePassword = async (payload, actions) => {
    try {
      const res = await api.post(appUrls.CHANGEPASSWORD_URL, payload);
      if (res?.data) {
        actions.resetForm();
        toast.success("Password change successfully...", {
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error(error?.data?.message, 4);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleGetUser = async () => {
    try {
      const res = await api.get(appUrls.GETSINGLEWORKERDETAILS_URL);
      if (res?.status === 200) {
        setData(res?.data?.Data);
      }
    } catch (error) {
      toast.error(error?.data?.message, 4);
    } finally {
    }
  };

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        handleGetUser();
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <ModalPopup isOpen={openModal}>
        <Update
          handleGetUser={handleGetUser}
          data={data}
          setOpenModal={setOpenModal}
        />
      </ModalPopup>
      <div className="overflow-hidden">
        <div className="w-full rounded-md relative h-[240px] bg-gradient-to-b from-[#232931] to-[#38404b] p-4">
          <div className="w-full flex justify-end">
            <Button
              title="Edit"
              className="w-[126px] text-sm rounded-md"
              backgroundColor="bg-white"
              textColor="text-secondary"
              onClick={() => setOpenModal(true)}
            />
          </div>
          <div className="absolute -bottom-24 flex md:gap-16 gap-2 md:left-[30px] md:right-[30px] right-0 left-0 bg-white rounded-lg min-h-[150px] h-auto md:p-4 p-2">
            <div className="flex gap-4">
              <img
                src={ProfileImg}
                alt="profile_img"
                loading="lazy"
                className="w-[160px] h-[160px] relative -top-16"
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-2 md:gap-8 gap-2">
              <div className="flex flex-col gap-1 md:mr-20 mr-4">
                <h2 className="text-grey600 md:text-sm text-xs font-medium leading-5">
                  Firstname
                </h2>
                <h4 className="text-grey500 md:text-sm text-xs font-medium leading-4">
                  {data?.FirstName || "...."}
                </h4>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-grey600 md:text-sm text-xs font-medium leading-5">
                  Lastname
                </h2>
                <h4 className="text-grey500 md:text-sm text-xs font-medium leading-4">
                  {data?.SurName || "..."}
                </h4>
              </div>
              <div className="flex flex-col gap-1 mr-20">
                <h2 className="text-grey600 md:text-sm text-xs font-medium leading-5">
                  Othername
                </h2>
                <h4 className="text-grey500 md:text-sm text-xs font-medium leading-4">
                  {data?.OtherNames || "..."}
                </h4>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-grey600 md:text-sm text-xs font-medium leading-5">
                  Marital status
                </h2>
                <h4 className="text-grey500 md:text-sm text-xs font-medium leading-4">
                  {data?.MaritalStatus || "..."}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white h-[399px] mt-28 rounded-lg md:mx-[30px] mx-0 md:p-8 p-2">
          <Formik
            initialValues={{
              current_password: "",
              new_password: "",
              confirm_password: "",
            }}
            validationSchema={changePassowordSchema}
            onSubmit={(values, actions) => {
              const payload = {
                newPassword: values?.new_password,
                confirmNewPassword: values?.new_password,
                currentPassword: values?.current_password,
              };
              handleChangePassword(payload, actions);
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
              <Form onSubmit={handleSubmit}>
                <div className="w-full flex justify-end">
                  <Button
                    title="Change Password"
                    className="text-sm rounded-md"
                    backgroundColor="bg-[#38404b]"
                    type="submit"
                    isLoading={isSubmitting}
                  />
                </div>
                <div className="md:w-[400px] w-full">
                  <PasswordField
                    labelName="Current Password"
                    name="current_password"
                    value={values?.current_password}
                    onChange={handleChange}
                    isValid={!(isValid && dirty)}
                    placeholder="Current Password"
                  />
                </div>
                {errors.current_password && touched.current_password ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.current_password}
                  </div>
                ) : null}
                <div className="md:w-[85%] w-full flex md:flex-row flex-col gap-4">
                  <div className="md:w-[400px] w-full">
                    <PasswordField
                      labelName="New Password"
                      name="new_password"
                      value={values?.new_password}
                      onChange={handleChange}
                      isValid={!(isValid && dirty)}
                      placeholder="New Password"
                    />
                    {errors.new_password && touched.new_password ? (
                      <div className="text-xs mt-2 text-red-700">
                        {errors.new_password}
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
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
