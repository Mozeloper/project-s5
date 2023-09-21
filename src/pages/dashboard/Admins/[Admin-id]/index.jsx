import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsByIdScreen from '../../../../components/UI/Details Screen/DetailsByIdScreen';
import { useAdminDetails } from '../../../../hooks/useFetchAdmins';
import { useFetchPersonalAnalytics } from '../../../../hooks/useFetchAnalytics';



export default function AdminDetails() {
  const { adminId } = useParams();
  const { data: adminInfo, isError, isLoading } = useAdminDetails({ adminId })
  const { data: personalAnalyticsDatas } = useFetchPersonalAnalytics({ AnalyticsId: adminId})

  return (
    <div>
      <DetailsByIdScreen personalAnalyticsDatas={personalAnalyticsDatas && personalAnalyticsDatas?.Data} data={!isLoading && adminInfo} loading={isLoading} notFound={!adminInfo && isError} />
    </div>
  );
}



