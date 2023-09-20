import React, { useCallback, useEffect, useState } from 'react'
import { MdDeleteSweep, MdOutlineAddLink } from 'react-icons/md'
import { GrConnect } from 'react-icons/gr'
import ReusableTable from '../Table.reusable';
import PaginationFooter from '../../PaginationFooter';
import { useFetchAllDeactivatedNewConvert } from '../../../hooks/useFetchUnapproved';
import ConfirmDeactivate from '../../UI/confirmation screen';

export default function DeactivatedNewConvertTable() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [displayUi, setDisplayUi] = React.useState(null)
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const { data: DeactivatedNewConvertData, isLoading, isError } = useFetchAllDeactivatedNewConvert({ pageNumber, pageSize })

    useEffect(() => {
      const getPosts = async () => {
      const admins = await DeactivatedNewConvertData?.Data
      setData(admins || []);
      setHeaders(Object.keys(await admins[0] || []));
    };
    getPosts();
  }, [DeactivatedNewConvertData]);

    const optionList = [
      { icon: <MdOutlineAddLink />, name: ` Reactivate` },
      { icon: <MdDeleteSweep />, name: ` Delete` },
    ];

 
  const handleDelete = useCallback(
    async (id) => {
      console.log(`you just deleted the worker with id ${id} `);
    }, [],
  );

  const handleOptionsClick = (event) => {
    const innerText = event.currentTarget.innerText
    const id = event.currentTarget.id
    if (innerText.toLowerCase() === 'reactivate') {
        setDisplayUi(<ConfirmDeactivate handleDeactivate={() => console.log(innerText, id)} screenName={innerText}/>)
    } else if (innerText.toLowerCase() === 'delete') {
        setDisplayUi(<ConfirmDeactivate handleDeactivate={handleDelete.bind(null, id)} screenName={innerText}/>)
    } else {
        null
    }
  };

  const handlePaginationChange = (event, value) => {
    setPageNumber(value);
  };


  return (
    <div className="px-8 bg-white pt-7 grid grid-cols-1 gap-y-8">
      <h3 className='sm:text-left text-center'>The List of all Deactivated newconvert</h3>
        {
            isLoading ? <div>Loading...</div> : isError ? <div>An Error occurred </div> : 
        <>

        {
          data?.length < 1 || !data ? <div className='flex text-center justify-center items-center h-96'>There's No Deactivated Account At the moment</div> : 
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
              pageNumber={pageNumber} totalPerCount={Math.ceil(DeactivatedNewConvertData?.TotalDataCount / pageSize)} totalCount={Math.ceil(DeactivatedNewConvertData?.TotalDataCount)} handlePaginationChange={handlePaginationChange}
            />
          </>
        }
          
        </>
        }
    </div>
  )
}
