import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsByIdScreen from '../../../../components/UI/Details Screen/DetailsByIdScreen';
import { useDeactivatedWorkerDetails } from '../../../../hooks/useWorkers';
import { useFetchPersonalAnalytics } from '../../../../hooks/useFetchAnalytics';
import DeactivatedWorkerByIdDetailsScreen from '../../../../components/UI/DeactivatedWorkerByIdDetailsScreen/DeactivatedWorkerByIdDetailsScreen';

export default function Worker() {
  const { workerId } = useParams();
  const {
    data: workerInfo,
    isError,
    isLoading,
  } = useDeactivatedWorkerDetails({ workerId });
  const { data: personalAnalyticsDatas } = useFetchPersonalAnalytics({ AnalyticsId: workerId})

  return (
    <div>
      <DeactivatedWorkerByIdDetailsScreen
        personalAnalyticsDatas={
          personalAnalyticsDatas && personalAnalyticsDatas?.Data
        }
        data={!isLoading && workerInfo}
        loading={isLoading}
        notFound={!workerInfo && isError}
      />
    </div>
  );
}

