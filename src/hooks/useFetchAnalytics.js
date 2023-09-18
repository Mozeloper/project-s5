import { useQuery } from "react-query"
import { getAllAdminDashboardAnalytics, getAllDtiDashboardAnalytics, getAllMinistryDashboardAnalytics, getAllNewConvertDashboardAnalytics, getAllSoulsCount, getAllWorkersCount, getPersonalAnalytics } from "../services/analytics.api";

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

export function useFetchAdminDashboardAnalytics() {
    const AdminsAnalytics = useQuery([`AdminsCountAnalytics`], async () => await getAllAdminDashboardAnalytics(), {
        staleTime: 360000,
    });
    return AdminsAnalytics
}

export function useFetchNewConvertDashboardAnalytics({ workerId }) {
  const newConvertAnalytics = useQuery(
    [`NewConvertCountAnalytics`],
    async () => await getPersonalAnalytics(workerId),
    {
      staleTime: 360000,
    }
  );
  return newConvertAnalytics;
}

export function useFetchDtiDashboardAnalytics() {
    const DtiAnalytics = useQuery([`DtiCountAnalytics`], async () => await getAllDtiDashboardAnalytics(), {
        staleTime: 360000,
    });
    return DtiAnalytics
}

export function useFetchMinistryDashboardAnalytics() {
    const MinistryAnalytics = useQuery([`MinistryCountAnalytics`], async () => await getAllMinistryDashboardAnalytics(), {
        staleTime: 360000,
    });
    return MinistryAnalytics
}

export function useFetchPersonalAnalytics({ AnalyticsId }) {
    const singleAnalytics = useQuery({
        queryKey: ['Analytics', AnalyticsId],
        queryFn: async () => await getPersonalAnalytics(AnalyticsId),
        staleTime: 360000,
        enabled: !!AnalyticsId, //Only run this function if Id is available
    })
    return singleAnalytics;
}