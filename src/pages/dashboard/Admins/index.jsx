import React, { useState } from 'react';
import Charts from '../../../components/chart/chart';
import SummeryCard from '../../../components/SummeryCard/summeryCard';
import AdminTables from '../../../components/Table/admins.table';
import { useFetchAdminDashboardAnalytics } from '../../../hooks/useFetchAnalytics';
import PageTitle from '../../../components/PageTitle';
import DashboardTabs from '../../../components/ReusableTabs';
export default function Admins() {


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


  const AdminTable = () => {
    return (
      <>
        <AdminTables tableDataLimit={10} />
      </>
    );
  };

  const AdminSumary = () => {
    return (
      <div className="bg-white">
        <Charts type={'area'} datas={ChartDatas} />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-y-6">
      <PageTitle title="Manage Admins" />
      {/* 
      The tableDataLimit is not fully implemented yet
      Todo - Only render max of 5 table data on the landing page dashboard and
      Todo - A button to navigate to admins page to view all dashboard datas 
      */}
      <DashboardTabs tabLabels={['All Admins', 'Analytics']}>
        <AdminTable />
        <AdminSumary />
      </DashboardTabs>
      
    </div>
  );
}
