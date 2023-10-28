import ResultNotFound from '@/components/ResultNotFound';
import ReturnToPrevious from '@/components/ReturnToPrevious';
import { Phone } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Button';
import EditConvertDetails from '../../EditConvertDetails';
import ModalPopup from '../../ModalPopup';

const ConvertDetailsByIdScreen = ({
  data,
  loading,
  notFound,
  isDeactivated = false,
}) => {
  const [value, setValue] = React.useState(isDeactivated ? '0' : '1');
  const [openModal, setOpenModal] = useState(false);
  const roles = JSON.parse(sessionStorage.getItem('role'));
  //check if user is not an admin
  const isUser = roles.includes('User') && roles.length <= 1;
  const isAdmin = roles.some((role) => role.toLowerCase().includes('admin'));

  //console.log(`data : ${data}`);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {!notFound ? (
        <>
          <ModalPopup isOpen={openModal}>
            <EditConvertDetails data={data} setOpenModal={setOpenModal} />
          </ModalPopup>
          <div className="overflow-hidden">
            <div className="w-full rounded-md relative min-h-[240px] bg-gradient-to-b from-[#232931] to-[#38404b] p-4 ">
              <div className="flex justify-between mb-5">
                <ReturnToPrevious />
                {(isAdmin || (isUser && !data?.IsAssigned)) && (
                  // show edit button for none admin user only when the soul has not yet been assigned

                  <div className="w-full flex justify-end">
                    {data?.FirstName ? (
                      <Button
                        title="Edit"
                        className="w-[126px] text-sm rounded-md"
                        backgroundColor="bg-white"
                        textColor="text-secondary"
                        onClick={() => setOpenModal(true)}
                      />
                    ) : (
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={126}
                        height={40}
                        className="w-[126px] text-sm rounded-md !bg-gray-200"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="md:absolute md:-bottom-24 flex flex-col md:flex-row md:gap-5 gap-2 md:left-[30px] md:right-[30px] bg-white rounded-lg min-h-[150px] h-auto md:p-4 p-2">
                <div className="flex gap-4">
                  {loading ? (
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width={160}
                      height={160}
                    />
                  ) : (
                    <div
                      className={`${
                        (data && data?.Gender)?.toLowerCase() === 'male'
                          ? 'bg-blue-900'
                          : 'bg-pink-700'
                      } w-[160px] h-[160px] flex items-center justify-center text-6xl relative rounded-full text-white uppercase`}
                    >
                      {data && data?.FirstName?.charAt(0)}
                      {data && data?.SurName?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:gap-8 gap-2">
                  <div className="flex flex-col gap-3 p-5">
                    <div className="flex gap-6 items-center">
                      {loading ? (
                        <Skeleton
                          animation="wave"
                          variant="text"
                          className="w-20 font-bold md:text-lg text-base leading-4 capitalize"
                        />
                      ) : (
                        <h4 className="text-grey-500 font-bold md:text-lg text-base  leading-4 capitalize">
                          {/* {data && data?.FirstName} {data && data?.SurName} */}
                          {data && data?.FullName}
                        </h4>
                      )}
                      {loading ? (
                        <Skeleton
                          animation="wave"
                          variant="rounded"
                          className=" w-16 h-6 "
                        />
                      ) : (
                        <>
                          <div
                            className={`${
                              data?.IsActive ? 'bg-green-800' : 'bg-red-800'
                            } rounded-md text-white p-2 w-16 h-6 flex text-center justify-center items-center`}
                          >
                            <small>
                              {data?.IsActive ? 'Active' : 'Inactive'}
                            </small>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="text-gray-400 font-semibold">
                      {loading ? (
                        <div>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            className=" w-16 h-6 "
                          />{' '}
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            className=" w-16 h-6 "
                          />
                        </div>
                      ) : (
                        <>
                          {data && data?.Department ? (
                            <small>{data?.Department}</small>
                          ) : (
                            <>
                              <small>
                                <span className="font-bold text-primary mr-2">
                                  Stage:
                                </span>{' '}
                                {data?.Status}
                              </small>{' '}
                            </>
                          )}
                        </>
                      )}
                    </div>
                    {/* <div className="flex items-center gap-5 text-sm">
                      <Email className="h-5" />
                      {data && data?.Email ? (
                        <h4 className="hover:underline">
                          <a href={`mailto:${data?.Email}`}>
                            {data && data?.Email}
                          </a>
                        </h4>
                      ) : (
                        '...'
                      )}
                    </div> */}
                    <div className="flex items-center gap-5 text-sm">
                      <Phone className="h-5" />
                      {/* <h4>{(data && data?.PhoneNumber) || '...'}</h4> */}
                      <h4 className="hover:underline">
                        {data && data?.PhoneNumber ? (
                          <a href={`tel:${data?.PhoneNumber}`}>
                            {data && data?.PhoneNumber}
                          </a>
                        ) : (
                          '...'
                        )}
                      </h4>
                    </div>
                    {data?.CreatedBy && (
                      <div className="flex items-center gap-2 text-sm">
                        {/* <h4>{(data && data?.PhoneNumber) || '...'}</h4> */}
                        <h2 className="font-bold text-blue-900">Won by:</h2>
                        <h4 className="hover:underline">
                          {data && data?.PhoneNumber ? (
                            <Link to={`/workers/${data?.WorkerId}`}>
                              <span className="text-gray-400 font-semibold capitalize">
                                {data && data?.CreatedBy}
                              </span>
                            </Link>
                          ) : (
                            '...'
                          )}
                        </h4>
                      </div>
                    )}
                  </div>
                </div>
                {data?.IsAssigned && (
                  <div className="flex flex-col md:gap-2 gap-2">
                    <div className="flex gap-3 p-5 w-full md:mt-10">
                      <small className="font-bold text-primary mr-2">
                        Discipler
                      </small>
                      <small>: {data?.Discipler || '...'}</small>
                    </div>
                    <div className="flex gap-3 p-5 w-full">
                      <small>
                        {' '}
                        <span className="font-bold text-black mr-2">
                          Date Assigned
                        </span>
                        : {data?.DateAssigned || '...'}
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <section className="mt-2 md:mt-28 m-auto md:mx-[30px] p-5 md:p-0">
              <Box sx={{ typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="Workers Tablist"
                    >
                      {isDeactivated && (
                        <Tab
                          label="Deactivation Details"
                          value="0"
                          className="!p-0 !mr-[50px]"
                        />
                      )}
                      <Tab
                        label="Convert Details"
                        value="1"
                        className="!p-0 !mr-[50px]"
                      />
                    </TabList>
                  </Box>

                  {isDeactivated && (
                    <TabPanel value="0" className="!px-0">
                      {loading ? (
                        <Skeleton
                          animation="wave"
                          variant="rounded"
                          width="100%"
                          height={200}
                        />
                      ) : (
                        <div className="bg-white rounded-lg p-8">
                          <div className="text-primary font-bold mb-3">
                            <h2>Deactivation Details</h2>
                          </div>
                          <hr />
                          <div className="flex flex-col gap-y-6 mt-6">
                            <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                              <h3 className="font-bold md:w-[20%]">
                                Deactivated By
                              </h3>{' '}
                              <span className="capitalize">
                                {(data && data?.DeactivatedBy) ||
                                  data?.DeactivitatedBy ||
                                  '...'}
                              </span>
                            </div>
                            <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                              <h3 className="font-bold md:w-[20%]">
                                Deactivation Reason
                              </h3>{' '}
                              <span>
                                {(data && data?.ReasonForDeactivation) || '...'}
                              </span>
                            </div>
                            <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                              <h3 className="font-bold md:w-[20%]">
                                Deactivation Date
                              </h3>{' '}
                              <span>
                                {(data && data?.DateDeactivated) ||
                                  data?.DateDeactivitated ||
                                  '...'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </TabPanel>
                  )}
                  <TabPanel value="1" className="!px-0">
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="100%"
                        height={200}
                      />
                    ) : (
                      <div className="bg-white rounded-lg p-8">
                        <div className="text-primary font-bold mb-3">
                          <h2>Basic Information</h2>
                        </div>
                        <hr />
                        <div className="flex flex-col gap-y-6 mt-6">
                          <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                            <h3 className="font-bold md:w-[20%]">Gender</h3>{' '}
                            <span>{(data && data?.Gender) || '...'}</span>
                          </div>
                          <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                            <h3 className="font-bold md:w-[20%]">Email</h3>{' '}
                            <span>
                              {data && data?.Email ? (
                                <Link
                                  to={`mailto:${data?.Email}`}
                                  className="hover:underline"
                                >
                                  {data && data?.Email}
                                </Link>
                              ) : (
                                '...'
                              )}
                            </span>
                          </div>
                          {/* <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                            <h3 className="font-bold md:w-[20%]">
                              Date of Birth
                            </h3>{' '}
                            <span>{(data && data?.DateOfBirth) || '...'}</span>
                          </div> */}
                          <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                            <h3 className="font-bold md:w-[20%]">
                              Marital Status
                            </h3>{' '}
                            <span>
                              {(data && data?.MaritalStatus) || '...'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="100%"
                        height={400}
                      />
                    ) : (
                      <div className="bg-white mt-5 rounded-lg p-8">
                        <div className="text-primary font-bold mb-3">
                          <h2>Contact Information</h2>
                        </div>
                        <hr />
                        <div className="flex flex-col gap-y-6 mt-6">
                          <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                            <h3 className="font-bold md:w-[20%]">Phone</h3>{' '}
                            <span>
                              {data && data?.PhoneNumber ? (
                                <Link
                                  to={`mailto:${data?.PhoneNumber}`}
                                  className="hover:underline"
                                >
                                  {data && data?.PhoneNumber}
                                </Link>
                              ) : (
                                '...'
                              )}
                            </span>
                          </div>

                          <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                            <h3 className="font-bold md:w-[20%]">Address</h3>{' '}
                            <span>
                              {(data && data?.HomeAddress) ||
                                (data && data?.Address) ||
                                '...'}
                            </span>
                          </div>
                          <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                            <h3 className="font-bold md:w-[20%]">
                              Nearest Bus Stop
                            </h3>{' '}
                            <span>
                              {(data && data?.NearestBusStop) || '...'}
                            </span>
                          </div>
                          <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                            <h3 className="font-bold md:w-[20%]">State</h3>{' '}
                            <span>{(data && data?.StateName) || '...'}</span>
                          </div>
                          <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                            <h3 className="font-bold md:w-[20%]">
                              City Of Residence
                            </h3>{' '}
                            <span>{(data && data?.City) || '...'}</span>
                          </div>
                          <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                            <h3 className="font-bold md:w-[20%]">Country</h3>{' '}
                            <span>{(data && data?.CountryName) || '...'}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {loading ? (
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="100%"
                        height={400}
                      />
                    ) : (
                      <div className="bg-white mt-5 rounded-lg p-8">
                        <div className="text-primary font-bold mb-3">
                          <h2>Account Information</h2>
                        </div>
                        <hr />
                        <div className="flex flex-col gap-y-6 mt-6">
                          <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                            <h3 className="font-bold md:w-[20%]">
                              Qualification
                            </h3>{' '}
                            <span>
                              {(data && data?.qualification) ||
                                (data && data?.Qualification) ||
                                '...'}
                            </span>
                          </div>
                          <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                            <h3 className="font-bold md:w-[20%]">
                              Employement Status
                            </h3>{' '}
                            <span>
                              {(data && data?.EmploymentStatus) ||
                                (data && data?.employmentStatus) ||
                                '...'}
                            </span>
                          </div>
                          {data?.Status.toLowerCase() === 'ministry' && (
                            <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                              <h3 className="font-bold md:w-[20%]">
                                Member Since
                              </h3>{' '}
                              <span>{(data && data?.YearJoined) || '...'}</span>
                            </div>
                          )}
                          {/* <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                            <h3 className="font-bold md:w-[20%]">
                              Organization
                            </h3>{' '}
                            <span>
                              {(data && data?.NameOfOrganization) ||
                                (data && data?.NameOfOrganization) ||
                                '...'}
                            </span>
                          </div> */}
                        </div>
                      </div>
                    )}
                  </TabPanel>
                </TabContext>
              </Box>
            </section>
          </div>
        </>
      ) : (
        <ResultNotFound />
      )}
    </div>
  );
};

export default ConvertDetailsByIdScreen;
