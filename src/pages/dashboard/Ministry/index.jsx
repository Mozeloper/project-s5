import React, { useState, useEffect } from 'react';
import PageTitle from '../../../components/PageTitle';
import SummeryCard from '../../../components/SummeryCard/summeryCard';
import Charts from '../../../components/chart/chart';
import MinstryTable from '../../../components/Table/ministry.table';
import DashboardTabs from '../../../components/ReusableTabs';
import { useFetchMinistryDashboardAnalytics } from '../../../hooks/useFetchAnalytics';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

//Todo - 1. Add loading ui to indicate loading state
//Todo - 2. Replace useEffect with react query for data fetching
//Todo - 3. Fetch the appropriate data for Ministry(Admin)
export default function Ministry() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    data: MinistryDashboardAnalytics,
    isError,
    isLoading,
  } = useFetchMinistryDashboardAnalytics();
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
      <PageTitle title="Souls in Ministry" />

      <DashboardTabs tabLabels={['All Ministers', 'Analytics']}>
        <>
          <div className="">
            <SummeryCard
              data={
                MinistryDashboardAnalytics && MinistryDashboardAnalytics?.Data
              }
              loading={isLoading}
              error={isError}
            />
          </div>
          <div className="p-2"></div>
          <MinstryTable />
        </>
        <div className="bg-white">
          <Charts type={'scatter'} datas={ChartDatas} />
        </div>
      </DashboardTabs>
    </div>
  );
}
