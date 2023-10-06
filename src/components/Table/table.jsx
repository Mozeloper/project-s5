import React, { useCallback } from 'react'
import { GiConfirmed } from 'react-icons/gi'
import { GrView } from 'react-icons/gr'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { suspendAWorker } from '../../services/worker.api'
import TableOptions from '../UI/Options'
import PromoteWorkerToAdmin from '../UI/PromoteScreen/PromoteWorkerToAdmin'
import SuspendConvert from '../UI/SuspendConvert'

export default function Table({ tableDataArray, pageLink }) {
  const queryClient = useQueryClient();

  const [displayUi, setDisplayUi] = React.useState(null);
  const optionList = [
    { icon: <GrView className="text-blue-500" />, name: 'View' },
    { icon: <GiConfirmed className="text-green-500" />, name: 'Promote' },
    {
      icon: <IoRemoveCircleSharp className="text-yellow-500" />,
      name: 'Deactivate',
    },
  ];

  /**
   * Handler for Promoting a Worker to An Admin Position
   * @param {string} workerId
   * @param {string} role
   */
  // const handlePromotionConfirmation = useCallback(async (id) => {
  //   console.log('user', id);
  //   console.log(`you just confirmed the worker with id ${id} `);
  // }, []);


  /**
   * Handler for Suspending A Worker
   * @param {string} workerId
   * @param {string} reason
   */
  const handleSuspend = useCallback(async (id, reason) => {
    //Todo add logic/function to suspend a worker here
    //console.log(id, reason);
    await suspendAWorker(id, reason);
    queryClient.invalidateQueries('workers');
    console.log(`you just supended the worker with id ${id} for ${reason} `);
  }, []);


  /**
   * Function in charge of launching the modal to be displayed
   * @param {Event} event
   */
  const handleClick = (event) => {
    const innerText = event.currentTarget.innerText;
    const id = event.currentTarget.id;
     if (innerText.toLowerCase() === 'promote') {
      setDisplayUi(
        <PromoteWorkerToAdmin
          promoteCallback={() => queryClient.invalidateQueries('All Admins')}
          screenName={innerText}
          workerId={id}
        />
      );
    } else if (innerText.toLowerCase() === 'deactivate') {
      setDisplayUi(
        <SuspendConvert
          handleDeactivate={handleSuspend.bind(null, id)}
          screenName={innerText}
        />
      );
    } else {
      null;
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
                        {person.FullName}
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
                        person.IsActive
                          ? 'text-green-700 bg-green-50 '
                          : 'text-red-700 bg-red-50'
                      }  ring-1 ring-inset ring-green-600/20`}
                    >
                      {person.IsActive ? 'Active' : 'Not Active'}
                    </span>
                  </td>
                  {/*<td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    {person.role}
                    </td> */}
                  <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
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
