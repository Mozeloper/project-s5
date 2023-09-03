import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import AccountInformation from "./component/AccountInformation";
import PersonalInformation from "./component/PersonalInformation";
import ChurchInformation from "./component/ChurchInformation";

export default function Register() {
  const [steps] = useState([
    { name: "Account Information" },
    { name: "Personal Information" },
    { name: "Church Information" },
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [userValues, setUserValues] = useState({});

  const current = {
    0: (
      <AccountInformation
        userValues={userValues}
        setUserValues={setUserValues}
        setCurrentStep={setCurrentStep}
      />
    ),
    1: (
      <PersonalInformation
        userValues={userValues}
        setUserValues={setUserValues}
        setCurrentStep={setCurrentStep}
      />
    ),
    2: (
      <ChurchInformation
        userValues={userValues}
        setUserValues={setUserValues}
      />
    ),
  };
  return (
    <>
      <div className="w-full h-full md:mt-32 mt-0 lg:px-8 md:px-4 px-2">
        <Stepper activeStep={currentStep}>
          {steps.map((step, index) => {
            return (
              <Step
                key={index}
                label={step.name}
                activebgcolor="text-primary"
                activetextcolor="text-primary"
              />
            );
          })}
        </Stepper>
        <div className="w-full md:mt-4 mt-2 lg:px-16 px-0">
          {current[currentStep]}
        </div>
      </div>
    </>
  );
}
