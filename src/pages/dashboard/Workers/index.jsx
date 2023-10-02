import React from 'react';
import PageTitle from '../../../components/PageTitle';
import SummeryCard from '../../../components/SummeryCard/summeryCard';
import WorkersTable from '../../../components/Table/worker.table';
import Charts from '../../../components/chart/chart';
import DashboardTabs from '../../../components/ReusableTabs';

//Todo
export default function Workers() {
  const datas = [
    {
      name: '2022',
      data: [20, 90, 50, 30, 40, 50, 70, 30, 60, 33, 52, 89],
    },
    {
      name: '2023',
      data: [10, 20, 40, 50, 70, 30, 60, 73, 60, 20, 40, 50],
    },
  ];

  const summeryTitle = ['Souls'];
  return (
    <div className="flex flex-col gap-y-6">
      <PageTitle title="Workers" />

      <DashboardTabs tabLabels={['All Workers', 'Analytics']}>
        <>
          <div className="">
            <SummeryCard title={summeryTitle[0]} />
          </div>
          <div className="p-2"></div>
          <WorkersTable />
        </>
        <div className="bg-white">
          <Charts type={'bar'} datas={datas} />
        </div>
      </DashboardTabs>
    </div>
  );
}
