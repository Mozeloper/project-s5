import React from 'react'
import Chart from "react-apexcharts";

export default function Charts() {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    legend: {
      show: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 2,
      },
    },
    colors: ["#0d6efd", "#009efb", "#6771dc"],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "60%",
              borderRadius: 7,
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "2022",
      data: [20, 40, 50, 30, 40, 50, 30, 30, 60],
    },
    {
      name: "2023",
      data: [10, 20, 40, 60, 20, 40, 50, 60, 20],
    },
  ];
  return (
    <Charts options={options} series={series} type="area" height="279" />
  )
}