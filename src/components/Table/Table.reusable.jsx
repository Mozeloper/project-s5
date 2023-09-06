import React from "react";
import { Link } from "react-router-dom";

//This table is reuseable and can be use to render/display any data/apis as in (tabular form)/(table data)
const ReusableTable = ({ headers, data }) => {
    const filterHeading = '';
  return (
    <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                    <tr>
                        { headers.map(head => (
                        <th key={head} scope="col" className={`pr-3 pl-5 py-3.5 text-left text-sm font-semibold text-gray-900 ${head === 'Email' || head === 'Id' || head === 'UserName' || head === 'SurName' || head === 'OtherNames' ? 'hidden' : '' }`}>
                            {head === 'FirstName' ? 'Name' : 
                           head}
                        </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {data.map((row, index) => (
                            <tr key={index}>
                                {headers.map(head => (
                                    <td key={head} className={`whitespace-nowrap py-5 pr-3 text-sm sm:pl-0 ${head === 'Email' || head === 'Id' || head === 'UserName' || head === 'SurName' || head === 'OtherNames' ? 'hidden' : '' }`}>
                                        {head === 'FirstName' ?
                                            <Link to={`/${row['Id']}`}>
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="font-medium text-gray-900">
                                                            {row['SurName']} {row['FirstName']}
                                                        </div>
                                                        {/* This condition renders the email under name of the user */}
                                                        <div className="mt-1 text-gray-500">{row['Email']}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        : <div className="font-medium text-gray-900">
                                                {row[head]}
                                            </div> 
                                        } 
                                        
                                    </td>
                                ))}
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