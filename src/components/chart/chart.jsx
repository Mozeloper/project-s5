import React from 'react'
import Chart from "react-apexcharts";

//Note when working with this component, you can pass (type and data) 
//if no type is specified then it will render the default which is 'bar'
//if no datas is provided then it will render the default which is 'series'
//The datas should be the array of object/data you want to use
export default function Charts({type, datas}) {
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
        "Oct",
        "Nov",
        "Dec"
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
      data: [20, 40, 50, 30, 40, 50, 70, 30, 60],
    },
    {
      name: "2023",
      data: [10, 20, 40, 60, 20, 40, 50, 60, 20],
    },
  ];
  return (
    <Chart options={options} series={datas ?? series} type={type ?? 'bar'} height="279" />
  )
}