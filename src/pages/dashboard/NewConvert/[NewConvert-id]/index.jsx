import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsByIdScreen from '../../../../components/UI/Details Screen/DetailsByIdScreen';
import { useSoulDetails } from '../../../../hooks/useFetchNewConvert';
import { useFetchPersonalAnalytics } from '../../../../hooks/useFetchAnalytics';


export default function NewConvertDetails() {
  const { soulId } = useParams();
  const { data: soulInfo, isError, isLoading } = useSoulDetails({ soulId })
  const { data: personalAnalyticsDatas } = useFetchPersonalAnalytics({ AnalyticsId: soulId})

  return (
    <div>
      <DetailsByIdScreen personalAnalyticsDatas={personalAnalyticsDatas && personalAnalyticsDatas?.data} data={!isLoading && soulInfo} loading={isLoading} notFound={!soulInfo && isError} />
    </div>
  );
}



