import { useQuery } from 'react-query';
import { getAllNewConvert, getSoulsUnderMe } from '../services/souls';
import { getASoul } from '../services/details(id).api';
import { suspendAConvert } from '../services/admins.api';

export function useFetchAllNewConvert({ pageNumber, pageSize, searchquery }) {
  const NewConvert = useQuery(
    [`NewConvert`, searchquery, pageNumber],
    async () => await getAllNewConvert({ pageNumber, pageSize, searchquery }),
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
  searchquery,
}) {
  // console.log(`is this an admin request? ${isAdmin}`);
  if (isAdmin == true) {
    const AllNewConverts = useQuery(
      [`AllNewConverts`, searchquery, pageNumber, isAdmin],
      async () => await getAllNewConvert({ pageNumber, pageSize, searchquery }),
      {
        staleTime: 360000,
        enabled: !!pageNumber && !!isAdmin,
        keepPreviousData: true,
      }
    );
    return AllNewConverts;
  } else {
    const ConvertsUnderMe = useQuery(
      ['ConvertsUnderMe', pageNumber],
      async () => await getSoulsUnderMe({ pageNumber, pageSize, searchquery }),
      {
        staleTime: 360000,
        enabled: !!pageNumber,
        keepPreviousData: true,
      }
    );
    return ConvertsUnderMe;
  }
}

export function useFetchSoulsUnderMe({ pageNumber, pageSize, searchquery }) {
  // console.log('singleSoul soulId', soulId);
  const ConvertsUnderMe = useQuery(
    ['ConvertsUnderMe', searchquery, pageNumber],
    async () => await getSoulsUnderMe({ pageNumber, pageSize, searchquery }),
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


// Susped A Convert at any stage
export function useSuspendAConvert({ convertId, reason }) {
  const SuspendedConvert = useQuery(
    [`SuspendAConvert`],
    async () => await suspendAConvert(convertId, reason)
  );
  //   console.log(SuspendDtiConvert)
  return SuspendedConvert;
}