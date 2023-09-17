import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsByIdScreen from '../../../../components/UI/Details Screen/DetailsByIdScreen';
import { useAdminDetails } from '../../../../hooks/useFetchAdmins';



export default function AdminDetails() {
  const { adminId } = useParams();
  const { data: adminInfo, isError, isLoading } = useAdminDetails({ adminId })

  return (
    <div>
      <DetailsByIdScreen data={!isLoading && adminInfo} loading={isLoading} notFound={!adminInfo && isError} />
    </div>
  );
}



