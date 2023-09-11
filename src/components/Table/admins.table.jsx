import React, { useState, useEffect, Fragment } from 'react'
import TransitionsModal from '../ModalPopup/modalTransition'
import AddSoulsFormControl from '../UI/Forms/addSoul.form'
import SearchBox from '../Searchbox/searchbox';
import ReusableTable from './Table.reusable';
import PaginationFooter from '../PaginationFooter';
import { useFetchAdmins } from '../../hooks/useFetchAdmins';

export default function AdminTables() {
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const { data: AdminsData, isError, isLoading } = useFetchAdmins()

    useEffect(() => {
      const getPosts = async () => {
      const admins = await AdminsData
      setData(admins?.Data);
      //Object.keys returns the property names of/in an object as string of arrays
      setHeaders(Object.keys(admins?.Data[0]));
    };
    getPosts();
  }, [AdminsData, setData, setHeaders]);

  return (
    <Fragment>
      <div className="bg-white">
        <SearchBox />
        <div className="px-4 sm:px-6 lg:px-8 bg-white py-7">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">Admins</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the souls in your account.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                className="block rounded-md px-3 bg-[#Bf0A30] py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#38404b] delay-100 ease-in-out duration-300 p-6"
              > 
                <TransitionsModal name={'+ Add Soul'} heading={'Add new Soul Form'} width={'max-w-6xl w-[90%]'}>
                  <AddSoulsFormControl />
                </TransitionsModal>
              </button>
            </div>
          </div>
          {
            isLoading ? <div>Loading...</div> : isError ? <div>An Error occurred </div> : 
        <>
          {
            data?.length < 1 ? <div className='flex justify-center items-center h-96'>There's No pending "Unapproved" Account At the moment</div> : 
              <ReusableTable headers={headers} data={data} filterNumber={11}/>
          }
        </>
        }
        </div>
        <PaginationFooter />
      </div>
    </Fragment>
  )
}
