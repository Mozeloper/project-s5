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
// import Button from '@mui/material/Button';

export const SoulsTable = () => {
  const [isOpen, setIsOpen] = useState(false)
    const souls = [
        {
            name: 'David Walton',
            title: 'Pastor',
            department: 'Ministry',
            email: 'david.walton@gmail.com',
            role: 'Married',
            date: '2018-02-19',
            // isActive: 1,
            // image:
            // 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Best chinney',
            title: 'Worker',
            department: 'Enginnering (I.T)',
            email: 'lindsay.best@example.com',
            role: 'single',
            date: '2013-08-10',
            // isActive: 0,
            // image:
            // 'https://media.springernature.com/lw703/springer-static/image/art%3A10.1038%2F528452a/MediaObjects/41586_2015_Article_BF528452a_Figg_HTML.jpg',
        },
        {
            name: 'Moses Walton',
            title: 'Worker',
            department: 'Ushering',
            email: 'moses.walton@info.com',
            role: 'Married',
            date: '2019-08-12',
            // isActive: 0,
            // image:
            // 'https://www.lifewire.com/thmb/nABgUWcLKd6QW8g-0mRjYl2Vjeo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-fix-it-when-whatsapp-images-and-videos-arent-showing-in-gallery-cd3fbdebb44d4e659b7f867ac0541884.jpg',
        },
        {
            name: 'Kufre Call',
            title: 'Worker',
            department: 'Choir',
            email: 'kufre@example.com',
            role: 'Single',
            date: '2010-01-14',
            // isActive: 1,
            // image:
            // 'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
        },
        // More souls...
    ]

  const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
      const getPosts = async () => {
        //Todo - This particular endpoint was returning 500 as at 05/08/23
        //when fixed from backend uncomment and the new convert table will work fine

      // const admins = await getAllNewConvert()
      setData(souls);
      // setData(admins?.Data);
      //Object.keys returns the property names of/in an object as string of arrays
      // setHeaders(Object.keys(admins?.Data[0]));
      setHeaders(Object.keys(souls[0]));
    };
    getPosts();
  }, []);

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
