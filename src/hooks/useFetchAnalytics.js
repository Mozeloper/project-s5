import { useQuery } from "react-query"
import { getAllSoulsCount, getAllWorkersCount } from "../services/analytics.api";

export function useFetchWorkersCount() {
    const workersCount = useQuery([`workersCount`], async () => await getAllWorkersCount(), {
        staleTime: 360000,
    });
    return workersCount
}

export function useFetchSoulsCount() {
    const soulsCount = useQuery([`soulsCount`], async () => await getAllSoulsCount(), {
        staleTime: 360000,
    });
    return soulsCount
}