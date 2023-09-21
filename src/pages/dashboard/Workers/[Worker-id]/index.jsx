import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsByIdScreen from '../../../../components/UI/Details Screen/DetailsByIdScreen';
import { useWorkerDetails } from '../../../../hooks/useWorkers';
import { useFetchPersonalAnalytics } from '../../../../hooks/useFetchAnalytics';


export default function Worker() {
  const { workerId } = useParams();
  const { data: workerInfo, isError, isLoading } = useWorkerDetails({ workerId })
  const { data: personalAnalyticsDatas } = useFetchPersonalAnalytics({ AnalyticsId: workerId})

  return (
    <div>
      <DetailsByIdScreen personalAnalyticsDatas={personalAnalyticsDatas && personalAnalyticsDatas?.Data} data={!isLoading && workerInfo} loading={isLoading} notFound={!workerInfo && isError} />
    </div>
  );
}

