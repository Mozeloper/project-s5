import { useQuery } from "react-query";
import { getAllNewConvert } from "../services/souls";
import { getASoulAdmin } from "../services/details(id).api";

export function useFetchAllNewConvert({ pageNumber }) {
    const NewConvert = useQuery([`NewBeliever`, pageNumber], async () => await getAllNewConvert({ pageNumber }), {
        staleTime: 360000,
        enabled: !!pageNumber,
        keepPreviousData: true,
    });
    return NewConvert
}

export function useSoulDetails({ soulId }) {
    // console.log('singleSoul soulId', soulId);
    const singleSoul = useQuery({
        queryKey: ['soul', soulId],
        queryFn: async () => await getASoulAdmin(soulId),
        staleTime: 360000,
        enabled: !!soulId, //Only run this function if soulId is available
    })
    return singleSoul;
}