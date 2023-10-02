import React, { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { GiConfirmed } from 'react-icons/gi'
import { GrView } from 'react-icons/gr'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useFetchDti } from '../../hooks/useFetchDti'
import { suspendAConvert } from '../../services/admins.api'
import Loader from '../Loader'
import PaginationFooter from '../PaginationFooter'
import SearchBox from '../Searchbox/searchbox'
import PromoteScreen from '../UI/PromoteScreen'
import SuspendConvert from '../UI/SuspendConvert'
import ReusableTable from './Table.reusable'

export default function DtiTable() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [displayUi, setDisplayUi] = React.useState(null);
  const {
    data: DtiConverts,
    isError,
    isLoading,
    isFetching,
    error,
  } = useFetchDti();

  useEffect(() => {
    const getPosts = async () => {
      const dtiRes = (await DtiConverts?.Data) || [];
      if (dtiRes == null || dtiRes == undefined) {
        setData([]);
      }
      setData(!isError && dtiRes);
      setHeaders(Object.keys(dtiRes[0] || []));
    };
    // console.log(data);
    getPosts();
  }, [DtiConverts]);

  const optionList = [
    { icon: <GrView className="text-blue-500" />, name: 'View' },
    {
      icon: <IoRemoveCircleSharp className="text-yellow-500" />,
      name: 'Suspend',
    },
    { icon: <GiConfirmed className="text-green-500" />, name: 'Promote' },
  ];

  const handleModifyConvert = (id) => {
    console.log(`modifying convert with ${id}`);
  };
  const handleSuspendCovert = async (id, reason) => {
    console.log(`suspend convert with id of ${id} and ${reason}`);
    // const {suspededConvert, isLoading, isError}= useSuspendAConvert(id, reason);

    const suspededConvert = await suspendAConvert(id, reason);
    console.log(suspededConvert.Message);
    if (suspededConvert.StatusCode === 200) {
      toast.success(suspededConvert.Message);
    }

    //  console.log(suspededConvert);
  };

  const handleDtiOptionsClick = (event, option) => {
    const innerText = option.name;
    console.log(innerText);
    const id = event.currentTarget.id;
    if (innerText.toLowerCase() === 'promote') {
      setDisplayUi(
        <PromoteScreen
          workerId={id}
          screenName={innerText}
          handlePromote={handleModifyConvert.bind(null, id)}
        />
      );
    } else if (innerText.toLowerCase() === 'suspend') {
      setDisplayUi(
        <SuspendConvert
          handleDeactivate={handleSuspendCovert.bind(null, id)}
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
                DTI
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                List of Converts in Discipleship In Training Institue.
              </p>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div>An Error occurred: {error.message} </div>
          ) : (
            <>
              {data?.length < 1 || !data ? (
                <div className="flex justify-center items-center h-96">
                  Sorry! An error occurred, refresh and try again
                </div>
              ) : (
                <>
                  <ReusableTable
                    pageLink={'dti'}
                    optionModal={displayUi}
                    headers={headers}
                    data={!isError && data}
                    filterNumber={10}
                    optionArrayList={optionList}
                    optionsHandleClick={handleDtiOptionsClick}
                  />

                  <PaginationFooter
                    pageNumber={pageNumber}
                    totalPerCount={Math.ceil(
                      DtiConverts?.TotalDataCount / pageSize
                    )}
                    totalCount={Math.ceil(DtiConverts?.TotalDataCount)}
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
