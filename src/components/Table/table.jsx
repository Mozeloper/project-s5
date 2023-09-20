import React, {useCallback} from "react";
import TableOptions  from "../UI/Options";
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { AiFillDelete } from "react-icons/ai";
import { GiConfirmed } from 'react-icons/gi'
import { GrView } from 'react-icons/gr'
import ConfirmDeactivate from '../UI/confirmation screen'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Table({ tableDataArray, pageLink }) {
  const navigate = useNavigate();


  const [displayUi, setDisplayUi] = React.useState(null)
  const optionList = [
    { icon: <GrView className='text-blue-500' />, name: 'View' },
    { icon: <GiConfirmed className='text-green-500' />, name: 'Promote' },
    { icon: <IoRemoveCircleSharp className='text-yellow-500' />, name: 'Deactivate' },
    { icon: <AiFillDelete className='text-primary' />, name: 'Delete' },
  ];

const handleApprovedConfirmation = useCallback(
  async (id) => {
    
    console.log('user', id);
    mutateAsync()
    console.log(`you just confirmed the worker with id ${id} `);
  }, [],
);

const handleApprovedSuspend = useCallback(
  (id) => {
    //Todo add logic/function to suspend a worker here
    console.log(`you just supended the worker with id ${id} `);
  }, [],
);


const handleDelete = useCallback(
  async (id) => {
    //Todo add logic/function to suspend a worker 
    
    console.log('user', id);
    
    console.log(`you just deleted the worker with id ${id} `);
  }, [],
);


const handleClick = (event) => {
  const innerText = event.currentTarget.innerText
  const id = event.currentTarget.id
  if ( innerText.toLowerCase() === 'view') {
    navigate(`/workers/${id}`);
  }
  else if (innerText.toLowerCase() === 'promote') {
      setDisplayUi(<ConfirmDeactivate handleDeactivate={handleApprovedConfirmation.bind(null, id)} screenName={innerText}/>)
  } else if (innerText.toLowerCase() === 'delete') {
      setDisplayUi(<ConfirmDeactivate handleDeactivate={handleDelete.bind(null, id)} screenName={innerText}/>)
  } else {
      setDisplayUi(<ConfirmDeactivate handleDeactivate={handleApprovedSuspend.bind(null, id)} screenName={innerText}/>)
  }
};


  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Department
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Year Joined
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Presence
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tableDataArray?.map((person) => (
                <tr key={person.Id}>
                  <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    {/* <div className="flex items-center"> */}
                      {/* <div className="h-11 w-11 flex-shrink-0 bg-gray-100 rounded-full">
                        <img
                          className="h-full w-full rounded-full"
                          src={person.image}
                          alt=""
                        />
                      </div> */}
                      <Link to={`/${pageLink}/${person.Id}`} className="ml-4">
                        <div className="font-medium text-gray-900 capitalize">
                          {person.FirstName}{" "}{person.SurName}
                        </div>
                        <div className="mt-1 text-gray-500">{person.Email}</div>
                      </Link>
                    {/* </div> */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div className="text-gray-900">{person.title}</div>
                    <div className="mt-1 text-gray-500">
                      {person.Department}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    {person.YearJoined}
                  </td>
                  {/* <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"></td> */}
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <span
                      className={`inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium ${
                        person.IsActive == 1
                          ? 'text-green-700 bg-green-50 '
                          : 'text-red-700 bg-red-50'
                      }  ring-1 ring-inset ring-green-600/20`}
                    >
                      {person.IsActive == 1 ? 'Active' : 'Not Active'}
                    </span>
                  </td>
                  {/*<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    {person.role}
                    </td> */}
                  <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    {/* <a
                      href={`/workers/${person.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit<span className="sr-only">, {person.name}</span>
                    </a> */}
                    <TableOptions
                      pageLink={'workers'}
                      displayModalUi={displayUi}
                      optionsList={optionList}
                      handleClick={handleClick}
                      id={`${person.Id}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
