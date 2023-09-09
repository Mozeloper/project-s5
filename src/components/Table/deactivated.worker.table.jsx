import React, { useEffect, useState } from 'react'
import PaginationFooter from '../PaginationFooter'
import ReusableTable from './Table.reusable'
import { useFetchAllDeactivatedWorker } from '../../hooks/useFetchUnapproved';

export default function DeactivatedWorkerTable() {
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const { data: PendingData, isLoading, isError } = useFetchAllDeactivatedWorker()

    useEffect(() => {
      const getPosts = async () => {
      const admins = await PendingData?.Data
      setData(admins || []);
      setHeaders(Object.keys(await admins[0] || []));
    };
    getPosts();
  }, [PendingData]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-white py-7 grid grid-cols-1 gap-y-8">
      <h3>The List of all Suspended / Deactivated workers</h3>
        {
            isLoading ? <div>Loading...</div> : isError ? <div>An Error occurred </div> : 
        <>
        {
          data?.length < 1 || !data ? <div className='flex justify-center items-center h-96'>There's No Deactivated Account At the moment</div> : 
            <ReusableTable headers={headers} data={data} filterNumber={11}/>
        }
            <PaginationFooter />
        </>
        }
    </div>
  )
}
