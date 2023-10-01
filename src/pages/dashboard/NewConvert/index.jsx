import React from 'react'
import PageTitle from '../../../components/PageTitle'
import SummeryCard from '../../../components/SummeryCard/summeryCard'
import NewBelieversTable from '../../../components/Table/newbelievers.table'
import { useFetchNewConvertDashboardAnalytics } from '../../../hooks/useFetchAnalytics'

//Todo - 1. Add loading ui to indicate loading state
//Todo - 2. Replace useEffect with react query for data fetching
//Todo - 3. Ensure that the "get-all-new-converts" endpoint is now working and not returning 500 then uncomment the code in the SoulsTable
export default function NewConvert() {
  const {
    data: NewConvertDashboardAnalytics,
    isError,
    isLoading,
  } = useFetchNewConvertDashboardAnalytics();


  return (
    <div className="flex flex-col gap-y-6">
      <PageTitle title="New Believers Stage" />
      <div className="">
        <SummeryCard
          data={
            NewConvertDashboardAnalytics && NewConvertDashboardAnalytics?.Data
          }
          loading={isLoading}
          error={isError}
        />
      </div>
      {/* <div className="bg-white">
        <Charts type={'heatmap'} datas={ChartDatas} />
      </div> */}
      <NewBelieversTable />
    </div>
  );
}
