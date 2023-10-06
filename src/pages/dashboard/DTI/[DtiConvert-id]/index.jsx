import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsByIdScreen from '../../../../components/UI/Details Screen/DetailsByIdScreen';
import { useSoulDetails } from '../../../../hooks/useFetchNewConvert';
import { useFetchPersonalAnalytics } from '../../../../hooks/useFetchAnalytics';


export default function DtiConvertDetails() {
  const { dtiId } = useParams();
  const { data: soulInfo, isError, isLoading } = useSoulDetails({ soulId: dtiId });
  const { data: personalAnalyticsDatas } = useFetchPersonalAnalytics({
    AnalyticsId: dtiId,
  });

  return (
    <div>
      <DetailsByIdScreen personalAnalyticsDatas={personalAnalyticsDatas && personalAnalyticsDatas?.Data} data={!isLoading && soulInfo} loading={isLoading} notFound={!soulInfo && isError} />
    </div>
  );
}



