import React, { useState, useEffect } from "react";
import PageTitle from "../../../components/PageTitle";
import SummeryCard from "../../../components/SummeryCard/summeryCard";
import Charts from "../../../components/chart/chart";
import MinstryTable from "../../../components/Table/ministry.table";
import { useFetchMinistryDashboardAnalytics } from "../../../hooks/useFetchAnalytics";


//Todo - 1. Add loading ui to indicate loading state 
//Todo - 2. Replace useEffect with react query for data fetching
//Todo - 3. Fetch the appropriate data for Ministry(Admin)
export default function Ministry() {
  const { data: MinistryDashboardAnalytics, isError, isLoading } = useFetchMinistryDashboardAnalytics()
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

  return (
    <div className="flex flex-col gap-y-6">
      <PageTitle title="Souls in Ministry" />
      <div className="">
        <SummeryCard data={MinistryDashboardAnalytics && MinistryDashboardAnalytics?.Data} loading={isLoading} error={isError} />
      </div>
      <div className="bg-white">
        <Charts type={"scatter"} datas={ChartDatas} />
      </div>
      <MinstryTable />
    </div>
  );
}