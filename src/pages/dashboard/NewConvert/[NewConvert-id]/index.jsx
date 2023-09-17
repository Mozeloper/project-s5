import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsByIdScreen from '../../../../components/UI/Details Screen/DetailsByIdScreen';
import { useSoulDetails } from '../../../../hooks/useFetchNewConvert';


export default function NewConvertDetails() {
  const { soulId } = useParams();
  const { data: soulInfo, isError, isLoading } = useSoulDetails({ soulId })

  return (
    <div>
      <DetailsByIdScreen data={!isLoading && soulInfo} loading={isLoading} notFound={!soulInfo && isError} />
    </div>
  );
}



