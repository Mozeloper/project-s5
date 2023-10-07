import React, { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useWorkersAdmins } from '../../hooks/useWorkers'
import PaginationFooter from '../PaginationFooter'
import SearchBox from '../Searchbox/searchbox'
import Table from './table'
import { useTextSearchNav } from '../../context/textSearch.context';

export default function WorkersTable() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    let { textSearch, setTextSearch } = useTextSearchNav()
    const { data: WorkersData, isError, isLoading, isFetching, error, isSuccess } = useWorkersAdmins({ pageNumber, pageSize, searchquery: textSearch })

  


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
                Here is a list of the workers at The Potter's House of Lagos,
                including their name, email address, role, and presence status.
              </p>
            </div>
          </div>
          {
            isLoading ? 'Loading...' : isError ? toast.error(error?.message) :
            <>
              <Table pageLink={'workers'} tableDataArray={WorkersData && WorkersData?.Data} />
              {/* Pagination will be here */}
                  
              <PaginationFooter 
                pageNumber={pageNumber} 
                totalPerCount={Math.ceil(WorkersData?.TotalDataCount / pageSize)} 
                totalCount={Math.ceil(WorkersData?.TotalDataCount)} 
                handlePaginationChange={handlePaginationChange}
              /> 
            </>
          }
        </div>
      </div>
    </Fragment>
  );
}
