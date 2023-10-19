import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Stepper, Step } from "react-form-stepper";
import AccountInformation from "./component/AccountInformation";
import PersonalInformation from "./component/PersonalInformation";
import ChurchInformation from "./component/ChurchInformation";

export default function Register() {
    const [RegSent, setRegSent] = useState(true);

  const [steps] = useState([
    { name: "Account Information" },
    { name: "Personal Information" },
    { name: "Church Information" },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
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
        setRegSent={setRegSent}
      />
    ),
  };
  return (
    <>
      {/* <div
        className={`${RegSent === false} ? 'md:bg-[#22931] md:flex md:flex-col md:items-center md:mt-auto' : 'md:mt-32' 'w-full h-full mt-0 lg:px-8 md:px-4 px-2'`}
      > */}
      <div
        className={
          RegSent === false
            ? 'md:bg-[#232931] md:flex md:flex-col md:justify-center md:mt-auto w-full h-full mt-0 lg:px-8 md:px-4 px-2'
            : 'md:mt-32 w-full h-full mt-0 lg:px-8 md:px-4 px-2'
        }
      >
        {RegSent ? (
          <>
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
          </>
        ) : (
          <div className="rounded bg-white px-5 py-10">
            <h2>
              Dearly <span className="text-primary">Beloved</span>, <br />
              Thank you for your commitment to this vision and also taking some
              time to register.
            </h2>
            <p>
              You might not be able to login at the moment as your account needs
              approval for access.
            </p>
            <p>
              Please be patient as the process takes about 2 minutes - 24 hours.
            </p>
            <p>
              You will receive a mail upon approval. Thanks for your labour of
              love. God bless.
            </p>
          
            <Link to="/" className="underline text-primary mt-3 md:mt-10">
              Proceed to Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
