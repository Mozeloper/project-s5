import React, { useEffect, useState } from 'react'
import PaginationFooter from '../PaginationFooter'
import ReusableTable from './Table.reusable'
import { HiMiniViewfinderCircle } from 'react-icons/hi2'
import { MdDeleteSweep } from 'react-icons/md'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { GrConnect, GrDocumentUpdate } from 'react-icons/gr'
import { useFetchAllDeactivatedWorker } from '../../hooks/useFetchUnapproved';

export default function DeactivatedWorkerTable() {
     const [pageNumber, setPageNumber] = useState(1);
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

      const optionList = [
      // { icon: <HiMiniViewfinderCircle />, name: 'View' },
      // { icon: <GrDocumentUpdate />, name: 'Update' },
      { icon: <GrConnect />, name: 'Reactivate' },
      { icon: <MdDeleteSweep />, name: 'Delete' },
    ];


    const handleClick = (event) => {
    const innerText = event.currentTarget.innerText
    // popupState.close 
    // setAnchorEl(event.currentTarget);
    if (innerText.toLowerCase() === 'view') {
        // setDisplayUi(<ConfirmDeactivate />)
    }else {
        // setDisplayUi(null)
    }
  };


  return (
    <div className="px-8 bg-white pt-7 grid grid-cols-1 gap-y-8">
      <h3 className='sm:text-left text-center'>The List of all Suspended / Deactivated workers</h3>
        {
            isLoading ? <div>Loading...</div> : isError ? <div>An Error occurred </div> : 
        <>
        {
          data?.length < 1 || !data ? <div className='flex text-center justify-center items-center h-96'>There's No Deactivated Account At the moment</div> : 
            <ReusableTable pageLink={'deactivatedWorker'} headers={headers} data={data} filterNumber={11}/>
        }
            <PaginationFooter pageNumber={pageNumber} totalPerCount={Math.ceil(data?.length / 10)} totalCount={data?.length}/>
        </>
        }
    </div>
  )
}
