import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsByIdScreen from '../../../../components/UI/Details Screen/DetailsByIdScreen';
import { useFetchUnapprovedWorkerDetails } from '../../../../hooks/useFetchUnapproved';
import { useFetchPersonalAnalytics } from '../../../../hooks/useFetchAnalytics';


export default function UnapprovedWorker() {
  const { workerId } = useParams();
  const {
    data: workerInfo,
    isError,
    isLoading,
  } = useFetchUnapprovedWorkerDetails({ workerId });
  const { data: personalAnalyticsDatas } = useFetchPersonalAnalytics({ AnalyticsId: workerId})

  return (
    <div>
      <DetailsByIdScreen personalAnalyticsDatas={personalAnalyticsDatas && personalAnalyticsDatas?.data} data={!isLoading && workerInfo} loading={isLoading} notFound={!workerInfo && isError} />
    </div>
  );
}

