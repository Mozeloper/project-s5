import React, { useState, useEffect, Fragment } from 'react'
import TransitionsModal from '../ModalPopup/modalTransition'
import AddAdminFormControl from '../UI/Forms/addAdmin.form'
import SearchBox from '../Searchbox/searchbox';
import ReusableTable from './Table.reusable';
import PaginationFooter from '../PaginationFooter';
import { useFetchAdmins } from '../../hooks/useFetchAdmins';
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { AiFillDelete } from "react-icons/ai";
import { GiConfirmed } from 'react-icons/gi'
import { GrView } from 'react-icons/gr'
import ConfirmDeactivate from '../UI/confirmation screen'


export default function AdminTables() {
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const [displayUi, setDisplayUi] = React.useState(null)
    const { data: AdminsData, isError, isLoading } = useFetchAdmins()

    const optionList = [ 
      { icon: <GrView className='text-blue-500' />, name: 'View' },
      { icon: <GiConfirmed className='text-green-500' />, name: 'Mordify' },
      { icon: <IoRemoveCircleSharp className='text-yellow-500' />, name: 'Suspend' },
    ];

    console.log('just loaded outside', AdminsData);

    useEffect(() => {
      const getPosts = async () => {
      const admins = await AdminsData
      setData(await admins?.Data);
      //Object.keys returns the property names of/in an object as string of arrays
      setHeaders(Object.keys(admins?.Data[0]));
      console.log('just loaded Effect', admins);
    };
    getPosts();
  }, [useFetchAdmins, AdminsData, setData]);

  const handleViewAdmin = (id) =>{
    console.log('id')
  }
  const handleMordifyAdmin = (id) =>{
    console.log(`modifying admin with ${id}`)
  }
  const handleSuspendAdmin = (id) =>{
    console.log(`suspend admin with id of ${id}`)
  }

  const handleClick = (event) => {
    const innerText = event.currentTarget.innerText
    const id = event.currentTarget.id
    if (innerText.toLowerCase() === 'view') {
        setDisplayUi(<ConfirmDeactivate handleDeactivate={handleViewAdmin.bind(null, id)} screenName={innerText}/>)
    } else if (innerText.toLowerCase() === 'mordify') {
        setDisplayUi(<ConfirmDeactivate handleDeactivate={handleMordifyAdmin.bind(null, id)} screenName={innerText}/>)
    } else {
        setDisplayUi(<ConfirmDeactivate handleDeactivate={handleSuspendAdmin.bind(null, id)} screenName={innerText}/>)
    }
  }
  return (
    <Fragment>
      <div className="bg-white">
        <SearchBox />
        <div className="px-4 sm:px-6 lg:px-8 bg-white py-7">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold leading-6 text-gray-900">Admins</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all Opeation 5s admins .
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                className="block rounded-md px-3 bg-[#Bf0A30] py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#38404b] delay-100 ease-in-out duration-300 p-6"
              > 
                <TransitionsModal name={'+ Add Admin'} heading={'Add a new admin'} width={'max-w-6xl w-[90%]'}>
                  <AddAdminFormControl />
                </TransitionsModal>
              </button>
            </div>
          </div>
          {
            isLoading ? <div>Loading...</div> : isError ? <div>An Error occurred </div> : 
        <>
          {
            data?.length < 1 ? <div className='flex justify-center items-center h-96'>Sorry! An error occurred, refresh and try again</div> : 
              <ReusableTable optionModal={displayUi}  headers={headers} data={data} filterNumber={11} optionArrayList={optionList} optionsHandleClick={handleClick} />
          }
        </>
        }
        </div>
        <PaginationFooter />
      </div>
    </Fragment>
  )
}
