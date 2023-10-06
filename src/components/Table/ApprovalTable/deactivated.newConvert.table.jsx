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

export default function DeactivatedNewConvertTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [displayUi, setDisplayUi] = React.useState(null);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [convertId, setConvertId] = useState('');
  const [reason, setReason] = useState('');
  const [activeFunction, setActiveFunction] = useState('');
  const queryClient = useQueryClient();

  /**
   * Hook for Fetching Deactivated Converts Data
   * @param {number} pageNumber - The current page number.
   * @param {number} pageSize - The number of items per page.
   */
  const {
    data: DeactivatedNewConvertData,
    isLoading,
    isError,
  } = useFetchAllDeactivatedNewConvert({ pageNumber, pageSize });

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

  const handleOptionsClick = (event) => {
    const innerText = event.currentTarget.innerText;
    const id = event.currentTarget.id;
    if (innerText.toLowerCase() === 'reactivate') {
      setDisplayUi(
        <ConfirmDeactivate
          handleDeactivate={handleReactivate.bind(null, id)}
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
      null;
    }
  };

  /**
   * Effect for handling conversion actions based on the activeFunction state.
   * This effect triggers when the 'convertId' or 'activeFunction' changes.
   */
  useEffect(() => {
    (async () => {
      if (activeFunction === 'reactivate')
        return await reativatedConvertAsync();
      if (activeFunction === 'delete') return await deletedConvertAsync();
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
      queryClient.invalidateQueries('DeactivatedConverts');
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
      queryClient.invalidateQueries('DeactivatedConverts');
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

  return (
    <div className="px-8 bg-white pt-7 grid grid-cols-1 gap-y-8">
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
            <div className="flex text-center justify-center items-center h-96">
              There's No Deactivated Account At the moment
            </div>
          ) : (
            <>
              <ReusableTable
                pageLink={'reminder/deactivatedNewConvert'}
                optionModal={displayUi}
                headers={headers}
                data={data}
                filterNumber={11}
                optionArrayList={optionList}
                optionsHandleClick={handleOptionsClick}
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
