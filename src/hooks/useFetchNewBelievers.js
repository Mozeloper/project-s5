import { useQuery } from "react-query";
import {
  exportAllNewConverts,
  getAllConvertsInNewBelievers,
  getAllDTIAdminNames,
} from "../services/admins.api";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

export function useFetchNewBelievers({ pageNumber, pageSize, searchquery }) {
  const AllNewBelievers = useQuery(
    ["GetAllNewBelievers", searchquery, pageNumber],
    async () =>
      await getAllConvertsInNewBelievers({ pageNumber, pageSize, searchquery }),
    {
      staleTime: 360000,
      enabled: !!pageNumber,
      keepPreviousData: true,
    }
  );

  return AllNewBelievers;
}

export function useDTIAdminNames(nameQuery = "") {
  const dtiAdminNames = useQuery(
    ["DTIAdminNames"],
    async () => await getAllDTIAdminNames(nameQuery),
    {
      enabled: !!nameQuery, //The enabled property allows only a boolean, then wait till id is not undefined or null
      keepPreviousData: true,
    }
  );
  return dtiAdminNames;
}

// Export the new believer data
export function useExportNewBelievers({ startDate, endDate }) {
  console.log("startDate Query", startDate, "endDate Query", endDate);
  const exportBelievers = useMutation({
    mutationFn: async () => await exportAllNewConverts({ startDate, endDate }), // Your API call
    onSuccess: () => {
      toast.success(
        `Congratulations: Your data has been exported from ${startDate} to ${endDate}`
      );
    },
    onError: (error) => {
      toast.error("Oops: An error occurred. Try Again Later.", error);
    },
  });

  return exportBelievers;
}
