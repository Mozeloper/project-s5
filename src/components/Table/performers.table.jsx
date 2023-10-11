import React, { Fragment, useEffect, useState } from 'react'
import { GrView } from 'react-icons/gr'
import { useFetchTopPerformers } from '../../hooks/useFetchAnalytics'
import Loader from '../Loader'
import SearchBox from '../Searchbox/searchbox'
import ReusableTable from './Table.reusable'

export const PerformersTable = () => {

  const [headers, setHeaders] = useState([] || undefined || null);
  const [data, setData] = useState([]);
  const [displayUi, setDisplayUi] = React.useState(null);

  /**
   * Hook for fetching Top Performers
   */
  const {
    data: performersData,
    isError,
    isLoading,
  } = useFetchTopPerformers();


  useEffect(() => {
    const getPosts = async () => {
      const TopPerformersData = (await performersData?.Data) || [];
      if (TopPerformersData == null || TopPerformersData == undefined) {
        setData([]);
      }
      setData(TopPerformersData);
      setHeaders(Object.keys(TopPerformersData[0] || []));
    };
    getPosts();
  }, [performersData]);

  const optionList = [
    { icon: <GrView className="text-blue-500" />, name: 'View' },
  ];




  return (
    <Fragment>
      <div className="bg-white rounded-md w-full">
        <div className="px-4 sm:px-6 lg:px-8 bg-white py-7 rounded-md">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-lg font-bold leading-6 text-primary">
                List of Top Soul Winners.
              </h1>
            </div>
     
          </div>
          {isLoading ? (
            <Loader />
          ) : !isError && data?.length <= 0 ? (
            <div className="flex justify-center text-center bg-gray-200 items-center h-96 mt-12">
              No data available at the moment
            </div>
          ) : isError || !data ? (
            <div>An error occured</div>
          ) : (
            <>
              <ReusableTable
                pageLink={'workers'}
                optionModal={displayUi}
                optionArrayList={optionList}
                headers={headers}
                data={!isError && data}
                filterNumber={9}
                hideSearch="true"
              />

            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};
