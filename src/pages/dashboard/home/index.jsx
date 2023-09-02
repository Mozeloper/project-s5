import React from "react";
import { TableComponent } from "../../../components/Table/table";
import PaginationFooter from "../../../components/PaginationFooter";
// import Charts from "../../../components/chart/chart";

export default function Home() {
  return <div>
    {/* <Charts /> */}
    <TableComponent />
    <PaginationFooter />
  </div>;
}
