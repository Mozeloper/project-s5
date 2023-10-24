import React, { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { GiConfirmed } from 'react-icons/gi'
import { GrView } from 'react-icons/gr'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { useQueryClient } from 'react-query'
import { useFetchDti } from '../../hooks/useFetchDti'
import { suspendAConvert } from '../../services/admins.api'
import Loader from '../Loader'
import PaginationFooter from '../PaginationFooter'
import SearchBox from '../Searchbox/searchbox'
import PromoteScreen from '../UI/PromoteScreen'
import SuspendConvert from '../UI/SuspendConvert'
import ReusableTable from './Table.reusable'
import { useTextSearchNav } from '../../context/textSearch.context'

export default function DtiTable() {
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  // let { textSearch, setTextSearch } = useTextSearchNav()
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [displayUi, setDisplayUi] = React.useState(null);
  const [textSearch, setTextSearch ] = useState('');

  /**
   * Hook for fetching all converts in DTI Stage
   */
  const {
    data: DtiConverts,
    isError,
    isLoading,
    isFetching,
    error,
  } = useFetchDti({ pageNumber, pageSize, searchquery: textSearch });

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
    { icon: <GiConfirmed className="text-green-500" />, name: 'Promote' },
    {
      icon: <IoRemoveCircleSharp className="text-yellow-500" />,
      name: 'Disable',
    },
  ];

  const handleModifyConvert = (id) => {
    console.log(`modifying convert with ${id}`);
  };


  const handleSearchChange = (newQuery) => {
    setTextSearch(prev => prev = newQuery)
  }
  
  /**
   * Handler for suspending a Convert from DTI
   * @param {number} id
   * @param {string} reason
   */
  const handleSuspendCovert = async (id, reason) => {
    const suspededConvert = await suspendAConvert(id, reason);
    if (suspededConvert.StatusCode === 200) {
      toast.success(suspededConvert.Message);
      //update the data on the table by invalidating the dti query
      queryClient.invalidateQueries('DtiConverts');
    }
  };

  /**
   * Fnction in charge of handling the modal to display based of the option selected
   * @param {Event} event
   * @param {Object} option
   */
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
    } else if (innerText.toLowerCase() === 'disable') {
      setDisplayUi(
        <SuspendConvert
          handleDeactivate={handleSuspendCovert.bind(null, id)}
          screenName={innerText}
        />
      );
    }
  };

  /**
   * Function for swithching pagination
   * @param {Event} event
   * @param {number} value
   */
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
                Disciples In Training
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
                <div className="flex  flex-col justify-center items-center h-96 bg-gray-200  p-10 md:p-16">
                  <h3 className="font-bold mb-3">
                    At the moment, there are no converts registered in DTI.
                  </h3>
                  <p>Please check back later for updates.</p>
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
                    textSearch={textSearch}
                    setTextSearch={handleSearchChange}
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
