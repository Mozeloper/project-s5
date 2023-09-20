import React from "react";
import { Link } from "react-router-dom";
import { SlOptionsVertical } from 'react-icons/sl'
import TableOptions  from "../UI/Options";
import EditIcon from '@mui/icons-material/Edit';
import { camelCaseToSingleWords } from "../../Helper/toSeperateWord";

//This table is reuseable and can be use to render/display any data/apis as in (tabular form)/(table data)
const ReusableTable = ({ headers, data, filterNumber, optionArrayList, optionsHandleClick, optionModal, pageLink }) => {
    const filteredNumber = +filterNumber ?? +data?.length;
    
  return (
    <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                    <tr>
                        {( headers || undefined)?.slice(0, +filteredNumber).map(head => (
                        <th key={head} scope="col" className={`pr-3 py-3.5 text-left uppercase text-sm font-semibold text-gray-900 ${head.toLowerCase() === 'email' || head.toLowerCase() === 'id' || head.toLowerCase() === 'username' || head.toLowerCase() === 'surname' || head.toLowerCase() === 'othernames' || head.toLowerCase() === 'workerid' || head.toLowerCase() === 'dateofbirth' || head.toLowerCase() === 'datecreated' ? 'hidden' : '' }`}>
                            {head.toLowerCase() === 'firstname' || head.toLowerCase() === 'fullname' || head === 'fullName' ? 'Name' : 
                          camelCaseToSingleWords(head)}
                        </th>
                        ))}
                        <th>{ (headers && headers.length > 1 ) && 'Edit' }</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {(data && data?.slice(0, +filteredNumber))?.map((row, index) => (
                            <tr key={index}>
                                {headers?.slice(0, +filteredNumber).map(head => (
                                    <td key={head} className={`whitespace-nowrap py-5 pr-3 text-sm sm:pl-0 ${head.toLowerCase() === 'email' || head.toLowerCase() === 'id' || head.toLowerCase() === 'username' || head.toLowerCase() === 'surname' || head.toLowerCase() === 'othernames' || head.toLowerCase() === 'workerid' || head.toLowerCase() === 'dateofbirth' || head.toLowerCase() === 'datecreated' ? 'hidden' : '' }`}>
                                        {head.toLowerCase() === 'firstname' || head.toLowerCase() === 'fullname'  ?
                                            <Link to={`/${pageLink}/${row['Id'] || row['id']}`}>
                                                <div className="flex items-center">
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {row['SurName'] || row['surname']} 
                                                            {row['FirstName'] || row['firstName']}
                                                            {row['FullName'] ?? row['fullName']}
                                                        </div>
                                                        {/* This condition renders the email under name of the user */}
                                                        <div className="mt-1 text-gray-500">{row['Email'] || row['email'] || 'no email'}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        : <div className="font-medium text-gray-900">
                                            {
                                                row[head] ? row[head] : '-' 
                                            }
                                            </div> 
                                        } 
                                        
                                    </td>
                                ))}
                                <td> 
                                { (headers && headers.length > 1 ) &&
                                 <TableOptions displayModalUi={optionModal} optionsList={optionArrayList} handleClick={optionsHandleClick} id={`${row['Id']}`} pageLink={pageLink}/>
                                    // <Options linkId={`/${row['Id']}`}>
                                    //     <SlOptionsVertical />
                                    // </Options> 
                                }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default ReusableTable;