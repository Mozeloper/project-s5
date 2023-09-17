import React from 'react';
import ReturnToPrevious from './../ReturnToPrevious';
import NotFoundImg from '../../assets/not-found.jpg';

export default function ResultNotFound() {
  return (
    <>
      <div className=" bg-white p-5">
        <ReturnToPrevious />
        <div className="flex flex-col items-center justify-center h-[84dvh] text-center">
          <img src={NotFoundImg} className="w-[200px]" />
          <h1 className="text-3xl mt-4"> Record Not Found</h1>
          {/* <p className="text-xl text-primary mb-8">No record was found.</p> */}
        </div>
      </div>
    </>
  );
}
