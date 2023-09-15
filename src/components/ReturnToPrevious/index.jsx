import React from 'react';

import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from '@mui/icons-material';

export default function ReturnToPrevious() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div
        className="text-white cursor-pointer hover:bg-slate-500 max-w-[70px]"
        onClick={handleBackClick}
      >
        <ChevronLeft className="h-8 bg-primary rounded-sm mr-2" />
        <small>Back</small>
      </div>
    </>
  );
}
