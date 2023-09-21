import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../Searchbox/searchbox';
import ReusableTable from './Table.reusable';
import PaginationFooter from '../PaginationFooter';
import { useFetchDti } from '../../hooks/useFetchDti';
import ConfirmDeactivate from '../UI/confirmation screen';
import { GrView } from 'react-icons/gr';
import { GiConfirmed } from 'react-icons/gi';
import { IoRemoveCircleSharp } from 'react-icons/io5';
import Loader from '../Loader';
import PromoteScreen from '../UI/PromoteScreen'

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
      const dtiRes = await DtiConverts?.data;
      if (dtiRes == null || dtiRes == undefined) {
        setData([]);
      }
      setData(!isError && dtiRes);
      setHeaders(Object.keys(dtiRes[0]));
    };
    console.log(data);
    getPosts();
  }, [useFetchDti, DtiConverts, data]);

  const optionList = [
    { icon: <GrView className="text-blue-500" />, name: 'View' },
    { icon: <GiConfirmed className="text-green-500" />, name: 'Promote' },
    {
      icon: <IoRemoveCircleSharp className="text-yellow-500" />,
      name: 'Suspend',
    },
  ];

    const handleModifyConvert = (id) => {
      console.log(`modifying convert with ${id}`);
    };
    const handleSuspendCovert = (id) => {
      console.log(`suspend convert with id of ${id}`);
    };

  const handleDtiOptionsClick = (event) => {
    const innerText = event.currentTarget.innerText;
    const id = event.currentTarget.id;
     if (innerText.toLowerCase() === 'promote') {
      setDisplayUi(
        <PromoteScreen
          workerId={id}
          screenName={innerText}
        />
      );
    } else {
      setDisplayUi(
        <ConfirmDeactivate
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
                      DtiConverts?.totalDataCount / pageSize
                    )}
                    totalCount={Math.ceil(DtiConverts?.totalDataCount)}
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
