import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WorkerDetails from '../../../components/UI/Details Screen/WorkerDetails';
import { useWorkerDetails } from '../../../hooks/useWorkers';

export default function Worker() {
  const { workerId } = useParams();
    const [data, setData] = useState({});

  // const { data: SoulsCountData, isLoading } = useWorkerDetails({ workerId })
const { data: SoulsCountData, isError, isLoading } = useWorkerDetails({ workerId })
    useEffect(() => {
      const getPosts = async () => {
      const admins = await SoulsCountData
      console.log('admins ', admins);
      
      setData(admins);
      // setHeaders(Object.keys(await admins?.[0]));
    };
    getPosts();
  }, [data]);
  
  console.log('SoulsCountData ', SoulsCountData);

  return (
    <div>
      <WorkerDetails data={data} />
    </div>
  );
}



