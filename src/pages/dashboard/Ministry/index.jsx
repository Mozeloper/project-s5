import React, { useState, useEffect } from "react";
import SummeryCard from "../../../components/SummeryCard/summeryCard";
import Charts from "../../../components/chart/chart";
import { getAllAdmins } from "../../../services/admins.api";
import WorkersTable from "../../../components/Table/worker.table";


//Todo - 1. Add loading ui to indicate loading state 
//Todo - 2. Replace useEffect with react query for data fetching
//Todo - 3. Fetch the appropriate data for Ministry(Admin)
export default function Ministry() {
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

  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);


  useEffect(() => {
    const getPosts = async () => {
      const admins = await getAllAdmins()
      setData(admins.Data);
      //Object.keys returns the property names of/in an object as string of arrays
      setHeaders(Object.keys(admins.Data[0]));
      console.log('data', admins.Data);
    };
    getPosts();
  }, []);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="">
        <SummeryCard  />
      </div>
      <div className="bg-white">
        <Charts type={"scatter"} datas={datas} />
      </div>
      <WorkersTable />
    </div>
  );
}