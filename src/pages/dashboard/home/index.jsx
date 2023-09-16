import React, { useEffect, useState } from "react";
import Charts from "../../../components/chart/chart";
import SummeryCard from "../../../components/SummeryCard/summeryCard";
import AdminTables from "../../../components/Table/admins.table";
import { useFetchSoulsCount, useFetchWorkersCount } from "../../../hooks/useFetchAnalytics";
import { userFullName } from '../../../utils/index'
import { MdNotificationsActive } from "react-icons/md";
import { Link } from "react-router-dom";
import './vibration.css'
//Todo - 1. Add loading ui to indicate loading state 
//Todo - 2. Replace useEffect with react query for data fetching
//Todo - 3. Asking the backend guys to provide all data counts (Analytics data) in one endpoint
export default function Home() {
  const [dataCount, setDataCount] = useState([]);
    const { data: WorkersCountData } = useFetchWorkersCount()
    const { data: SoulsCountData, isError, isLoading } = useFetchSoulsCount()
    const fullName = userFullName();

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
      const soulCount = await SoulsCountData 
      const workersCount = await WorkersCountData
      setDataCount([soulCount, workersCount])
    };
    getcounts();
  }, [SoulsCountData, WorkersCountData]);


  return (
    <div className="flex flex-col gap-y-6">
      <div className="rounded-md bg-white py-12 px-5 md:px-6 md:flex md:justify-between gap-5">
        <div>
          <h2 className="font-bold text-3xl">Welcome back, {fullName}!</h2>
          <small className="text-gray-500">You have 0 pending notifications</small>
          </div>
          <Link to="/reminder" className="bg-primary h-11 text-white py-3 px-5 rounded-full flex justify-center max-w-[145px] mt-5 md:mt-0">
            <MdNotificationsActive className="w-[18px] h-[18px] mr-2 vibrate-icon" /> 
            <small>Notifications</small>
          </Link>
      </div>
      <div className="">
        <SummeryCard title={'Admins'} stats={dataCount} />
      </div>
      <div className="bg-white rounded-md">
        <Charts type={"area"} datas={datas} />
      </div>
      {/* 
      The tableDataLimit is not fully implemented yet
      Todo - Renders all the table datas on the admins page dashboard and
      */}
      <AdminTables tableDataLimit={11} />
    </div>
  );
}
