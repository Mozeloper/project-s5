import React, { Fragment, useEffect, useState } from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { GrView } from 'react-icons/gr';
import { IoRemoveCircleSharp } from 'react-icons/io5';
import { useModalToggle } from '../../context/ConfirmationModal.context';
import { useTextSearchNav } from '../../context/textSearch.context';
import { useFetchAdmins, useSearchedAdmins } from '../../hooks/useFetchAdmins';
import Loader from '../Loader';
import PaginationFooter from '../PaginationFooter';
import ConfirmDeactivate from '../UI/confirmation screen';
import ReusableTable from './Table.reusable';
import SearchBox from '../Searchbox/searchbox';
import ManageAdminRoles from '../UI/ManageAdminRolesScreen';

export default function AdminTables() {
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [displayUi, setDisplayUi] = React.useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  let { textSearch, setTextSearch } = useTextSearchNav();

  const {
    data: AdminsData,
    isError,
    isLoading,
    isFetching,
    error,
  } = useFetchAdmins({ pageNumber, pageSize, searchquery: textSearch });

  const { data: searchAdmins } = useSearchedAdmins();

  const { openModal } = useModalToggle();

  const optionList = [
    { icon: <GrView className="text-blue-500" />, name: 'View' },
    { icon: <GiConfirmed className="text-green-500" />, name: 'Modify' },
    {
      icon: <IoRemoveCircleSharp className="text-yellow-500" />,
      name: 'Suspend',
    },
  ];

  const openAddAdminModal = () => {
    openModal('AddAdmin');
  };

  useEffect(() => {
    const getPosts = async () => {
      // make sure you add await to the return data from react query (hook)
      const admins = (await AdminsData?.Data) || [];
      if (admins == null) {
        setData([]);
      }
      setData(admins || []);
      //Object.keys returns the property names of/in an object as string of arrays
      setHeaders(Object.keys(admins[0] || []));
    };
    getPosts();
  }, [useFetchAdmins, AdminsData, setData]);


  const handleViewAdmin = (id) => {
    console.log('id');
  };
  const handleModifyAdmin = (id) => {
    console.log(`modifying admin with ${id}`);
  };
  const handleSuspendAdmin = (id) => {
    console.log(`suspend admin with id of ${id}`);
  };

  const handleOptionsClick = (event, option) => {
    // console.log(event.selectedUserData)
    const innerText = option.name;
    // console.log(innerText);
    // const { name: Name, roles: Roles } = event.selectedUserData;
    // const innerText = event.currentTarget.innerText;
    const id = event.currentTarget.id;
    const { name: Name, roles: Roles } = event.selectedUserData;

    if (innerText.toLowerCase() === 'modify') {
      setDisplayUi(
        <ManageAdminRoles
          handleAdminRole={handleModifyAdmin.bind(null, id)}
          adminId={id}
          roles={Roles}
          name={Name}
        />
      );
    } else if (innerText.toLowerCase() === 'suspend') {
      setDisplayUi(
        <ConfirmDeactivate
          handleDeactivate={handleSuspendAdmin.bind(null, id)}
          screenName={innerText}
          name={Name}
        />
      );
    }
  };

  const handlePaginationChange = (event, value) => {
    setPageNumber(value);
  };

  return (
    <Fragment>
      <div className="bg-white">
        {/* <SearchBox /> */}
        {/* Below is the first functional implementation for search query */}
        {/* <SearchBoxIndex searchArray={(searchAdmins && searchAdmins.Data) ?? (AdminsData && AdminsData?.Data)} linkTo='dashboard' /> */}
        <div className="px-4 sm:px-6 lg:px-8 bg-white py-7">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                Admins
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all Opeation 5 S admins .
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                onClick={openAddAdminModal}
                className="block rounded-md px-3 bg-[#Bf0A30] py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#38404b] delay-100 ease-in-out duration-300 p-6"
              >
                Add An Admin
              </button>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div>An Error occurred: {error.message} </div>
          ) : (
            <>
              {data?.length < 1 ? (
                <div className="flex  flex-col justify-center items-center h-96 bg-gray-200  p-10 md:p-16">
                  <h3 className="font-bold mb-3">
                    No Worker has been added assigned an admin role.
                  </h3>{' '}
                  <p onClick={openAddAdminModal}>
                    Kindly add one by clicking{' '}
                    <span className="text-primary font-bold">this button</span>{' '}
                    .
                  </p>
                </div>
              ) : (
                <>
                  <ReusableTable
                    pageLink={'admins'}
                    optionModal={displayUi}
                    headers={headers}
                    data={data}
                    keyExtractor={(admin) => admin.Id}
                    filterNumber={11}
                    optionArrayList={optionList}
                    optionsHandleClick={handleOptionsClick}
                    totalSearchData={searchAdmins && searchAdmins.Data}
                  />

                  <PaginationFooter
                    pageNumber={pageNumber}
                    totalPerCount={Math.ceil(
                      AdminsData?.TotalDataCount / pageSize
                    )}
                    totalCount={Math.ceil(AdminsData?.TotalDataCount)}
                    handlePaginationChange={handlePaginationChange}
                  />
                </>
              )}
            </>
          )}
          <div className="flex justify-center items-center">
            {!isLoading && isFetching && 'Loading...'}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
