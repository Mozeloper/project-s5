import React, { useCallback, useEffect, useState } from 'react'
import PaginationFooter from '../PaginationFooter'
import ReusableTable from './Table.reusable'
import { HiMiniViewfinderCircle } from 'react-icons/hi2'
import { MdDeleteSweep } from 'react-icons/md'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { GrConnect, GrDocumentUpdate } from 'react-icons/gr'
import { useFetchAllUnapproved, usePostApproveWorker } from '../../hooks/useFetchUnapproved';
import { GiConfirmed } from 'react-icons/gi'
import ConfirmDeactivate from '../UI/confirmation screen'

export default function UnapprovedWorkerTable() {
    const [displayUi, setDisplayUi] = React.useState(null)
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState('1');
    const { data: PendingData, isLoading, isError } = useFetchAllUnapproved()
    const { mutate, data: ApproveUser, isLoading: isLoadingApproval, isError: isErrorRender } = usePostApproveWorker(userId)
    

    useEffect(() => {
      const getPosts = async () => {
      const admins = await PendingData
      setData(admins);
      setHeaders(Object.keys(await admins[0]));
    };
    getPosts();
  }, [PendingData]);

    const optionList = [
      { icon: <GiConfirmed />, name: 'Confirm' },
      { icon: <IoRemoveCircleSharp />, name: 'Suspend' },
    ];

  const handleApprovedConfirmation = useCallback(
    async (id) => {
      setUserId(await id)
      console.log('user', userId);
      mutate()
      console.log(`you just confirmed the worker with id ${id} `);
    }, [],
  );

  const handleApprovedSuspend = useCallback(
    (id) => {
      //Todo add logic/function to suspend a worker here
      console.log(`you just supended the worker with id ${id} `);
    }, [],
  );

  if (isLoadingApproval) {
    return <div>Loading.......</div>
  }

    if (isErrorRender) {
    return <div>Error.......</div>
  }

  const handleClick = (event) => {
    const innerText = event.currentTarget.innerText
    const id = event.currentTarget.id
    if (innerText.toLowerCase() === 'confirm') {
        setDisplayUi(<ConfirmDeactivate handleDeactivate={handleApprovedConfirmation.bind(null, id)} screenName={innerText}/>)
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
            data?.length < 1 ? <div className='flex justify-center text-center items-center h-96'>There's No pending "Unapproved" Account At the moment</div> : 
              <ReusableTable optionModal={displayUi} headers={headers} data={data} filterNumber={11} optionArrayList={optionList} optionsHandleClick={handleClick}/>
          }
          <PaginationFooter />
        </>
        }
    </div>
  )
}
