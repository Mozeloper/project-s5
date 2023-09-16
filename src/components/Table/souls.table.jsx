import React, { Fragment, useEffect, useState } from "react";
import PaginationFooter from "../PaginationFooter";
import SearchBox from "../Searchbox/searchbox";
import TransitionsModal from "../ModalPopup/modalTransition";
import { ButtonBase } from "@mui/material";
import AddSoulsFormControl from "../UI/Forms/addSoul.form";
import ReusableTable from "./Table.reusable";
import { useFetchAllNewConvert } from "../../hooks/useFetchNewConvert";
import { camelCaseToSingleWords } from "../../Helper/toSeperateWord";
import { GrView } from 'react-icons/gr'
import { useNavigate } from "react-router-dom";

export const SoulsTable = () => {
  const [headers, setHeaders] = useState([] || undefined || null);
  const [data, setData] = useState([]);
  const [displayUi, setDisplayUi] = React.useState(null)
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPerPage, setTotalPerPage] = useState(7);
  const { data: adminsData, isError, isLoading } = useFetchAllNewConvert({ pageNumber });

  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const admins = await adminsData?.data;
      setData(!isError && admins);
      //Object.keys returns the property names of/in an object as string of arrays
      setHeaders(Object?.keys(!isError && admins[0]));
    };
    getPosts();
  }, [adminsData, useFetchAllNewConvert, data]); 

  const optionList = [
    { icon: <GrView className='text-blue-500' />, name: 'View' }      
  ];

  ///
  const rows = [
  {
    jobTitle: 'Head of Human Resources',
    recruitmentDate: new Date(2020, 8, 12),
    contract: 'full time',
    id: 0,
  },
  {
    jobTitle: 'Head of Sales',
    recruitmentDate: new Date(2017, 3, 4),
    contract: 'full time',
    id: 1,
  },
  {
    jobTitle: 'Sales Person',
    recruitmentDate: new Date(2020, 11, 20),
    contract: 'full time',
    id: 2,
  },
  {
    jobTitle: 'Sales Person',
    recruitmentDate: new Date(2020, 10, 14),
    contract: 'part time',
    id: 3,
  },
  {
    jobTitle: 'Sales Person',
    recruitmentDate: new Date(2017, 10, 29),
    contract: 'part time',
    id: 4,
  },
  {
    jobTitle: 'Sales Person',
    recruitmentDate: new Date(2020, 7, 21),
    contract: 'full time',
    id: 5,
  },
  {
    jobTitle: 'Sales Person',
    recruitmentDate: new Date(2020, 7, 20),
    contract: 'intern',
    id: 6,
  },
  {
    jobTitle: 'Sales Person',
    recruitmentDate: new Date(2019, 6, 28),
    contract: 'full time',
    id: 7,
  },
  {
    jobTitle: 'Head of Engineering',
    recruitmentDate: new Date(2016, 3, 14),
    contract: 'full time',
    id: 8,
  },
  {
    jobTitle: 'Tech lead front',
    recruitmentDate: new Date(2016, 5, 17),
    contract: 'full time',
    id: 9,
  },
  {
    jobTitle: 'Front-end developer',
    recruitmentDate: new Date(2019, 11, 7),
    contract: 'full time',
    id: 10,
  },
  {
    jobTitle: 'Tech lead devops',
    recruitmentDate: new Date(2021, 7, 1),
    contract: 'full time',
    id: 11,
  },
  {
    jobTitle: 'Tech lead back',
    recruitmentDate: new Date(2017, 0, 12),
    contract: 'full time',
    id: 12,
  },
  {
    jobTitle: 'Back-end developer',
    recruitmentDate: new Date(2019, 2, 22),
    contract: 'intern',
    id: 13,
  },
  {
    jobTitle: 'Back-end developer',
    recruitmentDate: new Date(2018, 4, 19),
    contract: 'part time',
    id: 14,
  },
];

const columns = [
  { 
    field: 'firstName', 
    headerName: 'First Name', 
    width: 200 
  },
  // { 
  //   field: 'surname', 
  //   headerName: 'Surname', 
  //   width: 200,
  // },
  // {
  //   field: 'email',
  //   headerName: 'Email',
  //   // type: 'date',
  //   width: 150,
  // },
  // {
  //   field: 'edit',
  //   headerName: 'Edit',
  //   type: 'singleSelect',
  //   valueOptions: ['full time', 'part time', 'intern'],
  //   width: 150,
  // },
];

const col = headers.map(head => {
  return   { 
    field: head, 
    headerName: camelCaseToSingleWords(head), 
    width: 150 
  }
})

  const handleOptionsClick = (event) => {
    const innerText = event.currentTarget.innerText
    const id = event.currentTarget.id
    if ( innerText.toLowerCase() === 'view') {
      navigate(`/souls/${id}`);
    }
  };
  
  const handleChange = (event, value) => {
    setPageNumber(value);
  };

  return (
    <Fragment>
      <div className="bg-white">
        <SearchBox />
        <div className="px-4 sm:px-6 lg:px-8 bg-white py-7">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Souls
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the souls in your account including their name,
                email, role and Presence.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <ButtonBase className="block rounded-md px-3 bg-[#Bf0A30] py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#38404b] delay-100 ease-in-out duration-300 p-6">
                <TransitionsModal
                  name={"+ Add Soul"}
                  heading={"Add New Soul Form"}
                  width={"max-w-6xl w-[90%]"}
                >
                  <AddSoulsFormControl />
                </TransitionsModal>
              </ButtonBase>
            </div>
          </div>
          {
            !isError && data?.length < 1 ? <div className='flex justify-center text-center items-center h-96'>There's No data available for this table at the moment</div> : 
            <>
              <ReusableTable optionModal={displayUi} optionArrayList={optionList} optionsHandleClick={handleOptionsClick} headers={headers} data={!isError && data} filterNumber={9} />

              <PaginationFooter pageNumber={pageNumber} totalPerCount={Math.ceil(!isError && data?.length / totalPerPage)} totalCount={Math.ceil(adminsData?.totalDataCount)} handleChange={handleChange}/> 
            </>
          }
        </div>
      </div>
    </Fragment>
  );
};
