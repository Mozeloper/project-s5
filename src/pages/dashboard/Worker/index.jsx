import React from 'react';
import { useParams } from 'react-router-dom';
import WorkerDetails from '../../../components/UI/Details Screen/WorkerDetails';
import { useWorkerDetails } from '../../../hooks/useWorkers';

export default function Worker() {
  const { workerId } = useParams();
  const { data: workerInfo, isError, isLoading } = useWorkerDetails({ workerId })

  return (
    <div>
      <WorkerDetails data={!isLoading && workerInfo} loading={isLoading} notFound={!workerInfo && isError} />
    </div>
  );
}



