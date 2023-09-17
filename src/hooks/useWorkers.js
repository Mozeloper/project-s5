import { useQuery } from "react-query"
import { getAllWorkersAdmins } from "../services/admins.api";
import { getAWorkerAdmin } from "../services/details(id).api";

export function useWorkersAdmins({ pageNumber }) {
    const admins = useQuery([`workers page `, pageNumber], async () => await getAllWorkersAdmins({ pageNumber }), {
        staleTime: 360000,
        enabled: !!pageNumber,  //The enabled property allows only a boolean, then wait till id is not undefined or null
        keepPreviousData: true
    });
    return admins
}

export function useWorkerDetails({ workerId }) {
    // console.log('singleWorker workerId', workerId);
    const singleWorker = useQuery({
        queryKey: ['worker', workerId],
        queryFn: async () => await getAWorkerAdmin(workerId),
        staleTime: 360000,
        enabled: !!workerId, //Only run this function if workerId is available
    })
    return singleWorker;
}