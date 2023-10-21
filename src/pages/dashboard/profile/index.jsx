import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import MaleProfileImg from '../../../assets/images/profile-img.svg';
import FemaleProfileImg from '../../../assets/icons/female-profile.svg';
import Button from '../../../components/Button';
import PasswordField from '../../../components/FormInputs/PasswordField';
import ModalPopup from '../../../components/ModalPopup';
import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';
import Update from './components/Update';
import { Skeleton } from '@mui/material';

export default function PersonalDetailsSettings() {
  const [data, setData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const changePassowordSchema = Yup.object().shape({
    current_password: Yup.string()
      .min(7, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Current Password is required'),
    new_password: Yup.string()
      .min(7, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Password is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
      .required('Please Confirm your password....'),
  });

  const handleChangePassword = async (payload, actions) => {
    setData({});
    try {
      const res = await api.post(appUrls.CHANGEPASSWORD_URL, payload);
      if (res?.data) {
        actions.resetForm();
        toast.success('Password change successfully...', {
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error(error?.data?.message, 4);
    } finally {
      actions.setSubmitting(false);
      setShowPasswordFields(false);
    }
  };

  const handleGetUser = async () => {
    setData({});
    try {
      const res = await api.get(appUrls.GETSINGLEWORKERDETAILS_URL);
      if (res?.status === 200) {
        sessionStorage.setItem('userObj', JSON.stringify(res?.data?.Data));
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
            {data?.FirstName ? (
              <Button
                title="Edit"
                className="w-[126px] text-sm rounded-md"
                backgroundColor="bg-white"
                textColor="text-secondary"
                onClick={() => setOpenModal(true)}
              />
            ) : (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={126}
                height={40}
                className="w-[126px] text-sm rounded-md !bg-gray-200"
              />
            )}
          </div>
          <div className="absolute -bottom-24 flex md:gap-16 gap-2 md:left-[30px] md:right-[30px] right-0 left-0 bg-white rounded-lg min-h-[150px] h-auto md:p-4 p-2">
            <div className="flex gap-4">
              {/* added min height and width to prevent flickering  */}
              {data && data?.Gender ? (
                <img
                  src={
                    `${data?.Gender}`.toLowerCase() === 'male'
                      ? MaleProfileImg
                      : FemaleProfileImg
                  }
                  alt="profile_img"
                  loading="lazy"
                  className="w-auto min-h-[160px] min-w-[160px] max-h-[160px] relative -top-16"
                />
              ) : (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={160}
                  height={160}
                  className="w-auto !bg-gray-200 min-w-[160px] min-h-[160px] max-h-[160px] relative -top-16"
                />
              )}
            </div>
            <div className="grid md:grid-cols-2 grid-cols-2 md:gap-8 gap-2">
              <div className="flex flex-col gap-1 md:mr-20 mr-4">
                <h2 className="text-grey600 md:text-sm text-xs font-bold leading-5">
                  Firstname
                </h2>
                <h4 className="text-grey500 font-medium md:text-sm text-xs  leading-4">
                  {data?.FirstName || '....'}
                </h4>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-grey600 md:text-sm text-xs font-bold leading-5">
                  Lastname
                </h2>
                <h4 className="text-grey500 md:text-sm text-xs font-medium leading-4">
                  {data?.SurName || '...'}
                </h4>
              </div>
              <div className="flex flex-col gap-1 mr-20">
                <h2 className="text-grey600 md:text-sm text-xs font-bold leading-5">
                  Othername
                </h2>
                <h4 className="text-grey500 md:text-sm text-xs font-medium leading-4">
                  {data?.OtherNames || '...'}
                </h4>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-grey600 md:text-sm text-xs font-bold leading-5">
                  Phone
                </h2>
                <h4 className="text-grey500 md:text-sm text-xs font-medium leading-4">
                  {data?.PhoneNumber || '...'}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white mt-28 rounded-lg md:mx-[30px] mx-0 p-8">
          <div className="text-primary font-bold mb-3">
            <h2>Basic Information</h2>
          </div>
          <hr />
          <div className="flex flex-col gap-y-6 mt-6">
            <div className="flex gap-x-16">
              <h3 className="font-bold w-[20%]">Gender</h3>{' '}
              <span>{data?.Gender || '...'}</span>
            </div>
            <div className="flex gap-x-16">
              <h3 className="font-bold w-[20%]">Date of Birth</h3>{' '}
              <span>{data?.DateOfBirth || '...'}</span>
            </div>
            <div className="flex gap-x-16">
              <h3 className="font-bold w-[20%]">Marital Status</h3>{' '}
              <span>{data?.MaritalStatus || '...'}</span>
            </div>
            <div className="flex gap-x-16">
              <h3 className="font-bold w-[20%]">Department</h3>{' '}
              <span>{data?.Department || '...'}</span>
            </div>
            <div className="flex gap-x-16">
              <h3 className="font-bold w-[20%]">Member Since</h3>{' '}
              <span>{data?.YearJoined || '...'}</span>
            </div>
          </div>
        </div>
        <div className="bg-white mt-5 rounded-lg md:mx-[30px] mx-0 p-8">
          <div className="text-primary font-bold mb-3">
            <h2>Contact Information</h2>
          </div>
          <hr />
          <div className="flex flex-col gap-y-6 mt-6">
            <div className="flex gap-x-16">
              <h3 className="font-bold w-[20%]">Phone</h3>{' '}
              <span>{data?.PhoneNumber || '...'}</span>
            </div>
            <div className="flex gap-x-16">
              <h3 className="font-bold w-[20%]">Email</h3>{' '}
              <span>{data?.Email || '...'}</span>
            </div>
            <div className="flex gap-x-16">
              <h3 className="font-bold w-[20%]">Address</h3>{' '}
              <span>{data?.HomeAddress || '...'}</span>
            </div>
            <div className="flex gap-x-16">
              <h3 className="font-bold w-[20%]">Nearest Bus Stop</h3>{' '}
              <span>{data?.NearestBusStop || '...'}</span>
            </div>
            <div className="flex gap-x-16">
              <h3 className="font-bold w-[20%]">City of Residence</h3>{' '}
              <span>{data?.City || '...'}</span>
            </div>
            <div className="flex gap-x-16">
              <h3 className="font-bold w-[20%]">State of Residence</h3>{' '}
              <span>{data?.StateName || '...'}</span>
            </div>

            <div className="flex gap-x-16">
              <h3 className="font-bold w-[20%]">Country</h3>{' '}
              <span>{data?.CountryName || '...'}</span>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[150px] mt-5 rounded-lg md:mx-[30px] mx-0 p-8 mb-10">
          <div className="text-primary font-bold mb-3">
            <h2>Account Management</h2>
          </div>
          <hr />
          <div>
            <div className="my-6">
              <h3 className="font-bold mb-2">Password</h3>
              <div className="md:flex justify-between items-center">
                <p>
                  A secure password helps protect your Account. <br /> Always
                  ensure your passords are 8 characters long <br /> and are a
                  combination of alphabets, numbers and symbols.
                </p>
                <div>
                  {' '}
                  <Button
                    onClick={() => setShowPasswordFields(!showPasswordFields)}
                    title={!showPasswordFields ? 'Set New Password' : 'Cancel'}
                    className="text-sm rounded-md mt-5 md:mt-0"
                    backgroundColor="bg-primary"
                    type="submit"
                    isLoading={false}
                  />
                </div>
              </div>
            </div>

            {showPasswordFields && (
              <div className="border p-5 rounded">
                <Formik
                  initialValues={{
                    current_password: '',
                    new_password: '',
                    confirm_password: '',
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
                    <Form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-y-6"
                    >
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
                      <div className="">
                        <Button
                          title="Change Password"
                          className="text-sm rounded-md"
                          backgroundColor="bg-[#38404b]"
                          type="submit"
                          isLoading={isSubmitting}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
