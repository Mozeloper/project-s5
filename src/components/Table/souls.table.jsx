import React, { Fragment, useEffect, useState } from 'react'
import Table from './table'
import PaginationFooter from '../PaginationFooter'
// import Button from '../Button'
import SearchBox from '../Searchbox/searchbox'
import ModalPopup from '../ModalPopup'
import TransitionsModal from '../ModalPopup/modalTransition'
import { ButtonBase } from '@mui/material'
import AddSoulsFormControl from '../UI/Forms/addSoul.form'
import ReusableTable from './Table.reusable'
import { getAllNewConvert } from '../../services/souls'
import { useFetchAllNewConvert } from '../../hooks/useFetchNewConvert'
// import Button from '@mui/material/Button';

export const SoulsTable = () => {


  const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const { data: adminsData, isError, isLoading } = useFetchAllNewConvert()

    useEffect(() => {
      const getPosts = async () => {
      const admins = await adminsData
      setData(await admins);
      //Object.keys returns the property names of/in an object as string of arrays
      setHeaders(Object.keys(await admins[0]));
    };
    getPosts();
  }, [adminsData]);

  return (
    <Fragment>
      <div className="bg-white">
        <SearchBox />
        <div className="px-4 sm:px-6 lg:px-8 bg-white py-7">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">Souls</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the souls in your account including their name, email, role and Presence.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <ButtonBase
                className="block rounded-md px-3 bg-[#Bf0A30] py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#38404b] delay-100 ease-in-out duration-300 p-6"
              > 
                <TransitionsModal name={'+ Add Soul'} heading={'Add new Soul Form'} width={'max-w-6xl w-[90%]'}>
                  <AddSoulsFormControl />
                </TransitionsModal>
              </ButtonBase>
            </div>
          </div>
          <ReusableTable headers={headers} data={data} filterNumber={9}/>
        </div>
        <PaginationFooter />
      </div>
    </Fragment>
  )
}
