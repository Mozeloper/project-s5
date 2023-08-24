import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../../../components/Button";
import SearchableSelect from "../../../../components/CustomSelect";
import { useNavigate } from "react-router-dom";

export default function ChurchInformation({
  userValues,
  setUserValues,
  setCurrentStep,
}) {
  const navigate = useNavigate();
  const signupSchema = Yup.object().shape({
    yearJoined: Yup.number().required("Input Year Joined"),
    departmentId: Yup.number().required("Select Department"),
  });

  return (
    <div className="w-full h-full">
      <h2 className="font-black text-center text-2xl md:text-secondary text-white mb-4">
        Church Information
      </h2>
      <Formik
        initialValues={{
          yearJoined: userValues?.yearJoined || "",
          departmentId: userValues?.departmentId || "",
        }}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          setUserValues((prev) => ({ ...prev, ...values }));
          navigate("/");
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
            <div className="w-full flex flex-col-reverse gap-2">
              <div className="w-full mt-2">
                <label
                  className="text-sm md:text-black text-white leading-4"
                  htmlFor="departmentId"
                >
                  Gender <span className="text-primary ml-1">*</span>
                </label>
                <SearchableSelect
                  options={[{ label: "Chior", value: 1 }]}
                  name="departmentId"
                  id="departmentId"
                  value={values.departmentId}
                  setFieldValue={(name, value) => setFieldValue(name, value)}
                  className="w-full outline-none"
                  placeholder="Select department"
                />
                {errors.departmentId && touched.departmentId ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.departmentId}
                  </div>
                ) : null}
              </div>
              <div className="mb-1 w-full">
                <label
                  htmlFor="yearJoined"
                  className={`text-sm md:text-black text-white leading-4`}
                >
                  Year Joined Church{" "}
                  <span className="text-primary ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="yearJoined"
                  id="yearJoined"
                  className={`w-full h-[56px] border border-secondary text-sm px-4 rounded-lg mt-2 outline-none bg-background_white focus:bg-background_white`}
                  placeholder="Enter yearJoined"
                  onChange={handleChange}
                  value={values?.yearJoined}
                />
                {errors.yearJoined && touched.yearJoined ? (
                  <div className="text-xs mt-2 text-red-700">
                    {errors.yearJoined}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex justify-end w-full">
              <Button
                title="Submit"
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
