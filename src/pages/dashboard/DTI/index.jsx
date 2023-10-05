import React from 'react'
import PageTitle from '../../../components/PageTitle'
import DashboardTabs from '../../../components/ReusableTabs'
import SummeryCard from '../../../components/SummeryCard/summeryCard'
import DtiTable from '../../../components/Table/dti.table'
import Charts from '../../../components/chart/chart'
import { useFetchDtiDashboardAnalytics } from '../../../hooks/useFetchAnalytics'

//Todo - 1. Add loading ui to indicate loading state
//Todo - 2. Replace useEffect with react query for data fetching
//Todo - 3. Fetch the appropriate data for DTI(Admin)
export default function DTI() {
  const {
    data: DtiDashboardAnalytics,
    isError,
    isLoading,
  } = useFetchDtiDashboardAnalytics();

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

  const DTITab = () => {
    return (
      <>
        <div className="">
          <SummeryCard
            data={DtiDashboardAnalytics && DtiDashboardAnalytics?.Data}
            loading={isLoading}
            error={isError}
          />
        </div>
        <div className="p-2"></div>
        <DtiTable />
      </>
    );
  };

  const Analytics = () => {
    return (
      <div className="bg-white">
        <Charts type={'heatmap'} datas={ChartDatas} />
      </div>
    );
  };

  
  return (
    <div className="flex flex-col gap-y-6">
      <PageTitle title="Souls in DTI Stage" />
      <DashboardTabs tabLabels={['Souls in DTI ', 'Analytics']}>
        <DTITab />
        <Analytics />
      </DashboardTabs>
    </div>
  );
}
