import React from 'react'
import PageTitle from '../../../components/PageTitle'
import SummeryCard from '../../../components/SummeryCard/summeryCard'
import { SoulsTable } from '../../../components/Table/souls.table'
import { useFetchPersonalAnalytics } from '../../../hooks/useFetchAnalytics'

//Todo - 1. Add loading ui to indicate loading state
//Todo - 2. Replace useEffect with react query for data fetching
//Todo - 3. Ensure that the "get-all-new-converts" endpoint is now working and not returning 500 then uncomment the code in the SoulsTable
export default function Souls() {
  const workerId = JSON.parse(sessionStorage.getItem('userObj')).Id;
  console.log(workerId);
  const {
    data: PersonalAnalytics,
    isError,
    isLoading,
  } = useFetchPersonalAnalytics({ AnalyticsId: workerId });

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

  const summeryTitle = ['Souls'];
  return (
    <div className="flex flex-col gap-y-6">
      <PageTitle title="Souls" />
      <div className="">
        <SummeryCard
          data={PersonalAnalytics && PersonalAnalytics?.Data}
          loading={isLoading}
          error={isError}
        />
      </div>
      {/* <div className="bg-white">
        <Charts type={'heatmap'} datas={ChartDatas} />
      </div> */}
      <SoulsTable />
    </div>
  );
}
