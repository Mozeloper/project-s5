import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTextSearchNav } from '../../context/textSearch.context'
import { useWorkersAdmins } from '../../hooks/useWorkers'
import Loader from '../Loader'
import PaginationFooter from '../PaginationFooter'
import Table from './table'
import SearchBox from '../Searchbox/searchbox';

export default function WorkersTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  // let { textSearch, setTextSearch } = useTextSearchNav();
  const [textSearch, setTextSearch ] = useState('');
  
  const {
    data: WorkersData,
    isError,
    isLoading,
    isFetching,
    error,
    isSuccess,
  } = useWorkersAdmins({ pageNumber, pageSize, searchquery: textSearch });

  const handlePaginationChange = (event, value) => {
    setPageNumber(value);
  };

  return (
    <Fragment>
      <div className="bg-white rounded-md">
        {/* <SearchBox /> */}
        <div className="px-4 sm:px-6 lg:px-8 bg-white py-7">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                Workers
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Here is a list of the workers at The Potter&apos;s House of
                Lagos, including their name, email address, role, and presence
                status.
              </p>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div>An Error occurred: {error.message} </div>
          ) : (
            <>
              {WorkersData?.Data?.length < 1 ? (
                <div className="flex flex-col justify-center items-center h-96 bg-gray-200  p-10 md:p-16">
                  <h3 className="font-bold mb-3">
                    Currently, no approved workers have been added.
                  </h3>{' '}
                  <p>
                    Please go to the{' '}
                    <span className="text-primary">
                      <Link to={'/approvals'}>Approvals page</Link>
                    </span>{' '}
                    to see if any workers require approval.
                  </p>
                </div>
              ) : (
                <>
                  <Table
                    pageLink={'workers'}
                    tableDataArray={WorkersData && WorkersData?.Data}
                  />
                  {/* Pagination will be here */}

                  <PaginationFooter
                    pageNumber={pageNumber}
                    totalPerCount={Math.ceil(
                      WorkersData?.TotalDataCount / pageSize
                    )}
                    totalCount={Math.ceil(WorkersData?.TotalDataCount)}
                    handlePaginationChange={handlePaginationChange}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
}
