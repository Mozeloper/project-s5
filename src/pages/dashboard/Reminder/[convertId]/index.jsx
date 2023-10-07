import React from 'react';
import { useParams } from 'react-router-dom';
import ConvertDetailsByIdScreen from '../../../../components/UI/ConvertDetailsScreen';
import { useFetchDeactivatedConvertDetails } from '../../../../hooks/useFetchConverts';
export default function GetDeactivatedConvertDetails() {

  /**
   * Get the dynamic Id for query params
   */
  const { convertId } = useParams();

  /**
   * Hook for fetching Details of Deactivated Convert
   * @param {number} convertId
   */
  const {
    data: workerInfo,
    isError,
    isLoading,
  } = useFetchDeactivatedConvertDetails({ convertId });

  return (
    <div>
      <ConvertDetailsByIdScreen
        isDeactivated="true"
        data={!isLoading && workerInfo}
        loading={isLoading}
        notFound={!workerInfo && isError}
      />
    </div>
  );
}
