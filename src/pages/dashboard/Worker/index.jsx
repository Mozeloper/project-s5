import React from 'react';
import {
   useParams,
} from 'react-router-dom';
import WorkerDetails from './WorkerDetails';

export default function Worker() {
  const { workerId } = useParams();
  return (
    <div>
      <WorkerDetails workerId={workerId} />
    </div>
  );
}



