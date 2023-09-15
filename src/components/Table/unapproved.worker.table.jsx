import React, { useCallback, useEffect, useState } from 'react'
import PaginationFooter from '../PaginationFooter'
import ReusableTable from './Table.reusable'
import { HiMiniViewfinderCircle } from 'react-icons/hi2'
import { MdDeleteSweep } from 'react-icons/md'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { GrConnect, GrDocumentUpdate } from 'react-icons/gr'
import { useFetchAllUnapproved, usePostApproveWorker, usePostDeleteWorker } from '../../hooks/useFetchUnapproved';
import { GiConfirmed } from 'react-icons/gi'
import ConfirmDeactivate from '../UI/confirmation screen'

export default function UnapprovedWorkerTable() {
    const [pageNumber, setPageNumber] = useState(1);
    const [modalConfirmation, setModalConfirmation] = useState(false);
    const [displayUi, setDisplayUi] = React.useState(null)
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);

    const [workerId, setWorkerId] = useState('');
    const { data: PendingData, isLoading, isError } = useFetchAllUnapproved()
    const { mutateAsync: deleteUserAsync, isLoading: isLoadingDeletion, isError: isErrorDeletion } = usePostDeleteWorker(workerId)
    const { mutateAsync: approveUserAsync, data: ApproveUser, isLoading: isLoadingApproval, isError: isErrorRender, isSuccess } = usePostApproveWorker(workerId && workerId)

    useEffect(() => {
      const getPosts = async () => {
      const admins = await PendingData?.Data
      setData(admins);
      setHeaders(Object.keys(await admins?.[0]));
    };
    getPosts();
  }, [PendingData]);

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

  //   if (isErrorRender && !isSuccess) {
  //   return <div>Error.......</div>
  // }

  // const optionList = [
  //     { icon: <GiConfirmed />, name: 'Approve' },
  //     { icon: <IoRemoveCircleSharp />, name: 'Suspend' },
  // ];

  const handleOptionsClick = (event) => {
    const innerText = event.currentTarget.innerText
    const id = event.currentTarget.id
    if (innerText.toLowerCase() === 'approve') {
        setDisplayUi(<ConfirmDeactivate setDeactivateConfirmation={setModalConfirmation} handleDeactivate={handleApprovedConfirmation.bind(null, id)} screenName={innerText}/>)
    }else {
        setDisplayUi(<ConfirmDeactivate handleDeactivate={handleApprovedSuspend.bind(null, id)} screenName={innerText}/>)
    }
  };

  return (
    <div className="px-8 bg-white pt-7 grid grid-cols-1 gap-y-2">
      <h3 className='sm:text-left text-center'>The List of all pending / Unapproved workers</h3>
        {
            isLoading ? <div>Loading...</div> : isError ? <div>An Error occurred </div> : 
        <>
          {
            data?.length < 1 || !data  ? <div className='flex justify-center text-center items-center h-96'>There's No pending "Unapproved" Account At the moment</div> : <>
              <ReusableTable optionModal={displayUi} headers={headers} data={data} filterNumber={11} optionArrayList={optionList} optionsHandleClick={handleOptionsClick}/>
              <PaginationFooter pageNumber={pageNumber} totalPerCount={Math.ceil(data?.length / 10)} totalCount={data?.length}/>
            </>
          }
        </>
        }
    </div>
  )
}
