import React, { useEffect, useState } from "react";
import Charts from "../../../components/chart/chart";
import SummeryCard from "../../../components/SummeryCard/summeryCard";
import AdminTables from "../../../components/Table/admins.table";
import { getAllSoulsCount, getAllWorkersCount } from "../../../services/souls";

//Todo - 1. Add loading ui to indicate loading state 
//Todo - 2. Replace useEffect with react query for data fetching
//Todo - 3. Asking the backend guys to provide all data counts (Analytics data) in one endpoint
export default function Home() {
  const [dataCount, setDataCount] = useState([]);

  const datas = [
    {
      name: "2022",
      data: [20, 90, 50, 30, 40, 50, 70, 30, 60, 33, 52, 89],
    },
    {
      name: "2023",
      data: [10, 20, 40, 50, 70, 30, 60, 73, 60, 20, 40, 50],
    },
  ];

    useEffect(() => {
      const getcounts = async () => {
      const soulCount = await getAllSoulsCount() //This and the below function should be merged 
      //together from the backend and return as one endpoint
      const workersCount = await getAllWorkersCount()
      setDataCount([soulCount, workersCount])
    };
    getcounts();
  }, [dataCount, setDataCount]);

  const summeryTitle = ["Souls"];
  return (
    <div className="flex flex-col gap-y-6">
      <div className="">
        <SummeryCard title={'Admins'} stats={dataCount} />
      </div>
      <div className="bg-white">
        <Charts type={"area"} datas={datas} />
      </div>
      <AdminTables />
    </div>
  );
}
