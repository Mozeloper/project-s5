
//Todo - use React Query to fetch datas
//Todo - 1. Build hook for all my api calls
//Todo - 2. add React Query to the root/app.js so it children can be accessible through the entire app
//Todo - 3. when building also make provision for pagination

import { useQuery } from "react-query"
import { getAWorkerAdmin, getAllWorkersAdmins } from "../services/admins.api";
import { api } from '../services/api'
import { appUrls } from "../services/urls";

export function useWorkersAdmins({ pageNumber }) {
    const admins = useQuery([`workers page `, pageNumber], async () => await getAllWorkersAdmins({ pageNumber }), {
        staleTime: 360000,
        enabled: !!pageNumber,  //The enabled property allows only a boolean, then wait till id is not undefined or null
        keepPreviousData: true
    });
    return admins
}



export async function useWorkerDetails({ workerId }) {
    // console.log('singleWorker workerId', workerId);
    const singleWorker = useQuery({
        queryKey: ['worker', workerId],
        queryFn: async () => {
            const data = await getAWorkerAdmin(workerId)
            return data
        },
        staleTime: 360000,
        enabled: !!workerId, //Only run this function if workerId is available
    })

    // console.log('singleWorker', singleWorker.data);
    return singleWorker;
}