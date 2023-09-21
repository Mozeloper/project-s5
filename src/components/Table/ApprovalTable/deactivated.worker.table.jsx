import React, { useEffect, useState } from 'react'
import { MdDeleteSweep } from 'react-icons/md'
import { GrConnect } from 'react-icons/gr'
import { useFetchAllDeactivatedWorker } from '../../../hooks/useFetchUnapproved';
import ReusableTable from '../Table.reusable';
import PaginationFooter from '../../PaginationFooter';
import Loader from '../../Loader';


export default function DeactivatedWorkerTable() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const [displayUi, setDisplayUi] = React.useState(null)
    const { data: DeactivatedWorkerData, isLoading, isError } = useFetchAllDeactivatedWorker({ pageNumber, pageSize })

    useEffect(() => {
      const getPosts = async () => {
      const admins = await DeactivatedWorkerData?.Data
      setData(admins || []);
      setHeaders(Object.keys(await admins[0] || []));
    };
    getPosts();
  }, [DeactivatedWorkerData]);

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
            isLoading ? <Loader /> : isError ? <div>An Error occurred </div> : 
        <>
          <ReusableTable 
            pageLink={'reminder/deactivatedWorker'} 
            optionModal={displayUi} 
            headers={headers} 
            data={data} 
            filterNumber={11} 
            optionArrayList={optionList} 
            optionsHandleClick={handleOptionsClick}
          />
          
          <PaginationFooter 
            pageNumber={pageNumber} totalPerCount={Math.ceil(DeactivatedWorkerData?.TotalDataCount / pageSize)} totalCount={Math.ceil(DeactivatedWorkerData?.TotalDataCount)} handlePaginationChange={handlePaginationChange}
          />
        </>
        }
    </div>
  )
}
