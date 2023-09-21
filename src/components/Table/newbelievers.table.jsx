import React, { useState, useEffect, Fragment } from 'react';
import SearchBox from '../Searchbox/searchbox';
import ReusableTable from './Table.reusable';
import PaginationFooter from '../PaginationFooter';
import { useFetchNewBelievers } from '../../hooks/useFetchNewBelievers';
import ConfirmDeactivate from '../UI/confirmation screen';
import { GrView } from 'react-icons/gr';
import { GiConfirmed } from 'react-icons/gi';
import { IoRemoveCircleSharp } from 'react-icons/io5';
import Loader from '../Loader';

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

  const optionList = [
    { icon: <GrView className="text-blue-500" />, name: 'View' },
    { icon: <GiConfirmed className="text-green-500" />, name: 'Modify' },
    {
      icon: <IoRemoveCircleSharp className="text-yellow-500" />,
      name: 'Suspend',
    },
  ];

  const handleOptionsClick = (event) => {
    const innerText = event.currentTarget.innerText;
    const id = event.currentTarget.id;
    if (innerText.toLowerCase() === 'view') {
      setDisplayUi(
        <ConfirmDeactivate
          handleDeactivate={handleViewAdmin.bind(null, id)}
          screenName={innerText}
        />
      );
    } else if (innerText.toLowerCase() === 'modify') {
      setDisplayUi(
        <ConfirmDeactivate
          handleDeactivate={handleModifyAdmin.bind(null, id)}
          screenName={innerText}
        />
      );
    } else {
      setDisplayUi(
        <ConfirmDeactivate
          handleDeactivate={handleSuspendAdmin.bind(null, id)}
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
        <SearchBox />
        <div className="px-4 sm:px-6 lg:px-8 bg-white py-7">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                newBelieversRes
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
                    pageLink={'newBelieversRes'}
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
