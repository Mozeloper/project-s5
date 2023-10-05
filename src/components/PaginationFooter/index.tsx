import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const items = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
  },
];





import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationProps {
  pageNumber: number;
  totalPageCount: number;
  totalPerCount: number;
  totalCount: number;
  handlePaginationChange: () => void
}
export default function PaginationFooter({pageNumber, totalPerCount, totalCount, handlePaginationChange}: PaginationProps) {
  // const [page, setPage] = React.useState<number>(pageNumber || 1);
  // const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  // };

  return (
    <div className="pb-4">
      <Stack spacing={2}>
        {/* <Typography>pageNumber: {pageNumber}</Typography> */}
        <div className="flex justify-center sm:justify-between items-center w-full">
            <p className="text-sm text-gray-700 sm:block hidden">
              Showing 
              {/* <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "} */}
              <span className="font-medium"> {" "} {totalCount && totalCount}</span> results
            </p>
            <Pagination 
              count={totalPerCount && +totalPerCount}
              variant="outlined"
              shape="rounded"
              page={pageNumber}
              onChange={handlePaginationChange}
            />
          </div>
      </Stack>
    </div>
  );
}
