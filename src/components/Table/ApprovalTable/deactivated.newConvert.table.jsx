import React, { useCallback, useEffect, useState } from 'react';
import { MdDeleteSweep, MdOutlineAddLink } from 'react-icons/md';
import {
  useFetchAllDeactivatedNewConvert,
  usePostDeleteConvert,
  usePostReactivateConvert,
} from '../../../hooks/useFetchConverts';
import Loader from '../../Loader';
import PaginationFooter from '../../PaginationFooter';
import ConfirmDeactivate from '../../UI/confirmation screen';
import ReusableTable from '../Table.reusable';
import { useQueryClient } from 'react-query';

import { useTextSearchNav } from "../../../context/textSearch.context";

export default function DeactivatedNewConvertTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  // let { textSearch, setTextSearch } = useTextSearchNav()
  const [displayUi, setDisplayUi] = React.useState(null);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [convertId, setConvertId] = useState('');
  const [reason, setReason] = useState('');
  const [activeFunction, setActiveFunction] = useState('');
  const queryClient = useQueryClient();
  const [textSearch, setTextSearch ] = useState('');

  /**
   * Hook for Fetching Deactivated Converts Data
   * @param {number} pageNumber - The current page number.
   * @param {number} pageSize - The number of items per page.
   */
  const {
    data: DeactivatedNewConvertData,
    isLoading,
    isError,
  } = useFetchAllDeactivatedNewConvert({ pageNumber, pageSize, searchquery: textSearch });

  /**
   * Hook for Deleting a convert
   * @param {string} convertId - The ID of the convert to be deleted.
   * @param {string} reason - The reason for deletion (if applicable).
   */
  const { mutateAsync: deletedConvertAsync, isLoading: isLoadingDeletion } =
    usePostDeleteConvert(convertId && convertId, reason);

  /**
   * Hook for Adding a convert
   * @param {string} convertId - The ID of the convert to be reactivated.
   * @param {number} pageNumber - The current page number.
   */
  const { mutateAsync: reativatedConvertAsync, isLoading: isLoadingApproval } =
    usePostReactivateConvert(convertId, pageNumber);

  /**
   * Runs every time the deactivated convert table is updated
   */
  useEffect(() => {
    const getPosts = async () => {
      const admins =
        DeactivatedNewConvertData && (await DeactivatedNewConvertData?.Data);
      setData(admins || []);
      setHeaders(Object.keys((admins && (await admins[0])) || []));
    };
    getPosts();
  }, [DeactivatedNewConvertData]);

  const optionList = [
    { icon: <MdOutlineAddLink />, name: ` Reactivate` },
    { icon: <MdDeleteSweep />, name: ` Delete` },
  ];

  const handleOptionsClick = (event, option) => {
    //const innerText = event.currentTarget.innerText;
    const innerText = option.name;
    const id = event.currentTarget.id;
    if (innerText.toLowerCase() === 'reactivate') {
      setDisplayUi(
        <ConfirmDeactivate
          handleDeactivate={handleReactivate.bind(null, id)}
          screenName={innerText}
          name={event.selectedUserData.name}
        />
      );
    } else if (innerText.toLowerCase() === 'delete') {
      setDisplayUi(
        <ConfirmDeactivate
          handleDeactivate={handleDelete.bind(null, id)}
          screenName={innerText}
          name={event.selectedUserData.name}
        />
      );
    } else {
      null;
    }
  };

  /**
   * Effect for handling conversion actions based on the activeFunction state.
   * This effect triggers when the 'convertId' or 'activeFunction' changes.
   */
  useEffect(() => {
    (async () => {
      if (activeFunction === 'reactivate') {
        return (
          (await reativatedConvertAsync()) &&
          queryClient.invalidateQueries('DeactivatedConverts')
        );
      }
      if (activeFunction === 'delete')
        return (
          (await deletedConvertAsync()) &&
          queryClient.invalidateQueries('DeactivatedConverts')
        );
    })();
  }, [convertId]);

  /**
   * Handler for reactivating a convert by Id
   * @param {string} id - The ID of the convert to activate.
   */
  const handleReactivate = useCallback(
    //Todo Include the reason for reactivation as part of the payload
    async (id) => {
      setActiveFunction('reactivate');
      setConvertId(id);
    },
    [reativatedConvertAsync, convertId]
  );

  /**
   * Handler for deleting a convert by Id
   * @param {string} id - The ID of the convert to delete.
   */
  const handleDelete = useCallback(
    async (id) => {
      //Todo Please note that the endpoint for this is currently not functioning properly
      setConvertId(id);
      setActiveFunction('delete');
    },
    [deletedConvertAsync, convertId]
  );

  /**
   * Handler for pagination change.
   * @param {Event} event - The event object.
   * @param {number} value - The new page number.
   */
  const handlePaginationChange = (event, value) => {
    setPageNumber(value);
  };

  const handleSearchChange = (newQuery) => {
    setTextSearch(prev => prev = newQuery)
  }

  return (
    <div className="p-8 bg-white grid grid-cols-1 gap-y-8">
      <h3 className="sm:text-left text-center">
        The List of all Deactivated Converts
      </h3>
      {isLoading || isLoadingDeletion || isLoadingApproval ? (
        <Loader />
      ) : isError ? (
        <div>An Error occurred </div>
      ) : (
        <>
          {data?.length < 1 || !data ? (
            <div className="flex flex-col justify-center text-center items-center h-96 bg-gray-200  p-10 md:p-16">
              <h3 className="font-bold">
                Praise <span className='text-primary'>God</span>!, No convert is currently suspended.
              </h3>
            </div>
          ) : (
            <>
              <ReusableTable
                pageLink={'approvals/deactivated-convert'}
                optionModal={displayUi}
                headers={headers}
                data={data}
                filterNumber={11}
                optionArrayList={optionList}
                optionsHandleClick={handleOptionsClick}
                textSearch={textSearch}
                setTextSearch={handleSearchChange}
              />

              <PaginationFooter
                pageNumber={pageNumber}
                totalPerCount={Math.ceil(
                  DeactivatedNewConvertData?.TotalDataCount / pageSize
                )}
                totalCount={Math.ceil(
                  DeactivatedNewConvertData?.TotalDataCount
                )}
                handlePaginationChange={handlePaginationChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
