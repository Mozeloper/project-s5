import React, { useCallback, useEffect, useState } from 'react';
import { IoRemoveCircleSharp } from 'react-icons/io5';
import { AiFillDelete } from 'react-icons/ai';
import { GiConfirmed } from 'react-icons/gi';
import ReusableTable from '../Table.reusable';
import PaginationFooter from '../../PaginationFooter';
import Loader from '../../Loader';
import {
  useFetchAllUnapproved,
  usePostApproveWorker,
  usePostDeleteWorker,
} from '@/hooks/useApproval';
import ConfirmDeactivate from '../../UI/confirmation screen';
import { useTextSearchNav } from '../../../context/textSearch.context';

export default function UnapprovedWorkerTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  let { textSearch, setTextSearch } = useTextSearchNav()
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [displayUi, setDisplayUi] = React.useState(null);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);

  const [workerId, setWorkerId] = useState('');
  const [activeFunction, setActiveFunction] = useState('');
  const {
    data: PendingData,
    isLoading,
    isError,
  } = useFetchAllUnapproved({ pageNumber, pageSize, searchquery: textSearch });
  const {
    mutateAsync: deleteUserAsync,
    isLoading: isLoadingDeletion,
    isError: isErrorDeletion,
  } = usePostDeleteWorker(workerId && workerId, pageNumber);
  const {
    mutateAsync: approveUserAsync,
    isLoading: isLoadingApproval,
    isError: isErrorRender,
    isSuccess,
  } = usePostApproveWorker(workerId && workerId, pageNumber);

  useEffect(() => {
    const getPosts = async () => {
      const unapprovedWorkers = (await PendingData?.Data?.Data) || [];
      setData(!isError && unapprovedWorkers);
      setHeaders(Object.keys((!isError && unapprovedWorkers[0]) || []));
    };
    getPosts();
  }, [PendingData]);

  const optionList = [
    { icon: <GiConfirmed className="text-green-500" />, name: 'Approve' },
    {
      icon: <IoRemoveCircleSharp className="text-yellow-500" />,
      name: 'Reject',
    },
    { icon: <AiFillDelete className="text-primary" />, name: 'Delete' },
  ];

  //This useEffect only gets call when the workerId has been set/reassigned to a valid workerId
  useEffect(() => {
    //cause setWorkerId is undefined on component mount, and the reassigning of WorkerId isn't available,
    //so we use a state to get the particular activeFunction and then run the appropriate logic for the 
    //activeFunction
    ( async () => {
        if (activeFunction === 'approve') return await approveUserAsync();
        if (activeFunction === 'delete') return await deleteUserAsync();
    } )();
  }, [workerId])
  
  const handleApprovedConfirmation = useCallback(
    async (id) => {
      setActiveFunction('approve')
      setWorkerId(id);
      // await approveUserAsync();
      // console.log(`you just confirmed the worker with id ${id} `);
    },
    [approveUserAsync, workerId]
  );
  
  const handleApprovedSuspend = useCallback((id) => {
    //Todo add logic/function to suspend a worker here
    console.log(`you just supended the worker with id ${id} `);
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      //Todo add logic/function to suspend a worker
      setWorkerId(id);
      setActiveFunction('delete')
      // console.log('user', workerId);
      // await deleteUserAsync();
      // console.log(`you just deleted the worker with id ${id} `);
    },
    [deleteUserAsync, workerId]
  );

  const handleOptionsClick = (event) => {
    const innerText = event.currentTarget.innerText;
    const id = event.currentTarget.id;
    if (innerText.toLowerCase() === 'approve') {
      setDisplayUi(
        <ConfirmDeactivate
          handleDeactivate={handleApprovedConfirmation.bind(null, id)}
          screenName={innerText}
        />
      );
    } else if (innerText.toLowerCase() === 'delete') {
      setDisplayUi(
        <ConfirmDeactivate
          handleDeactivate={handleDelete.bind(null, id)}
          screenName={innerText}
        />
      );
    } else {
      setDisplayUi(
        <ConfirmDeactivate
          handleDeactivate={handleApprovedSuspend.bind(null, id)}
          screenName={innerText}
        />
      );
    }
  };

  const handlePaginationChange = (event, value) => {
    setPageNumber(value);
  };

  return (
    <div className="p-8 bg-white grid grid-cols-1 gap-y-2">
      <h3 className="sm:text-left text-center">
        Worker Accounts Awaiting Admin Approval
      </h3>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>An Error occurred </div>
      ) : (
        <>
          {data?.length < 1 || !data ? (
            <div className="flex flex-col justify-center text-center items-center h-96 bg-gray-200  p-10 md:p-16">
              <h3 className="font-bold">
                No worker accounts need approval at this time.
              </h3>
              <p>Please check back later for updates.</p>
            </div>
          ) : (
            <>
              {/* The table for all unapproved workers */}
              <ReusableTable
                pageLink={'approvals/unapproved-worker'}
                optionModal={displayUi}
                headers={headers}
                data={data}
                filterNumber={11}
                optionArrayList={optionList}
                optionsHandleClick={handleOptionsClick}
              />

              {/* Pagination Section */}
              <PaginationFooter
                pageNumber={pageNumber}
                totalPerCount={
                  PendingData &&
                  (Math.ceil(PendingData?.Data?.TotalDataCount / pageSize) || 1)
                }
                totalCount={
                  PendingData &&
                  (Math.ceil(PendingData?.Data?.TotalDataCount) || 1)
                }
                handlePaginationChange={handlePaginationChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
