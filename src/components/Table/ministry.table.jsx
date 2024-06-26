import React, { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { GrView } from 'react-icons/gr'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { useQueryClient } from 'react-query'
import { useTextSearchNav } from '../../context/textSearch.context'
import { useFetchMinistry } from '../../hooks/useFetchMinistry'
import { suspendAConvert } from '../../services/admins.api'
import Loader from '../Loader'
import PaginationFooter from '../PaginationFooter'
import SuspendConvert from '../UI/SuspendConvert'
import ReusableTable from './Table.reusable'
import SearchBox from '../Searchbox/searchbox';

export default function MinstryTable() {
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // let { textSearch, setTextSearch } = useTextSearchNav()
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [displayUi, setDisplayUi] = React.useState(null);
  const [textSearch, setTextSearch ] = useState('');

  /**
   * Hook for fetching All Converts in Ministry Stage
   */
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
      name: 'disable',
    },
  ];

  const handleSearchChange = (newQuery) => {
    setTextSearch(prev => prev = newQuery)
  }

  /**
   * Handler for suspending a minstry convert
   * @param {number} id
   * @param {string} reason
   */
  const handleSuspendCovert = async (id, reason) => {
    const suspededConvert = await suspendAConvert(id, reason);
    if (suspededConvert.StatusCode === 200) {
      toast.success(suspededConvert.Message);
      //update data on the table
      queryClient.invalidateQueries('GetAllMinisters');
    }
  };

  /**
   * Handler for displaying modal
   * based on the option the user selects on the action menu
   * @param {Event} event
   * @param {Object} option
   */
  const handleOptionsClick = (event, option) => {
    const innerText = option.name;
    const id = event.currentTarget.id;
    if (innerText.toLowerCase() === 'disable') {
      setDisplayUi(
        <SuspendConvert
          handleDeactivate={handleSuspendCovert.bind(null, id)}
          screenName={innerText}
        />
      );
    }
  };

  /**
   * Pagination Handler
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
                Ministry Stage
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
                <div className="flex flex-col justify-center items-center h-96 bg-gray-200  p-10 md:p-16">
                  <h3 className="font-bold mb-3">
                    No Converts have been graduated to Ministers at the moment.
                  </h3>
                  <p>Please check back later for updates</p>
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
                    textSearch={textSearch}
                    setTextSearch={handleSearchChange}
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
