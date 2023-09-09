import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Button from "../../../../components/Button";
import { appUrls } from "../../../../services/urls";
import { api } from "../../../../services/api";
import { toast } from "react-hot-toast";
import SearchableSelect from "../../../../components/CustomSelect";
import moment from "moment";

export default function Update({ setOpenModal, data, handleGetUser }) {
  const updateUserSchema = Yup.object().shape({
    Email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    FirstName: Yup.string().required("First Name is required"),
    SurName: Yup.string().required("Last Name is required"),
    PhoneNumber: Yup.string().required("Phone number is required"),
    Gender: Yup.string().required("Gender is required"),
    OtherNames: Yup.string(),
  });

  const handleUpdateUser = async (payload, actions) => {
    try {
      const res = await api.post(appUrls.UPDATEUSER_URL, payload);
      if (res?.status === 200) {
        handleGetUser();
        setOpenModal(false);
        toast.success("Updated Successful", {
          icon: "👏",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(error?.data?.message, 4);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1000px] w-[1000px] min-h-[680px] md:h-auto h-full bg-white p-[2%] rounded-lg overflow-scroll">
      <div className="flex justify-end w-full">
        <AiOutlineCloseCircle
          className="cursor-pointer w-[30px] h-[30px] text-secondary"
          onClick={() => setOpenModal(false)}
        />
      </div>
      <h3 className="mb-4 font-bold first-letter:text-3xl first-letter:font-bold text-normal text-lg leading-7">
        Update Information
      </h3>
      <Formik
        initialValues={{
          FirstName: data?.FirstName || "",
          SurName: data?.SurName || "",
          OtherNames: data?.OtherNames || "",
          Email: data?.Email || "",
          PhoneNumber: data?.PhoneNumber || "",
          Gender: data?.Gender || "",
        }}
        validationSchema={updateUserSchema}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          const formattedDate = moment(data?.DateOfBirth).format(
            "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
          );
          const payload = {
            firstName: values?.FirstName,
            userName: data?.UserName,
            surName: values?.SurName,
            otherNames: values?.OtherNames,
            email: values?.Email,
            gender: values?.Gender,
            phoneNumber: values?.PhoneNumber,
            dateOfBirth: formattedDate,
            department: "",
            employmentStatus: data?.EmploymentStatus,
            maritalStatus: data?.MaritalStatus,
            countryName: data?.CountryName,
            stateName: data?.StateName,
            localGovtName: data?.LocalGovtName,
            homeAddress: data?.HomeAddress,
            nearestBusStop: data?.NearestBusStop,
            qualification: data?.Qualification,
            nameOfOrganization: data?.NameOfOrganization,
            yearJoined: data?.YearJoined,
          };
          handleUpdateUser(payload, actions);
        }}
      >
        {({
          handleSubmit,
          setFieldValue,
          handleChange,
          values,
          isSubmitting,
          touched,
          errors,
        }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="w-full flex md:flex-row flex-col gap-3">
              <div className="w-full flex flex-col">
                <label
                  className="text-sm text-black leading-4"
                  htmlFor="FirstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="FirstName"
                  id="FirstName"
                  className={`w-full h-[41px] text-sm px-4 border border-secondary rounded-lg mt-2 outline-none bg-grey700`}
                  placeholder="First Name"
                  onChange={handleChange}
                  value={values?.FirstName}
                />
                {errors.FirstName && touched.FirstName ? (
                  <div className="text-xs text-red-700">{errors.FirstName}</div>
                ) : null}
              </div>
              <div className="w-full flex flex-col">
                <label
                  className="text-sm text-black leading-4"
                  htmlFor="SurName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="SurName"
                  id="SurName"
                  className={`w-full h-[41px] text-sm px-4  border border-secondary rounded-lg mt-2 outline-none bg-grey700`}
                  placeholder="Last Name"
                  onChange={handleChange}
                  value={values?.SurName}
                />
                {errors.SurName && touched.SurName ? (
                  <div className="text-xs text-red-700">{errors.SurName}</div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:flex-row-reserve flex-col-reverse gap-3">
              <div className="w-full flex flex-col">
                <label className="text-sm text-black leading-4" htmlFor="Email">
                  Email Address
                </label>
                <input
                  type="text"
                  name="Email"
                  id="Email"
                  className={`w-full h-[41px] text-sm px-4  border border-secondary rounded-lg mt-2 outline-none bg-grey700`}
                  placeholder="Email Address"
                  onChange={handleChange}
                  value={values?.Email}
                  readOnly
                />
                {errors.Email && touched.Email ? (
                  <div className="text-xs text-red-700">{errors.Email}</div>
                ) : null}
              </div>
              <div className="w-full flex flex-col">
                <label
                  className="text-sm text-black leading-4"
                  htmlFor="OtherNames"
                >
                  Other Names
                </label>
                <input
                  type="text"
                  name="OtherNames"
                  id="OtherNames"
                  className={`w-full h-[41px] text-sm px-4  border border-secondary rounded-lg mt-2 outline-none bg-grey700 focus:bg-none active:bg-transparent`}
                  placeholder="Other Names"
                  onChange={handleChange}
                  value={values?.OtherNames}
                />
                {errors.OtherNames && touched.OtherNames ? (
                  <div className="text-xs text-red-700">
                    {errors.OtherNames}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:flex-row flex-col gap-3">
              <div className="w-full flex flex-col">
                <label
                  className="text-sm text-black leading-4"
                  htmlFor="PhoneNumber"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  name="PhoneNumber"
                  id="PhoneNumber"
                  className={`w-full h-[41px] text-sm px-4  border border-secondary rounded-lg mt-2 outline-none bg-grey700`}
                  placeholder="Enter Username"
                  onChange={handleChange}
                  value={values?.PhoneNumber}
                />
                {errors.PhoneNumber && touched.PhoneNumber ? (
                  <div className="text-xs text-red-700">
                    {errors.PhoneNumber}
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <label className="text-sm ext-black leading-4" htmlFor="Gender">
                  Gender
                </label>
                <SearchableSelect
                  options={[
                    { label: "Male", value: 0 },
                    { label: "Female", value: 1 },
                  ]}
                  name="Gender"
                  id="Gender"
                  value={values.Gender}
                  setFieldValue={(name, value) => setFieldValue(name, value)}
                  className="w-full outline-none"
                  placeholder="Select Gender"
                  defaultValue={data?.Gender}
                />
                {errors.Gender && touched.Gender ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.Gender}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full flex md:justify-end md:flex-row flex-col-reverse md:gap-3 gap-0 mt-8">
              <Button
                title="Cancel"
                className="min-w-[150px] h-[43px] text-sm rounded-md border border-secondary"
                backgroundColor="bg-white"
                textColor="text-secondary"
                onClick={() => setOpenModal(false)}
              />
              <Button
                title="Save changes"
                className="h-[43px] text-sm rounded-md mb-4"
                backgroundColor="bg-secondary"
                type="submit"
                isLoading={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
