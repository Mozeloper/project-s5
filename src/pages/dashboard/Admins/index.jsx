import React from "react";
import Charts from "../../../components/chart/chart";
import SummeryCard from "../../../components/SummeryCard/summeryCard";
import AdminTables from "../../../components/Table/admins.table";
import { useFetchAdminDashboardAnalytics } from "../../../hooks/useFetchAnalytics";

export default function Admins() {
  const { data: AdminDashboardAnalytics, isError, isLoading } = useFetchAdminDashboardAnalytics()

  const ChartDatas = [
    {
      name: "2022",
      data: [20, 90, 50, 30, 40, 50, 70, 30, 60, 33, 52, 89],
    },
    {
      name: "2023",
      data: [10, 20, 40, 50, 70, 30, 60, 73, 60, 20, 40, 50],
    },
  ];

  //   useEffect(() => {
  //     const getcounts = async () => {
  //     const soulCount = await SoulsCountData 
  //     const workersCount = await WorkersCountData
  //     setDataCount([soulCount, workersCount])
  //   };
  //   getcounts();
  // }, [SoulsCountData, WorkersCountData]);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="">
        <SummeryCard data={AdminDashboardAnalytics && AdminDashboardAnalytics?.data} loading={isLoading} error={isError} />
      </div>
      <div className="bg-white">
        <Charts type={"area"} datas={ChartDatas} />
      </div>
      {/* 
      The tableDataLimit is not fully implemented yet
      Todo - Only render max of 5 table data on the landing page dashboard and
      Todo - A button to navigate to admins page to view all dashboard datas 
      */}
      <AdminTables tableDataLimit={5} />
    </div>
  );
}

