import { useQuery } from 'react-query';
import { getAllNewConvert, getSoulsUnderMe } from '../services/souls';
import { getASoul } from '../services/details(id).api';

export function useFetchAllNewConvert({ pageNumber, pageSize }) {
  const NewConvert = useQuery(
    [`NewConvert`, pageNumber],
    async () => await getAllNewConvert({ pageNumber, pageSize }),
    {
      staleTime: 360000,
      enabled: !!pageNumber,
      keepPreviousData: true,
    }
  );
  return NewConvert;
}
export function useFetchAllNewConvertDynamic({
  workerId,
  isAdmin,
  pageNumber,
  pageSize,
}) {
  // console.log(`is this an admin request? ${isAdmin}`);
  if (isAdmin == true) {
    const AllNewConverts = useQuery(
      [`AllNewConverts`, pageNumber, isAdmin],
      async () => await getAllNewConvert({ pageNumber, pageSize }),
      {
        staleTime: 360000,
        enabled: !!pageNumber && !!isAdmin,
        keepPreviousData: true,
      }
    );
    return AllNewConverts;
  } else {
    const ConvertsUnderMe = useQuery(
      [`ConvertsUnderMe`, pageNumber],
      async () => await getSoulsUnderMe({ pageNumber, pageSize }),
      {
        staleTime: 360000,
        enabled: !!pageNumber,
        keepPreviousData: true,
      }
    );
    return ConvertsUnderMe;
  }
}

export function useFetchSoulsUnderMe({ pageNumber, pageSize }) {
  // console.log('singleSoul soulId', soulId);
  const ConvertsUnderMe = useQuery(
    [`ConvertsUnderMe`, pageNumber],
    async () => await getSoulsUnderMe({ pageNumber, pageSize }),
    {
      staleTime: 360000,
      enabled: !!pageNumber,
      keepPreviousData: true,
    }
  );
  return ConvertsUnderMe;
}

export function useSoulDetails({ soulId }) {
  // console.log('singleSoul soulId', soulId);
  const singleSoul = useQuery({
    queryKey: ['soul', soulId],
    queryFn: async () => await getASoul(soulId),
    staleTime: 360000,
    enabled: !!soulId, //Only run this function if soulId is available
  });
  return singleSoul;
}
