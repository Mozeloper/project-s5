import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import React from 'react';
import { FaSpinner } from 'react-icons/fa6';
import { MdNotificationsActive } from 'react-icons/md';
import { Link } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import SummeryCard from '../../../components/SummeryCard/summeryCard';
import DtiTable from '../../../components/Table/dti.table';
import MinstryTable from '../../../components/Table/ministry.table';
import NewBelieversTable from '../../../components/Table/newbelievers.table';
import { PerformersTable } from '../../../components/Table/performers.table';
import { SoulsAdminTable } from '../../../components/Table/souls.admin.table';
import { SoulsTable } from '../../../components/Table/souls.table';
import Charts from '../../../components/chart/chart';
import { useFetchUnapprovedCount } from '../../../hooks/useApproval';
import {
  useFetchAdminDashboardAnalytics,
  useFetchNewConvertDashboardAnalytics,
  useFetchDtiDashboardAnalytics,
  useFetchMinistryDashboardAnalytics,
  useFetchPersonalAnalytics,
} from '../../../hooks/useFetchAnalytics';
import { userFullName } from '../../../utils/index';
import './vibration.css';

export default function Home() {
  const workerId = JSON.parse(sessionStorage.getItem('userObj')).Id;

  //const roles = useRole();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const { data: CountData, isLoading, isError } = useFetchUnapprovedCount();
  // console.log(CountData);

  const roles = JSON.parse(sessionStorage.getItem('role'));
  const isSuperAdmin = roles.includes('SuperAdmin');
  const isMinistryAdmin = roles.includes('MinistryAdmin');
  const isDtiAdmin = roles.includes('DTIAdmin');
  const isNewBelieversAdmin = roles.includes('NewConvertAdmin');
  console.log(isSuperAdmin);

  const fullName = userFullName();
  const userObj = JSON.parse(sessionStorage.getItem('userObj'));
  const userId = userObj?.Id;

  let CountData = null;
  let isLoading = false;
  let isError = false;

  let AnalyticsData = null;
  let isAnalyticsLoading = false;
  let isAnalyticsError = false;

  if (isSuperAdmin || isDtiAdmin || isMinistryAdmin || isNewBelieversAdmin) {
    const {
      data,
      isLoading: loading,
      isError: error,
    } = useFetchUnapprovedCount();

    CountData = data;
    isLoading = loading;
    isError = error;
  }

  if (isSuperAdmin) {
    const {
      data,
      isLoading: loading,
      isError: error,
    } = useFetchAdminDashboardAnalytics();

    AnalyticsData = data;
    console.log(AnalyticsData);
    isAnalyticsLoading = loading;
    isAnalyticsError = error;
  }  else if (isDtiAdmin) {
    const {
      data,
      isLoading: loading,
      isError: error,
    } = useFetchDtiDashboardAnalytics();

    AnalyticsData = data;
    isAnalyticsLoading = loading;
    isAnalyticsError = error;
  } else if (isMinistryAdmin) {
    const {
      data,
      isLoading: loading,
      isError: error,
    } = useFetchMinistryDashboardAnalytics();

    AnalyticsData = data;
    isAnalyticsLoading = loading;
    isAnalyticsError = error;
  } else if (isNewBelieversAdmin) {
    const {
      data,
      isLoading: loading,
      isError: error,
    } = useFetchNewConvertDashboardAnalytics();

    AnalyticsData = data;
    console.log(AnalyticsData);
    isAnalyticsLoading = loading;
    isAnalyticsError = error;
  } else {
    const {
      data,
      isLoading: loading,
      isError: error,
    } = useFetchPersonalAnalytics({ AnalyticsId: workerId });

    AnalyticsData = data;
    console.log(AnalyticsData);
    isAnalyticsLoading = loading;
    isAnalyticsError = error;
  }

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
          {isSuperAdmin ||
          isDtiAdmin ||
          isMinistryAdmin ||
          isNewBelieversAdmin ? (
            <>
              {isError && (
                <small className="text-gray-500 flex">
                  Unable to fetch Approvals Count, please refresh your browser.
                </small>
              )}
              {(CountData || isLoading) && (
                <small className="text-gray-500 flex">
                  There are{' '}
                  {isLoading ? (
                    <FaSpinner className="text-sm animate-spin mx-2" />
                  ) : CountData ? (
                    <span className="font-bold mx-1 text-blue-600">
                      {CountData?.TotalDataCount}
                    </span>
                  ) : (
                    ''
                  )}{' '}
                  pending approval requests{' '}
                </small>
              )}
            </>
          ) : (
            <>
              {isAnalyticsError && (
                <small className="text-gray-500 flex">
                  Unable to fetch Souls Count, please refresh your browser.
                </small>
              )}
              {(AnalyticsData || isLoading) && (
                <small className="text-gray-500 flex">
                  You&apos;ve won{' '}
                  {isAnalyticsLoading ? (
                    <FaSpinner className="text-sm animate-spin mx-2" />
                  ) : AnalyticsData?.Data ? (
                    <span className="font-bold mx-1 text-blue-600">
                      {AnalyticsData?.Data?.SoulsCountThisMonth}
                    </span>
                  ) : (
                    ''
                  )}{' '}
                  soul{AnalyticsData?.Data?.SoulsCountThisMonth > 1 ? 's' : ''}{' '}
                  this month{' '}
                </small>
              )}
            </>
          )}
        </div>
        {(isSuperAdmin ||
          isDtiAdmin ||
          isMinistryAdmin ||
          isNewBelieversAdmin) && (
          <Link
            to="/approvals"
            className="bg-[#Bf0A30] h-11 text-white py-3 px-5 rounded font-medium flex justify-center max-w-[200px] mt-5 md:mt-0"
          >
            <MdNotificationsActive className="w-[18px] h-[18px] mr-2 vibrate-icon" />
            <small>View Approvals</small>
          </Link>
        )}
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
              <SoulsTable hideSearch={true} />
            )}
          </TabPanel>
          <TabPanel value="2" className="!px-2">
            <div className="">
              <SummeryCard
                data={AnalyticsData && AnalyticsData?.Data}
                loading={isAnalyticsLoading}
                error={isAnalyticsError}
              />
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
