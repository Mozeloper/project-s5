import React from 'react';
import { useParams } from 'react-router-dom';
import ConvertDetailsByIdScreen from '../../../../components/UI/ConvertDetailsScreen';
import { useFetchPersonalAnalytics } from '../../../../hooks/useFetchAnalytics';
import { useSoulDetails } from '../../../../hooks/useFetchNewConvert';

export default function DtiConvertDetails() {
  /**
   * Get Dynamic Id from the query param
   */
  const { dtiId } = useParams();

  /**
   * Hook for fetching COnvert's Details
   * @param {number} dtiId
   */
  const {
    data: soulInfo,
    isError,
    isLoading,
  } = useSoulDetails({ soulId: dtiId });

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
