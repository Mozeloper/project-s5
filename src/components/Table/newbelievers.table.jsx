import React, { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { GiConfirmed } from 'react-icons/gi'
import { GrView } from 'react-icons/gr'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { useFetchNewBelievers } from '../../hooks/useFetchNewBelievers'
import { suspendAConvert } from '../../services/admins.api'
import Loader from '../Loader'
import PaginationFooter from '../PaginationFooter'
import SearchBox from '../Searchbox/searchbox'
import PromoteConvertToDti from '../UI/PromoteScreen/PromoteConvertToDti'
import SuspendConvert from '../UI/SuspendConvert'
import ReusableTable from './Table.reusable'

export default function NewBelieversTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [displayUi, setDisplayUi] = React.useState(null);
  const {
    data: NewBelieversData,
    isError,
    isLoading,
    isFetching,
    error,
  } = useFetchNewBelievers({ pageNumber, pageSize });

  useEffect(() => {
    const getPosts = async () => {
      const newBelieversRes = (await NewBelieversData?.Data) || [];
      setData(newBelieversRes);
      setHeaders(Object.keys(newBelieversRes[0] || []));
    };
    getPosts();
  }, [NewBelieversData]);

//   useEffect(() => {
//   const listener = async () => {
//     // Refetch the data
//     await useFetchNewBelievers({ pageNumber, pageSize });
//   };

//   document.addEventListener('suspendConvert', listener);

//   return () => {
//     document.removeEventListener('suspendConvert', listener);
//   };
// }, []);

  const optionList = [
    { icon: <GrView className="text-blue-500" />, name: 'View' },
    { icon: <GiConfirmed className="text-green-500" />, name: 'Promote' },
    {
      icon: <IoRemoveCircleSharp className="text-yellow-500" />,
      name: 'Suspend',
    },
  ];



  const handlePromoteToDti = (id) => {
    console.log(`promoted convert with ${id} to DTI`);
  };

  const handleSuspendNBCovert = async (id, reason) => {
    console.log(`suspend convert with id of ${id} and ${reason}`);
    // const {suspededConvert, isLoading, isError}= useSuspendAConvert(id, reason);

    const suspededConvert = await suspendAConvert(id, reason);
    console.log(suspededConvert.Message);
    if (suspededConvert.StatusCode === 200) {
      toast.success(suspededConvert.Message);
      // Refetch the data after suspending the convert
       useFetchNewBelievers({ pageNumber, pageSize });
    }

    //  console.log(suspededConvert);
  };

   const handleOptionsClick = (event, option) => {
     const innerText = option.name;
     console.log(innerText);
     const id = event.currentTarget.id;
     if (innerText.toLowerCase() === 'promote') {
       setDisplayUi(
         <PromoteConvertToDti
           workerId={id}
           screenName={innerText}
           handlePromote={handlePromoteToDti.bind(null, id)}
         />
       );
     } else if (innerText.toLowerCase() === 'suspend') {
       setDisplayUi(
         <SuspendConvert
           handleDeactivate={handleSuspendNBCovert.bind(null, id)}
           screenName={innerText}
         />
       );
       console.log('suspend was clicked ' + `${id}`);
     }
   };

  const handlePaginationChange = (event, value) => {
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
                New Believers
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                The list of all the Ministers.
              </p>
            </div>
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
                    pageLink={'newconverts'}
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
                      NewBelieversData?.TotalDataCount / pageSize
                    )}
                    totalCount={Math.ceil(NewBelieversData?.TotalDataCount)}
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
