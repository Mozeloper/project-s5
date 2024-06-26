import React, { Fragment, useEffect, useState } from 'react';
import PaginationFooter from '../PaginationFooter';
import SearchBox from '../Searchbox/searchbox';
import Loader from '../Loader';
import TransitionsModal from '../ModalPopup/modalTransition';
import AddSoulsFormControl from '../UI/Forms/addSoul.form';
import ReusableTable from './Table.reusable';
import { useFetchSoulsUnderMe } from '../../hooks/useFetchNewConvert';

import { camelCaseToSingleWords } from '../../Helper/toSeperateWord';
import { GrView } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { useTextSearchNav } from '../../context/textSearch.context';
import { useModalToggle } from '../../context/ConfirmationModal.context';

export const SoulsTable = ({ hideSearch = false }) => {
  const { modalType, openModal } = useModalToggle();

  const workerId = JSON.parse(sessionStorage.getItem('userObj'))?.Id;

  const [headers, setHeaders] = useState([] || undefined || null);
  const [data, setData] = useState([]);
  const [displayUi, setDisplayUi] = React.useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  // let { textSearch, setTextSearch } = useTextSearchNav();
  const [textSearch, setTextSearch] = useState('');

  /**
   * React Query Hook for fetching all souls registered by the worker
   * @param {number} pageNumber
   * @param {number} pageSize
   * @param {string} searchquery
   */
  const {
    data: soulsData,
    isError,
    isLoading,
  } = useFetchSoulsUnderMe({ pageNumber, pageSize, searchquery: textSearch });

  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const SoulsData = (await soulsData?.Data) || [];
      if (SoulsData == null || SoulsData == undefined) {
        setData([]);
      }
      setData(SoulsData);
      setHeaders(Object.keys(SoulsData[0] || []));
    };
    getPosts();
    // console.log(data);
  }, [soulsData]);

  const optionList = [
    { icon: <GrView className="text-blue-500" />, name: 'View' },
  ];

  const AddSoulModal = () => {
    openModal('AddSoul');
  };

  const col = headers.map((head) => {
    return {
      field: head,
      headerName: camelCaseToSingleWords(head),
      width: 150,
    };
  });

  //const handleOptionsClick = (event) => {
  // const innerText = event.currentTarget.innerText;
  // const id = event.currentTarget.id;
  //console.log(innerText);
  // if (innerText.toLowerCase() === 'view') {
  //   navigate(`/souls/${id}`);
  //  }
  // else if (modalType === 'AddSoul') {
  //   setDisplayUi(<AddSoulsFormControl />);
  // }
  //};

  const handleSearchChange = (newQuery) => {
    setTextSearch((prev) => (prev = newQuery));
  };

  const handlePaginationChange = (event, value) => {
    setPageNumber(value);
  };

  return (
    <Fragment>
      <div className="bg-white rounded-md">
        {/* <SearchBox /> */}
        <div className="px-4 sm:px-6 lg:px-8 bg-white py-7 rounded-md">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Souls
              </h1>
              {/* <p className="mt-2 text-sm text-gray-700">
                {!isAdmin
                  ? 'Here are the list of all the souls in you have won.'
                  : 'Lastest list of souls added to Opeation 5 S portal.'}
              </p> */}
              <p className="mt-2 text-sm text-gray-700">
                List of souls you've won.
              </p>
            </div>

            {!hideSearch && (
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  onClick={AddSoulModal}
                  className="block rounded-md px-3 bg-[#Bf0A30] py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#38404b] delay-100 ease-in-out duration-300 p-6 min-w-max"
                >
                  Add A Soul
                </button>
              </div>
            )}
          </div>
          {isLoading ? (
            <Loader />
          ) : !isError && data?.length <= 0 ? (
            <div className="flex text-xl flex-col p-10 md:p-16 justify-center text-center bg-gray-200 items-center h-96 mt-12">
              <h3 className="text-2xl font-bold">
                Dearly <span className="text-primary">Beloved</span>, looks like
                You haven't won any Soul so far.
              </h3>
              <p className="mt-5">
                Please be encouraged and remember that <br />
                <q>
                  The fruit of the righteous is a tree of life, <br />
                  <span className="text-primary">
                    And he who wins souls is wise
                  </span>
                  : Prov 11:30.
                </q>
              </p>
            </div>
          ) : isError || !data ? (
            <div>An error occured</div>
          ) : (
            <>
              <ReusableTable
                pageLink={'souls'}
                optionModal={displayUi}
                optionArrayList={optionList}
                // optionsHandleClick={handleOptionsClick}
                headers={headers}
                data={!isError && data}
                filterNumber={9}
                textSearch={textSearch}
                hideSearch={hideSearch}
                setTextSearch={handleSearchChange}
              />

              <PaginationFooter
                pageNumber={pageNumber}
                totalPerCount={Math.ceil(soulsData?.TotalDataCount / pageSize)}
                totalCount={Math.ceil(soulsData?.TotalDataCount)}
                handlePaginationChange={handlePaginationChange}
              />
            </>
          )}
        </div>
      </div>
      {modalType == 'AddSoul' && (
        <TransitionsModal
          isModalOpen={modalType == 'AddSoul'}
          heading={'Add New Soul Form'}
          width={'max-w-2xl w-[90%] bg-[#Bf0A30]'}
        >
          <AddSoulsFormControl />
        </TransitionsModal>
      )}
    </Fragment>
  );
};
