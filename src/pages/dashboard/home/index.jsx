import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import React from 'react'
import { MdNotificationsActive } from 'react-icons/md'
import { Link } from 'react-router-dom'
import PageTitle from '../../../components/PageTitle'
import DtiTable from '../../../components/Table/dti.table'
import MinstryTable from '../../../components/Table/ministry.table'
import NewBelieversTable from '../../../components/Table/newbelievers.table'
import { PerformersTable } from '../../../components/Table/performers.table'
import { SoulsAdminTable } from '../../../components/Table/souls.admin.table'
import { SoulsTable } from '../../../components/Table/souls.table'
import Charts from '../../../components/chart/chart'
import { userFullName } from '../../../utils/index'
import './vibration.css'

export default function Home() {
  //const roles = useRole();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const roles = JSON.parse(sessionStorage.getItem('role'));
  const isSuperAdmin = roles.includes('SuperAdmin');
  const isMinistryAdmin = roles.includes('MinistryAdmin');
  const isDtiAdmin = roles.includes('DTIAdmin');
  const isNewBelieversAdmin = roles.includes('NewConvertAdmin');
  console.log(isSuperAdmin);

  const fullName = userFullName();
  const userObj = JSON.parse(sessionStorage.getItem('userObj'));
  const userId = userObj?.Id;

  // if(!isSuperAdmin) {

  // const {
  //   data: DynamicDashboardAnalytics,
  //   isError,
  //   isLoading,
  // } = useFetchMyAnalytics();

  // return (data, isError, isLoading)

  // } else {

  // const {
  //   data: DynamicDashboardAnalytics,
  //   isError,
  //   isLoading,
  // } = useFetchAdminDashboardAnalytics({
  //   userId,
  // });

  // return data, isError, isLoading;

  // }

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
      <PageTitle title="Dashboard" />
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
          to="/approvals"
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
              <Tab label="Lastest Souls" value="1" />
              {isSuperAdmin && <Tab label="Top Performers" value="3" />}
              <Tab label="Analytics" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" className="!px-2">
            {/* 
            The tableDataLimit is not fully implemented yet
            Todo - Renders all the table datas on the admins page dashboard and
            */}
            {isSuperAdmin ? (
              <SoulsAdminTable />
            ) : isMinistryAdmin ? (
              <MinstryTable />
            ) : isDtiAdmin ? (
              <DtiTable />
            ) : isNewBelieversAdmin ? (
              <NewBelieversTable />
            ) : (
              <SoulsTable />
            )}
          </TabPanel>
          <TabPanel value="2" className="!px-2">
            <div className="">
              {/* <SummeryCard
                data={
                  DynamicDashboardAnalytics && DynamicDashboardAnalytics?.Data
                }
                loading={isLoading}
                error={isError}
              /> */}
            </div>
            <div className="p-2"></div>
            <div className="bg-white rounded-md">
              <Charts type={'area'} datas={ChartDatas} />
            </div>
          </TabPanel>

          {isSuperAdmin && (
            <TabPanel value="3" className="!px-2">
              <div className="rounded-md bg-white flex justify-center items-center min-h-[50vh]">
                <PerformersTable />
              </div>
            </TabPanel>
          )}
        </TabContext>
      </Box>
    </div>
  );
}
