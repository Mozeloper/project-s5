import React, { useEffect, useState } from 'react'
import { GrConnect, GrView } from 'react-icons/gr'
import { MdDeleteSweep } from 'react-icons/md'
import { useQueryClient } from 'react-query'
import
  {
    deleteWorkerById,
    reactivateAWorker,
  } from '../../../services/worker.api'
import Loader from '../../Loader'
import PaginationFooter from '../../PaginationFooter'
import ConfirmDeactivate from '../../UI/confirmation screen'
import ReusableTable from '../Table.reusable'
import { useTextSearchNav } from "../../../context/textSearch.context";
import { useFetchAllDeactivatedWorker } from '../../../hooks/useApproval'

export default function DeactivatedWorkerTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  let { textSearch, setTextSearch } = useTextSearchNav()
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [displayUi, setDisplayUi] = React.useState(null);
  const queryClient = useQueryClient();

  /**
   * Hook for fetching list of Deactivated Workers
   * @param {number} pageNumber
   * @param {number} pageSize
   */
  const {
    data: DeactivatedWorkerData,
    isLoading,
    isError,
  } = useFetchAllDeactivatedWorker({ pageNumber, pageSize, searchquery: textSearch });

  useEffect(() => {
    const getPosts = async () => {
      const deactivatedWorkerRes =
        (DeactivatedWorkerData && (await DeactivatedWorkerData?.Data)) || [];
      setData(deactivatedWorkerRes || []);
      setHeaders(
        Object.keys(
          (deactivatedWorkerRes && (await deactivatedWorkerRes[0])) || []
        )
      );
    };
    getPosts();
  }, [DeactivatedWorkerData]);

  const optionList = [
    { icon: <GrView />, name: 'View' },
    { icon: <GrConnect />, name: 'Reactivate' },
    { icon: <MdDeleteSweep />, name: 'Delete' },
  ];

  /**
   * Function in charge of handling the modal to display based of the option selected
   * @param {Event} event
   * @param {Object} option
   */
  const handleOptionsClick = (event, option) => {
    const innerText = option.name;
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
   * Handler for Reactivating a Worker
   * @param {string} id
   *
   */
  const handleReactivate = async (id) => {
    const reactivatedWorkerRes = await reactivateAWorker(id);
    if (reactivatedWorkerRes.StatusCode === 200) {
      //update the data on the table by invalidating the dti query
      queryClient.invalidateQueries('DeactivatedWorker');
    }
  };

  /**
   * Handler for Deleting a Worker off the platform
   * @param {string} id
   */
  const handleDelete = async (id) => {
    const suspededConvert = await deleteWorkerById(id);
    if (suspededConvert.StatusCode === 200) {
      //update the data on the table by invalidating the dti query
      queryClient.invalidateQueries('DeactivatedWorker');
    }
  };

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
        The List of all Suspended / Deactivated workers
      </h3>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>An Error occurred </div>
      ) : (
        <>
          <ReusableTable
            pageLink={'reminder/deactivated-worker'}
            optionModal={displayUi}
            headers={headers}
            data={data}
            filterNumber={11}
            optionArrayList={optionList}
            optionsHandleClick={handleOptionsClick}
          />

          <PaginationFooter
            pageNumber={pageNumber}
            totalPerCount={
              DeactivatedWorkerData &&
              (Math.ceil(
                DeactivatedWorkerData?.Data?.TotalDataCount / pageSize
              ) ||
                1)
            }
            totalCount={
              DeactivatedWorkerData &&
              (Math.ceil(DeactivatedWorkerData?.Data?.TotalDataCount) || 1)
            }
            handlePaginationChange={handlePaginationChange}
          />
        </>
      )}
    </div>
  );
}
