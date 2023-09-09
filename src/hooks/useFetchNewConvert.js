import { useQuery } from "react-query";
import { getAllNewConvert } from "../services/souls";

export function useFetchAllNewConvert() {
    const NewConvert = useQuery([`NewConvert`], async () => await getAllNewConvert(), {
        staleTime: 360000,
    });
    return NewConvert
}