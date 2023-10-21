import React from 'react';
import { Link } from 'react-router-dom';
import { SlOptionsVertical } from 'react-icons/sl';
import TableOptions from '../UI/Options';
import EditIcon from '@mui/icons-material/Edit';
import { camelCaseToSingleWords } from '../../Helper/toSeperateWord';
import { Chip } from '@mui/material';
import SearchBoxIndex from '../Searchbox/searchBoxIndex';

//This table is reuseable and can be use to render/display any data/apis as in (tabular form)/(table data)
const ReusableTable = ({
  headers,
  data,
  filterNumber,
  optionArrayList,
  optionsHandleClick,
  optionModal,
  pageLink,
  totalSearchData, //This going to be a get all api call with out any parameters e.g pagesize... to get the total data and get the total name with just search based on page
  //Check the admins.table.jsx file to see the full implementation for totalSearchData
  hideSearch, // Add the hideSearch prop
  setTextSearch,
  textSearch,
}) => {
  const filteredNumber = +filterNumber ?? +data?.length;

  //todo: Adding loading indicators on the table when a pageNumber is changed
  return (
    <div className="mt-8 flow-root px-[-1rem]">
      {hideSearch ? null : (
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <SearchBoxIndex
            searchArray={(totalSearchData && totalSearchData) ?? (data && data)}
            linkTo=""
            textSearch={textSearch}
            setTextSearch={setTextSearch}
          />
        </div>
      )}
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300 overflow-hidden">
            <thead>
              <tr>
                {(headers || undefined)
                  ?.slice(0, +filteredNumber)
                  .filter((head) => {
                    return (
                      (head.toLowerCase() !== 'surname' &&
                        head.toLowerCase() !== 'firstname') ||
                      head.toLowerCase() === 'fullname'
                    );
                  })
                  .map((head) => (
                    <th
                      key={head}
                      scope="col"
                      className={`pr-3 py-3.5 text-left uppercase text-sm font-semibold text-gray-900 ${
                        head.toLowerCase() === 'email' ||
                        head.toLowerCase() === 'id' ||
                        head.toLowerCase() === 'username' ||
                        head.toLowerCase() === 'surname' ||
                        head.toLowerCase() === 'othernames' ||
                        head.toLowerCase() === 'workerid' ||
                        head.toLowerCase() === 'dateofbirth' ||
                        head.toLowerCase() === 'address' ||
                        head.toLowerCase() === 'datecreated' ||
                        head.toLowerCase() === 'yearjoined'
                          ? 'hidden'
                          : ''
                      }`}
                    >
                      {(head.toLowerCase() === 'firstname' &&
                        head.toLowerCase() === 'surname') ||
                      head.toLowerCase() === 'fullname' ||
                      head === 'fullName'
                        ? 'Name'
                        : head.toLowerCase() === 'isactive'
                        ? 'Status'
                        : camelCaseToSingleWords(head)}
                    </th>
                  ))}
                <th className="pr-3 py-3.5 text-left uppercase text-sm font-semibold text-gray-900">
                  {headers && headers.length > 1 && 'ACTIONS'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {(data && data?.slice(0, +filteredNumber))?.map((row, index) => (
                <tr key={index}>
                  {headers
                    ?.slice(0, +filteredNumber)
                    .filter((head) => {
                      return (
                        (head.toLowerCase() !== 'surname' &&
                          head.toLowerCase() !== 'firstname') ||
                        head.toLowerCase() === 'fullname'
                      );
                    })
                    .map((head) => (
                      <td
                        key={head}
                        className={`whitespace-nowrap py-5 pr-3 text-sm sm:pl-0 ${
                          head.toLowerCase() === 'email' ||
                          head.toLowerCase() === 'id' ||
                          head.toLowerCase() === 'username' ||
                          head.toLowerCase() === 'surname' ||
                          head.toLowerCase() === 'othernames' ||
                          head.toLowerCase() === 'workerid' ||
                          head.toLowerCase() === 'dateofbirth' ||
                          head.toLowerCase() === 'address' ||
                          head.toLowerCase() === 'datecreated' ||
                          head.toLowerCase() === 'yearjoined'
                            ? 'hidden'
                            : ''
                        }`}
                      >
                        {(head.toLowerCase() === 'firstname' &&
                          head.toLowerCase() === 'surname') ||
                        head.toLowerCase() === 'fullname' ? (
                          <Link to={`/${pageLink}/${row['id'] ?? row['Id']}`}>
                            <div className="flex items-center">
                              <div>
                                <div className="font-medium text-gray-900 !capitalize">
                                  {/* {row['SurName'] || row['surname']}{' '}
                                {row['FirstName'] || row['firstName']}
                                {row['FullName'] ?? row['fullName']} */}
                                  {row['SurName'] && row['FirstName']
                                    ? `${row['FirstName']} ${row['SurName']}`
                                    : row['FullName'] || row['fullName']}
                                </div>
                                {/* This condition renders the email under name of the user */}
                                <div className="mt-1 text-gray-500">
                                  {row['Email'] || row['email'] || ''}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ) : head.toLowerCase() === 'roles' ? (
                          <div>
                            <div className="font-semibold text-gray-900">
                              {(row['ROLES'] ?? row['Roles']).map((role) => (
                                <Chip
                                  key={role}
                                  label={
                                    role.toLowerCase() === 'superadmin'
                                      ? 'Admin'
                                      : role.toLowerCase() === 'newconvertadmin'
                                      ? 'Believers'
                                      : role.toLowerCase() === 'dtiadmin'
                                      ? 'DTI'
                                      : 'Ministry'
                                  }
                                  className={`${
                                    role.toLowerCase() === 'superadmin'
                                      ? '!bg-primary !text-white'
                                      : role.toLowerCase() === 'newconvertadmin'
                                      ? '!bg-yellow-300'
                                      : role.toLowerCase() === 'dtiadmin'
                                      ? '!bg-blue-600 !text-white'
                                      : '!bg-green-700 !text-white'
                                  } cursor-pointer !text-[9px] mr-1`}
                                />
                              ))}
                            </div>
                          </div>
                        ) : head.toLowerCase() === 'isactive' ? (
                          <div>
                            <div
                              className={`text-xs font-semibold text-gray-900  inline-flex items-center rounded-md bg-green-50 px-2 py-1 ${
                                row['IsActive']
                                  ? 'text-green-700 bg-green-50 '
                                  : 'text-red-700 bg-red-50'
                              }`}
                            >
                              {row['IsActive'] ? 'Active' : 'Inactive'}
                            </div>
                          </div>
                        ) : (
                          <div className="font-medium text-gray-900">
                            {row[head] ? row[head] : '-'}
                          </div>
                        )}
                      </td>
                    ))}
                  <td className="text-center">
                    {
                      headers && headers.length > 1 && (
                        <TableOptions
                          displayModalUi={optionModal}
                          optionsList={optionArrayList}
                          handleClick={optionsHandleClick}
                          id={row['Id'] ?? row['id']}
                          pageLink={pageLink}
                          selectedUserData={{
                            name:
                              row['SurName'] && row['FirstName']
                                ? `${row['FirstName']} ${row['SurName']}`
                                : row['FullName'] || row['fullName'],
                            roles: row['ROLES'] || row['Roles'],
                          }}
                        />
                      )
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
