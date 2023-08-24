import React from "react";
import { SoulsTable } from "../../../components/Table/souls.table";
import Charts from "../../../components/chart/chart";
import SummeryCard from "../../../components/SummeryCard/summeryCard";

export default function Home() {
    const summeryTitle = ['Souls']
  return <div>
    <div className="">
      <SummeryCard title={summeryTitle[0]} />
    </div>
    <div className="bg-white">
      <Charts />
    </div>
    <SoulsTable />
  </div>;
}
