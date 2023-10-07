import React, { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { GrView } from 'react-icons/gr'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { useFetchMinistry } from '../../hooks/useFetchMinistry'
import { suspendAConvert } from '../../services/admins.api'
import Loader from '../Loader'
import PaginationFooter from '../PaginationFooter'
import SearchBox from '../Searchbox/searchbox'
import SuspendConvert from '../UI/SuspendConvert'
import ReusableTable from './Table.reusable'
import { useTextSearchNav } from '../../context/textSearch.context'

export default function MinstryTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  let { textSearch, setTextSearch } = useTextSearchNav()
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [displayUi, setDisplayUi] = React.useState(null);
  const {
    data: MinistryData,
    isError,
    isLoading,
    isFetching,
    error,
  } = useFetchMinistry({ pageNumber, pageSize, searchquery: textSearch });

  useEffect(() => {
    const getPosts = async () => {
      const ministry = (await MinistryData?.Data) || [];
      setData(ministry);
      //Object.keys returns the property names of/in an object as string of arrays
      setHeaders(Object.keys(ministry[0] || []));
    };
    getPosts();
  }, [MinistryData]);

  const optionList = [
    { icon: <GrView className="text-blue-500" />, name: 'View' },
    {
      icon: <IoRemoveCircleSharp className="text-yellow-500" />,
      name: 'Suspend',
    },
  ];

  const handleSuspendCovert = async (id, reason) => {
    console.log(`suspend convert with id of ${id} and ${reason}`);
    const suspededConvert = await suspendAConvert(id, reason);
    console.log(suspededConvert.Message);
    if (suspededConvert.StatusCode === 200) {
      toast.success(suspededConvert.Message);
    }

  };

  

  const handleOptionsClick = (event, option) => {
    const innerText = option.name;
    const id = event.currentTarget.id;
    if (innerText.toLowerCase() === 'suspend') {
      setDisplayUi(
        <SuspendConvert
          handleDeactivate={handleSuspendCovert.bind(null, id)}
          screenName={innerText}
        />
      );
    }
  };

  const handlePaginationChange = (event, value) => {
    setPageNumber(value);
  };

  return (
    <Fragment>
      <div className="bg-white">
        {/* <SearchBox /> */}
        <div className="px-4 sm:px-6 lg:px-8 bg-white py-7">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Ministry
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                The list of all the Ministers.
              </p>
            </div>
            {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                className="block rounded-md px-3 bg-[#Bf0A30] py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#38404b] delay-100 ease-in-out duration-300 p-6"
              > 
                <TransitionsModal name={'+ Add Soul'} heading={'Add New Soul Form'} width={'max-w-6xl w-[90%]'}>
                  <AddSoulsFormControl />
                </TransitionsModal>
              </button>
            </div> */}
          </div>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div>An Error occurred: {error.message} </div>
          ) : (
            <>
              {data?.length < 1 ? (
                <div className="flex justify-center items-center h-96">
                  Sorry! An error occurred, refresh and try again
                </div>
              ) : (
                <>
                  <ReusableTable
                    pageLink={'ministry'}
                    optionModal={displayUi}
                    headers={headers}
                    data={data}
                    filterNumber={10}
                    optionArrayList={optionList}
                    optionsHandleClick={handleOptionsClick}
                  />

                  <PaginationFooter
                    pageNumber={pageNumber}
                    totalPerCount={Math.ceil(
                      MinistryData?.TotalDataCount / pageSize
                    )}
                    totalCount={Math.ceil(MinistryData?.TotalDataCount)}
                    handlePaginationChange={handlePaginationChange}
                  />
                </>
              )}
            </>
          )}
          <div className="flex justify-center items-center">
            {!isLoading && isFetching && 'Loading...'}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
