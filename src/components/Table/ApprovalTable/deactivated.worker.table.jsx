import React, { useEffect, useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { GrConnect } from "react-icons/gr";
import { useFetchAllDeactivatedWorker } from "../../../hooks/useApproval";
import ReusableTable from "../Table.reusable";
import PaginationFooter from "../../PaginationFooter";
import Loader from "../../Loader";

export default function DeactivatedWorkerTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [displayUi, setDisplayUi] = React.useState(null);
  const {
    data: DeactivatedWorkerData,
    isLoading,
    isError,
  } = useFetchAllDeactivatedWorker({ pageNumber, pageSize });

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
    // { icon: <HiMiniViewfinderCircle />, name: 'View' },
    // { icon: <GrDocumentUpdate />, name: 'Update' },
    { icon: <GrConnect />, name: "Reactivate" },
    { icon: <MdDeleteSweep />, name: "Delete" },
  ];

  const handleOptionsClick = (event) => {
    const innerText = event.currentTarget.innerText;
    // popupState.close
    // setAnchorEl(event.currentTarget);
    if (innerText.toLowerCase() === "view") {
      // setDisplayUi(<ConfirmDeactivate />)
    } else {
      // setDisplayUi(null)
    }
  };

  const handlePaginationChange = (event, value) => {
    setPageNumber(value);
  };

  throw new Error('tester')
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
            pageLink={"reminder/deactivated-worker"}
            optionModal={displayUi}
            headers={headers}
            data={data}
            filterNumber={11}
            optionArrayList={optionList}
            optionsHandleClick={handleOptionsClick}
          />

          <PaginationFooter
            pageNumber={pageNumber}
            totalPerCount={DeactivatedWorkerData && (Math.ceil(
              DeactivatedWorkerData?.Data?.TotalDataCount / pageSize
            ) || 1)}
            totalCount={DeactivatedWorkerData &&( Math.ceil(
              DeactivatedWorkerData?.Data?.TotalDataCount
            ) || 1)}
            handlePaginationChange={handlePaginationChange}
          />
        </>
      )}
    </div>
  );
}
