import React, { useEffect, useState } from 'react';
import Charts from '../../../components/chart/chart';
import SummeryCard from '../../../components/SummeryCard/summeryCard';
import AdminTables from '../../../components/Table/admins.table';
import { SoulsTable } from '../../../components/Table/souls.table';
import {
  useFetchAdminDashboardAnalytics,
  useFetchDynamicDashboardAnalytics,
  useFetchSoulsCount,
  useFetchWorkersCount,
} from '../../../hooks/useFetchAnalytics';
import { userFullName } from '../../../utils/index';
import { MdNotificationsActive } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './vibration.css';
import useRole from '../../../hooks/useRole';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function Home() {
  //const roles = useRole();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const roles = JSON.parse(sessionStorage.getItem('role'));
  const isSuperAdmin = roles.includes('SuperAdmin');
  console.log(isSuperAdmin);

  const fullName = userFullName();
  const userObj = JSON.parse(sessionStorage.getItem('userObj'));
  const userId = userObj?.Id;

  const {
    data: DynamicDashboardAnalytics,
    isError,
    isLoading,
  } = useFetchDynamicDashboardAnalytics({ roles, userId });

  const ChartDatas = [
    {
      name: '2022',
      data: [20, 90, 50, 30, 40, 50, 70, 30, 60, 33, 52, 89],
    },
    {
      name: '2023',
      data: [10, 20, 40, 50, 70, 30, 60, 73, 60, 20, 40, 50],
    },
  ];

  return (
    <div className="flex flex-col gap-y-6">
      <div className="rounded-md bg-white py-12 px-5 md:px-6 md:flex md:justify-between gap-5">
        <div>
          <h2 className="font-bold text-3xl">
            Hello, <span className="capitalize">{userObj?.FirstName}!</span>
          </h2>
          <small className="text-gray-500">
            You have 0 pending notifications
          </small>
        </div>
        <Link
          to="/reminder"
          className="bg-primary h-11 text-white py-3 px-5 rounded-full flex justify-center max-w-[145px] mt-5 md:mt-0"
        >
          <MdNotificationsActive className="w-[18px] h-[18px] mr-2 vibrate-icon" />
          <small>Notifications</small>
        </Link>{' '}
      </div>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="">
              <Tab label="Analytics" value="1" />
              <Tab label="Lastest Souls" value="2" />
              {isSuperAdmin && <Tab label="Top Performers" value="3" />}
            </TabList>
          </Box>
          <TabPanel value="1" className="!px-2">
            <div className="">
              <SummeryCard
                data={
                  DynamicDashboardAnalytics && DynamicDashboardAnalytics?.data
                }
                loading={isLoading}
                error={isError}
              />
            </div>
            <div className="p-2"></div>
            <div className="bg-white rounded-md">
              <Charts type={'area'} datas={ChartDatas} />
            </div>
          </TabPanel>
          <TabPanel value="2" className="!px-2">
            {/* 
            The tableDataLimit is not fully implemented yet
            Todo - Renders all the table datas on the admins page dashboard and
            */}
            <SoulsTable isAdmin={isSuperAdmin} tableDataLimit={11} />
          </TabPanel>
          {isSuperAdmin && (
            <TabPanel value="3" className="!px-2">
              <div className="rounded-md bg-white flex justify-center items-center min-h-[50vh]">
                <h4 className="font-bold">Coming Soon</h4>
              </div>
            </TabPanel>
          )}
        </TabContext>
      </Box>
    </div>
  );
}
