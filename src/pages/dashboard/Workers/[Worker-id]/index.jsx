import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsByIdScreen from '../../../../components/UI/Details Screen/DetailsByIdScreen';
import { useWorkerDetails } from '../../../../hooks/useWorkers';


export default function Worker() {
  const { workerId } = useParams();
  const { data: workerInfo, isError, isLoading } = useWorkerDetails({ workerId })

  return (
    <div>
      <DetailsByIdScreen data={!isLoading && workerInfo} loading={isLoading} notFound={!workerInfo && isError} />
    </div>
  );
}

