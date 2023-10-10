import ResultNotFound from '@/components/ResultNotFound'
import ReturnToPrevious from '@/components/ReturnToPrevious'
import { Email, Phone } from '@mui/icons-material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Skeleton } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import React from 'react'
import { Link } from 'react-router-dom'
import { toPascalCase } from '../../../Helper/toPascalCase'
import SummeryCard from '../../SummeryCard/summeryCard'

const DetailsByIdScreen = ({
  data,
  loading,
  notFound,
  personalAnalyticsDatas,
}) => {
  // Reminder!!! Fetch worker details based on the workerId from your data source
  const [value, setValue] = React.useState('1');
  console.log(`data : ${data}`);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {!notFound ? (
        <div className="overflow-hidden">
          <div className="w-full rounded-md relative h-[240px] bg-gradient-to-b from-[#232931] to-[#38404b] p-4 ">
            <div className="flex justify-between items-center mb-5">
              <ReturnToPrevious />

              {/* I had to comment the edit button since we're not using it now */}
              {/* <div className="">
                <Button
                  title="Edit"
                  className="w-[126px] text-sm rounded-md"
                  backgroundColor="bg-white"
                  textColor="text-secondary"
                  onClick={() => console.log('Hello')}
                />
              </div> */}
            </div>
            <div className="md:absolute md:-bottom-24 flex flex-col md:flex-row md:gap-5 gap-2 md:left-[30px] md:right-[30px] bg-white rounded-lg min-h-[150px] h-auto md:p-4 p-2">
              <div className="flex gap-4">
                {/* <img
                src={ProfileImg}
                alt="profile_img"
                loading="lazy"
                className="w-[160px] h-[160px] relative -top-16"
              /> */}
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
                        <small>
                          {(data && data?.Department) || (data && data?.Status)}
                        </small>{' '}
                        | <small>Limited Access</small>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-5 text-sm">
                    <Email className="h-5" />
                    {/* <h4>{(data && data?.Email) || '...'}</h4> */}
                    {data && data?.Email ? (
                      <h4 className="hover:underline">
                        <a href={`mailto:${data?.Email}`}>
                          {data && data?.Email}
                        </a>
                      </h4>
                    ) : (
                      '...'
                    )}
                  </div>
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
            </div>
          </div>
          <section className="mt-[180px] md:mt-28 m-auto md:mx-[30px] p-5 md:p-0">
            <Box sx={{ typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="Workers Tablist">
                    <Tab
                      label="Worker Details"
                      value="1"
                      className="!p-0 !mr-[50px]"
                    />
                    <Tab
                      label="Permissions"
                      value="2"
                      className="!p-0 !mr-[50px]"
                    />
                    <Tab
                      label="Analytics Report"
                      value="Analytics"
                      className="!p-0"
                    />
                  </TabList>
                </Box>
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
                          <h3 className="font-bold md:w-[20%]">
                            Date of Birth
                          </h3>{' '}
                          <span>{(data && data?.DateOfBirth) || '...'}</span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                          <h3 className="font-bold md:w-[20%]">
                            Marital Status
                          </h3>{' '}
                          <span>{(data && data?.MaritalStatus) || '...'}</span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                          <h3 className="font-bold md:w-[20%]">Member Since</h3>{' '}
                          <span>{(data && data?.YearJoined) || '...'}</span>
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
                          <span>{(data && data?.NearestBusStop) || '...'}</span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                          <h3 className="font-bold md:w-[20%]">State</h3>{' '}
                          <span>{(data && data?.StateName) || '...'}</span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                          <h3 className="font-bold md:w-[20%]">L.G.A.</h3>{' '}
                          <span>{(data && data?.LocalGovtName) || '...'}</span>
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
                        <h2>Personal Information</h2>
                      </div>
                      <hr />
                      <div className="flex flex-col gap-y-6 mt-6">
                        <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                          <h3 className="font-bold md:w-[20%]">
                            Qualification
                          </h3>{' '}
                          <span>
                            {(data && data?.Qualification) ||
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
                              (data && data?.EmploymentStatus) ||
                              '...'}
                          </span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                          <h3 className="font-bold md:w-[20%]">Organization</h3>{' '}
                          <span>
                            {(data && data?.NameOfOrganization) ||
                              (data && data?.NameOfOrganization) ||
                              '...'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </TabPanel>
                <TabPanel value="2" className="!px-0">
                  <div className="bg-white rounded-lg p-8 w-full min-h-[400px]">
                    <div className="text-primary font-bold mb-3">
                      <h2>Permissions</h2>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="Analytics" className="!px-0">
                  <div className="bg-white rounded-lg p-8 w-full min-h-[400px] flex flex-col gap-y-12">
                    <div className="text-[#111827] font-bold mb-3">
                      <h2>
                        Analytics Report For Souls Under{' '}
                        <span className="capitalize">
                          {data && toPascalCase(data?.FirstName)}
                        </span>{' '}
                        <span>{data && toPascalCase(data?.SurName)}</span>
                      </h2>
                    </div>
                    <SummeryCard
                      data={personalAnalyticsDatas && personalAnalyticsDatas}
                      loading={loading}
                      error={notFound}
                    />
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </section>
        </div>
      ) : (
        <ResultNotFound />
      )}
    </div>
  );
};

export default DetailsByIdScreen;
