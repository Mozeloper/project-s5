import React, { useEffect, useState } from 'react'
import PaginationFooter from '../PaginationFooter'
import ReusableTable from './Table.reusable'
import { useFetchAllUnapproved } from '../../hooks/useFetchUnapproved';

export default function UnapprovedWorkerTable() {
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const { data: PendingData, isLoading, isError } = useFetchAllUnapproved()

    useEffect(() => {
      const getPosts = async () => {
      const admins = await PendingData
      setData(admins);
      setHeaders(Object.keys(await admins[0]));
    };
    getPosts();
  }, [PendingData]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-white py-7">
      <h3>The List of all pending / Unapproved workers</h3>
        {
            isLoading ? <div>Loading...</div> : isError ? <div>An Error occurred </div> : 
        <>
          {
            data?.length < 1 ? <div className='flex justify-center items-center h-96'>There's No pending "Unapproved" Account At the moment</div> : 
              <ReusableTable headers={headers} data={data} filterNumber={11}/>
          }
          <PaginationFooter />
        </>
        }
    </div>
  )
}
