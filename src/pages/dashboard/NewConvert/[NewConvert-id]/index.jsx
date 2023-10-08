import React from 'react'
import { useParams } from 'react-router-dom'
import ConvertDetailsByIdScreen from '../../../../components/UI/ConvertDetailsScreen'
import { useSoulDetails } from '../../../../hooks/useFetchNewConvert'

export default function NewConvertDetails() {
  const { soulId } = useParams();
  const { data: soulInfo, isError, isLoading } = useSoulDetails({ soulId })


  return (
    <div>
      <ConvertDetailsByIdScreen
        data={!isLoading && soulInfo}
        loading={isLoading}
        notFound={!soulInfo && isError}
      />
    </div>
  );
}



