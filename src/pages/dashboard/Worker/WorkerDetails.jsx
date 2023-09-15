import React, { useState, useEffect } from 'react';
import Button from './../../../components/Button';
import { Email, Phone } from '@mui/icons-material';
import { ChevronLeft } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';
import { toast } from 'react-hot-toast';
import ReturnToPrevious from '../../../components/ReturnToPrevious';

import NotFoundImg from '../../../assets/not-found.jpg';

const WorkerDetails = ({ workerId }) => {
  // Reminder!!! Fetch worker details based on the workerId from your data source
  const [data, setData] = useState({});
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleGetWorker = async () => {
    setData({});
    try {
      const res = await api.get(`${appUrls.GET_WORKER_DETAILS}/${workerId}`);
      if (res?.status === 200) {
        setData(res?.data?.Data);
      }
    } catch (error) {
      toast.error(error?.data?.message, 4);
    } finally {
    }
  };

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        handleGetWorker();
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      {Object.keys(data).length !== 0 ? (
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
            <div className="md:absolute -bottom-24 flex md:gap-5 gap-2 md:left-[30px] md:right-[30px] bg-white rounded-lg min-h-[150px] h-auto md:p-4 p-2">
              <div className="flex gap-4">
                {/* <img
                src={ProfileImg}
                alt="profile_img"
                loading="lazy"
                className="w-[160px] h-[160px] relative -top-16"
              /> */}
                <div className="w-[160px] h-[160px] relative rounded-full bg-black text-white"></div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-2 md:gap-8 gap-2">
                <div className="flex flex-col gap-3 p-5">
                  <div className="flex flex-col md:flex-row gap-6">
                    <h4 className="text-grey500 font-medium md:text-sm text-xs  leading-4">
                      {data?.FirstName || workerId} {data?.SurName || '....'}
                    </h4>
                    <div className="bg-green-800 rounded-md text-white p-2 w-16 h-8 flex text-center justify-center items-center">
                      <small>ACTIVE</small>
                    </div>
                  </div>
                  <div className="text-gray-400 font-semibold">
                    <small>{data?.Department || "Worker's Department"}</small> |{' '}
                    <small>Limited Access</small>
                  </div>
                  <div className="flex gap-5">
                    <Email className="h-8" />
                    <h4>{data?.Email || '...'}</h4>
                  </div>
                  <div className="flex gap-5">
                    <Phone className="h-8" />
                    <h4>{data?.PhoneNumber || '...'}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="mt-28 m-auto md:mx-[30px]">
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
                  <div className="bg-white rounded-lg p-8">
                    <div className="text-primary font-bold mb-3">
                      <h2>Basic Information</h2>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-y-6 mt-6">
                      <div className="flex gap-x-16">
                        <h3 className="font-bold w-[20%]">Gender</h3>{' '}
                        <span>{data?.Gender || '...'}</span>
                      </div>
                      <div className="flex gap-x-16">
                        <h3 className="font-bold w-[20%]">Date of Birth</h3>{' '}
                        <span>{data?.DateOfBirth || '...'}</span>
                      </div>
                      <div className="flex gap-x-16">
                        <h3 className="font-bold w-[20%]">Marital Status</h3>{' '}
                        <span>{data?.MaritalStatus || '...'}</span>
                      </div>
                      <div className="flex gap-x-16">
                        <h3 className="font-bold w-[20%]">Member Since</h3>{' '}
                        <span>{data?.YearJoined || '...'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white mt-5 rounded-lg p-8">
                    <div className="text-primary font-bold mb-3">
                      <h2>Contact Information</h2>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-y-6 mt-6">
                      <div className="flex gap-x-16">
                        <h3 className="font-bold w-[20%]">Phone</h3>{' '}
                        <span>{data?.PhoneNumber || '...'}</span>
                      </div>
                      <div className="flex gap-x-16">
                        <h3 className="font-bold w-[20%]">Email</h3>{' '}
                      </div>
                      <div className="flex gap-x-16">
                        <h3 className="font-bold w-[20%]">Address</h3>{' '}
                        <span>{data?.HomeAddress || '...'}</span>
                      </div>
                      <div className="flex gap-x-16">
                        <h3 className="font-bold w-[20%]">Nearest Bus Stop</h3>{' '}
                        <span>{data?.NearestBusStop || '...'}</span>
                      </div>
                      <div className="flex gap-x-16">
                        <h3 className="font-bold w-[20%]">State</h3>{' '}
                        <span>{data?.StateName || '...'}</span>
                      </div>
                      <div className="flex gap-x-16">
                        <h3 className="font-bold w-[20%]">L.G.A.</h3>{' '}
                        <span>{data?.LocalGovtName || '...'}</span>
                      </div>
                      <div className="flex gap-x-16">
                        <h3 className="font-bold w-[20%]">Country</h3>{' '}
                        <span>{data?.CountryName || '...'}</span>
                      </div>
                    </div>
                  </div>
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
        <div className=" bg-white p-5">
          <ReturnToPrevious />
          <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <img src={NotFoundImg} className="w-[200px]" />
            <h1 className="text-3xl mt-4"> Record Not Found</h1>
            {/* <p className="text-xl text-primary mb-8">No record was found.</p> */}
          </div>
        </div>
      )}
      {/* Render worker information based on the workerId */}
    </div>
  );
};

export default WorkerDetails;