import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiConfirmed } from "react-icons/gi";
import { GrView } from "react-icons/gr";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { MdAssignmentAdd } from "react-icons/md";
import { useQueryClient } from "react-query";
import { useTextSearchNav } from "../../context/textSearch.context";
import {
  useExportNewBelievers,
  useFetchNewBelievers,
} from "../../hooks/useFetchNewBelievers";
import { suspendAConvert } from "../../services/admins.api";
import Loader from "../Loader";
import PaginationFooter from "../PaginationFooter";
import PromoteConvertToDti from "../UI/PromoteScreen/PromoteConvertToDti";
import SuspendConvert from "../UI/SuspendConvert";
import ReusableTable from "./Table.reusable";
import SearchBox from "../Searchbox/searchbox";
import AssignNewBelieverToAdmin from "../UI/AssignNewBelieverToAdminScreen";
import {
  assignConvertToAdmin,
  // exportAllNewConverts,
} from "../../services/admins.api";
import TransitionsModal from "../ModalPopup/modalTransition";
import ModalPopup from "../ModalPopup";
import { useModalToggle } from "../../context/ConfirmationModal.context";
import DateRangeForm from "../UI/Forms/DateRangeForm";

export default function NewBelieversTable() {
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [displayUi, setDisplayUi] = React.useState(null);
  const [textSearch, setTextSearch] = useState("");
  const { modalType, openModal: transitionOpen } = useModalToggle();
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  /**
   * Hook for fetching all converts in new believers stage
   * @param {string} pageNumber
   * @param {string} pageSize
   */
  const {
    data: NewBelieversData,
    isError,
    isLoading,
    isFetching,
    error,
  } = useFetchNewBelievers({ pageNumber, pageSize, searchquery: textSearch });

  const {
    data: exportData,
    mutate: exportAllNewBelievers,
    isLoading: isLoadingExport,
  } = useExportNewBelievers({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  useEffect(() => {
    const getPosts = async () => {
      const newBelieversRes = (await NewBelieversData?.Data) || [];
      setData(newBelieversRes);
      setHeaders(Object.keys(newBelieversRes[0] || []));
    };
    getPosts();
  }, [NewBelieversData]);

  const optionList = [
    { icon: <GrView className="text-blue-500" />, name: "View" },
    { icon: <MdAssignmentAdd className="text-red-700" />, name: "Assign" },
    { icon: <GiConfirmed className="text-red-500" />, name: "Promote" },
    {
      icon: <IoRemoveCircleSharp className="text-yellow-500" />,
      name: "Disable",
    },
  ];

  const handleSearchChange = (newQuery) => {
    setTextSearch((prev) => (prev = newQuery));
  };

  /**
   * Function for handling promotion of a new beleiver (note the function is currently being handled by the modal)
   * @param {string} id
   */
  const handlePromoteToDti = (id) => {
    console.log(`promoted convert with ${id} to DTI`);
  };

  /**
   * Function for handling suspension of a new beleiver
   * @param {string} id
   * @param {string} reason
   */
  const handleSuspendNBCovert = async (id, reason) => {
    const suspededConvert = await suspendAConvert(id, reason);
    // console.log(suspededConvert.Message);
    if (suspededConvert.StatusCode === 200) {
      toast.success(suspededConvert.Message);
      // Refetch the data after suspending the convert
      queryClient.invalidateQueries("GetAllNewBelievers");
      useFetchNewBelievers({ pageNumber, pageSize, searchquery });
    }
  };

  /**
   * Function for handling assigning of a new beleiver to an Admin
   * @param {string} id
   * @param {string} adminId
   */
  const handleAssignNBToAdmin = async (id, adminId) => {
    // console.log(id, adminId);
    try {
      const AssignRes = await assignConvertToAdmin(id, adminId);
      if (AssignRes.StatusCode === 200) {
        toast.success(AssignRes.Message);
        queryClient.invalidateQueries("GetAllNewBelievers");
      }
    } catch (error) {
      // toast.error('Could not assign convert, please try again');
    }
  };

  /**
   *
   * @param {Event} event
   * @param {Object} option
   */
  const handleOptionsClick = (event, option) => {
    const innerText = option.name;
    // console.log(innerText);
    const id = event.currentTarget.id;
    const { name: Name, roles: Roles } = event.selectedUserData;

    if (innerText.toLowerCase() === "promote") {
      setDisplayUi(
        <PromoteConvertToDti
          workerId={id}
          screenName={innerText}
          handlePromote={handlePromoteToDti.bind(null, id)}
        />
      );
    } else if (innerText.toLowerCase() === "disable") {
      setDisplayUi(
        <SuspendConvert
          handleDeactivate={handleSuspendNBCovert.bind(null, id)}
          screenName={innerText}
        />
      );
    } else if (innerText.toLowerCase() === "assign") {
      setDisplayUi(
        <AssignNewBelieverToAdmin
          handleAssignToAdmin={handleAssignNBToAdmin.bind(null, id)}
          screenName={innerText}
          convertId={id}
          name={Name}
        />
      );
    }
  };

  /**
   * Handler for pagination
   * @param {Event} event
   * @param {number} value
   */
  const handlePaginationChange = (event, value) => {
    setPageNumber(value);
  };

  const handleExportClick = () => {
    transitionOpen("openModal");
  };

  const handleExport = async (startDate, endDate) => {
    // Handle the date range export

    if (!startDate || !endDate) {
      toast.error("Oops: Invalid dates. Try Again Later.");
      return;
    }

    // Only set dates and trigger export once dates are valid
    setDateRange({ startDate, endDate });

    // Only trigger the export if both dates are available
    // if (dateRange.startDate && dateRange.endDate)
    exportAllNewBelievers({ startDate, endDate });
  };

  return (
    <Fragment>
      <div className="bg-white">
        {/* <SearchBox /> */}
        <div className="px-4 sm:px-6 lg:px-8 bg-white py-7">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                New Believers
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                List of Converts in New Believers Stage.
              </p>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div>An Error occurred: {error.message} </div>
          ) : (
            <>
              {data?.length < 1 ? (
                <div className="flex  flex-col  justify-center items-center h-96 bg-gray-200  p-10 md:p-16">
                  <h3 className="font-bold mb-3">
                    At the moment, no new converts have been registered.
                  </h3>
                  <p>Please check back later for updates.</p>
                </div>
              ) : (
                <>
                  <ReusableTable
                    pageLink={"newconverts"}
                    optionModal={displayUi}
                    headers={headers}
                    data={data}
                    filterNumber={10}
                    optionArrayList={optionList}
                    optionsHandleClick={handleOptionsClick}
                    textSearch={textSearch}
                    setTextSearch={handleSearchChange}
                    exportLink={handleExportClick}
                    // totalSearchData={searchAdmins.Data && searchAdmins.Data}
                  />

                  {/* {isExportable && ( */}
                  <TransitionsModal
                    isModalOpen={modalType == "openModal"}
                    heading={"Export New Convert"}
                    width={"max-w-2xl w-[90%] bg-[#Bf0A30]"}
                  >
                    <DateRangeForm
                      onExport={handleExport}
                      isLoading={isLoadingExport}
                    />
                  </TransitionsModal>
                  {/* )} */}
                  <PaginationFooter
                    pageNumber={pageNumber}
                    totalPerCount={Math.ceil(
                      NewBelieversData?.TotalDataCount / pageSize
                    )}
                    totalCount={Math.ceil(NewBelieversData?.TotalDataCount)}
                    handlePaginationChange={handlePaginationChange}
                  />
                </>
              )}
            </>
          )}
          <div className="flex justify-center items-center">
            {!isLoading && isFetching && "Loading..."}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
