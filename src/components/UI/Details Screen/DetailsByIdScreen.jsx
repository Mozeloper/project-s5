import React from 'react';
import Button from '@/components/Button';
import { Email, Phone } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Skeleton } from '@mui/material';
import ReturnToPrevious from '@/components/ReturnToPrevious';
import ResultNotFound from '@/components/ResultNotFound';

const DetailsByIdScreen = ({ data, loading, notFound }) => {
  // Reminder!!! Fetch worker details based on the workerId from your data source
  const [value, setValue] = React.useState('1');
  // const [data, setData] = useState({});
  // const [loading, setLoading] = React.useState(false);
  // const [notFound, setNotFound] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // console.log('workerData ', workerData && workerData && data?.data && data?.Data);

  // const handleGetWorker = async () => {
  //   try {
  //     // endpoint to be refactored since backend made mistake
  //     const res = await api.get(
  //       `${appUrls.GET_WORKER_DETAILS}/${workerId}?workerId=${workerId}`
  //     );

  //     if (res?.status === 200) {
  //       setData(res?.data && data?.Data);
  //       console.log(res?.data && data?.Data);
  //       if (res?.data && data?.StatusCode === 404) {
  //         setNotFound(true);
  //       }
  //     } else {
  //       toast.error(res?.data && data?.message, 4);
  //     }
  //   } catch (error) {
  //     toast.error(error?.message, 4);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {

  //     setData(workerData && workerData && data?.data && data?.Data);
  //     // setLoading(true);
  //     // handleGetWorker().finally(() => setLoading(false));
  //  }, [workerId]);

  // console.log('details Worker', data);

  return (
    <div>
      {!notFound ? (
        <div className="overflow-hidden">
          <div className="w-full rounded-md relative h-[240px] bg-gradient-to-b from-[#232931] to-[#38404b] p-4 ">
            <div className="flex justify-between items-center mb-5">
              <ReturnToPrevious />

              <div className="">
                <Button
                  title="Edit"
                  className="w-[126px] text-sm rounded-md"
                  backgroundColor="bg-white"
                  textColor="text-secondary"
                  onClick={() => console.log('Hello')}
                />
              </div>
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
                  <Skeleton variant="circular" width={160} height={160} />
                ) : (
                  <div
                    className={`${
                      data && data?.Gender?.toLowerCase() === 'male'
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
                        variant="text"
                        className="w-20 font-bold md:text-lg text-base leading-4 capitalize"
                      />
                    ) : (
                      <h4 className="text-grey-500 font-bold md:text-lg text-base  leading-4 capitalize">
                        {data && data?.FullName}
                      </h4>
                    )}
                    {loading ? (
                      <Skeleton variant="rounded" className=" w-16 h-6 " />
                    ) : (
                      <>
                        {data?.IsActive && (
                          <div
                            className={`${
                              data?.IsActive ? 'bg-green-800' : 'bg-red-800'
                            } rounded-md text-white p-2 w-16 h-6 flex text-center justify-center items-center`}
                          >
                            <small>
                              {data?.IsActive ? 'Active' : 'Inactive'}
                            </small>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="text-gray-400 font-semibold">
                    {loading ? (
                      <div>
                        <Skeleton variant="rounded" className=" w-16 h-6 " />{' '}
                        <Skeleton variant="rounded" className=" w-16 h-6 " />
                      </div>
                    ) : (
                      <>
                        <small>
                          {(data && data?.Department) || "Worker's Department"}
                        </small>{' '}
                        | <small>Limited Access</small>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-5 text-sm">
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
                  </div>
                  <div className="flex items-center gap-5 text-sm">
                    <Phone className="h-5" />
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
                    <Tab label="Permissions" value="2" className="!p-0" />
                  </TabList>
                </Box>
                <TabPanel value="1" className="!px-0">
                  {loading ? (
                    <Skeleton variant="rounded" width="100%" height={200} />
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
                    <Skeleton variant="rounded" width="100%" height={400} />
                  ) : (
                    <div className="bg-white mt-5 rounded-lg p-8">
                      <div className="text-primary font-bold mb-3">
                        <h2>Contact Information</h2>
                      </div>
                      <hr />
                      <div className="flex flex-col gap-y-6 mt-6">
                        <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                          <h3 className="font-bold md:w-[20%]">Phone</h3>{' '}
                          <span>{(data && data?.PhoneNumber) || '...'}</span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                          <h3 className="font-bold md:w-[20%]">Email</h3>{' '}
                          <span>{(data && data?.Email) || '...'}</span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
                          <h3 className="font-bold md:w-[20%]">Address</h3>{' '}
                          <span>{(data && data?.HomeAddress) || '...'}</span>
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
                </TabPanel>
                <TabPanel value="2" className="!px-0">
                  <div className="bg-white rounded-lg p-8 w-full min-h-[400px]">
                    <div className="text-primary font-bold mb-3">
                      <h2>Permissions</h2>
                    </div>
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
