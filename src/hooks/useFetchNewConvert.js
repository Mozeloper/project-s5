import { useQuery } from "react-query";
import { getAllNewConvert } from "../services/souls";

export function useFetchAllNewConvert({ pageNumber }) {
    const NewConvert = useQuery([`NewBeliever`, pageNumber], async () => await getAllNewConvert({ pageNumber }), {
        staleTime: 360000,
        enabled: !!pageNumber,
        keepPreviousData: true,
    });
    return NewConvert
}