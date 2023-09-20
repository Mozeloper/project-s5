import React, { useCallback, useEffect, useState } from 'react'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { AiFillDelete } from "react-icons/ai";
import { GiConfirmed } from 'react-icons/gi'
import ReusableTable from '../Table.reusable';
import PaginationFooter from '../../PaginationFooter';
import { useFetchAllUnapproved, usePostApproveWorker, usePostDeleteWorker } from '@/hooks/useFetchUnapproved';
import ConfirmDeactivate from '../../UI/confirmation screen';

export default function UnapprovedWorkerTable() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [modalConfirmation, setModalConfirmation] = useState(false);
    const [displayUi, setDisplayUi] = React.useState(null)
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);

    const [workerId, setWorkerId] = useState('');
    const { data: PendingData, isLoading, isError } = useFetchAllUnapproved({ pageNumber, pageSize })
    const { mutateAsync: deleteUserAsync, isLoading: isLoadingDeletion, isError: isErrorDeletion } = usePostDeleteWorker(workerId)
    const { mutateAsync: approveUserAsync, data: ApproveUser, isLoading: isLoadingApproval, isError: isErrorRender, isSuccess } = usePostApproveWorker(workerId && workerId)

    useEffect(() => {
      const getPosts = async () => {
      const unapprovedWorkers = await PendingData?.Data?.Data;
      setData(!isError && unapprovedWorkers);
      setHeaders(Object.keys(!isError && unapprovedWorkers[0]));
    };
    getPosts();
  }, [PendingData]);

    const optionList = [
      { icon: <GiConfirmed className='text-green-500' />, name: 'Approve' },
      { icon: <IoRemoveCircleSharp className='text-yellow-500' />, name: 'Reject' },
      { icon: <AiFillDelete className='text-primary' />, name: 'Delete' },
    ];

  const handleApprovedConfirmation = useCallback(
    async (id) => {
      setWorkerId(prev => prev = id)
      console.log('user', workerId);
      mutateAsync()
      console.log(`you just confirmed the worker with id ${id} `);
    }, [approveUserAsync, workerId],
  );

  const handleApprovedSuspend = useCallback(
    (id) => {
      //Todo add logic/function to suspend a worker here
      console.log(`you just supended the worker with id ${id} `);
    }, [],
  );

 
  const handleDelete = useCallback(
    async (id) => {
      //Todo add logic/function to suspend a worker 
      setWorkerId(id)
      console.log('user', workerId);
      deleteUserAsync();
      console.log(`you just deleted the worker with id ${id} `);
    }, [deleteUserAsync, workerId],
  );

  if (isLoadingApproval) {
    return <div>Loading.......</div>
  }

  const handleOptionsClick = (event) => {
    const innerText = event.currentTarget.innerText
    const id = event.currentTarget.id
    if (innerText.toLowerCase() === 'approve') {
        setDisplayUi(<ConfirmDeactivate handleDeactivate={handleApprovedConfirmation.bind(null, id)} screenName={innerText}/>)
    } else if (innerText.toLowerCase() === 'delete') {
        setDisplayUi(<ConfirmDeactivate handleDeactivate={handleDelete.bind(null, id)} screenName={innerText}/>)
    } else {
        setDisplayUi(<ConfirmDeactivate handleDeactivate={handleApprovedSuspend.bind(null, id)} screenName={innerText}/>)
    }
  };

  const handlePaginationChange = (event, value) => {
    setPageNumber(value);
  };

  return (
    <div className="px-8 bg-white pt-7 grid grid-cols-1 gap-y-2">
      <h3 className='sm:text-left text-center'>The List of all pending / Unapproved workers</h3>
        {
            isLoading ? <div>Loading...</div> : isError ? <div>An Error occurred </div> : 
        <>
          {
            data?.length < 1 || !data  ? 
            <div className='flex justify-center text-center items-center h-96'>There's No pending "Unapproved" Account At the moment</div> : 
            <>
              <ReusableTable 
                pageLink={'reminder/unapproved-worker'} 
                optionModal={displayUi} 
                headers={headers} 
                data={data} 
                filterNumber={11} 
                optionArrayList={optionList} 
                optionsHandleClick={handleOptionsClick}
              />
              
              <PaginationFooter 
                pageNumber={pageNumber} totalPerCount={Math.ceil(PendingData?.TotalDataCount / pageSize)} totalCount={Math.ceil(PendingData?.TotalDataCount)} handlePaginationChange={handlePaginationChange}
              />
            </>
          }
        </>
        }
    </div>
  )
}
