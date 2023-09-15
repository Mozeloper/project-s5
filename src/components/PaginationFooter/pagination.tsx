// import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

// const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

// export default function PaginationDataGrid() {

//   const [filterModel, setFilterModel] = React.useState({
//       items: [
//           {
//               field: 'rating',
//               operator: '>',
//               value: '2.5',
//             },
//         ],
//     });
    
//     const souls = [
//           {
//               name: 'David Walton',
//               title: 'Pastor',
//               department: 'Ministry',
//               email: 'david.walton@gmail.com',
//               role: 'Married',
//               date: '2018-02-19',
//               isActive: 1,
//               image:
//               'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//           },
//           {
//               name: 'Best chinney',
//               title: 'Worker',
//               department: 'Enginnering (I.T)',
//               email: 'lindsay.best@example.com',
//               role: 'single',
//               date: '2013-08-10',
//               isActive: 0,
//               image:
//               'https://media.springernature.com/lw703/springer-static/image/art%3A10.1038%2F528452a/MediaObjects/41586_2015_Article_BF528452a_Figg_HTML.jpg',
//           },
//           {
//               name: 'Moses Walton',
//               title: 'Worker',
//               department: 'Ushering',
//               email: 'moses.walton@info.com',
//               role: 'Married',
//               date: '2019-08-12',
//               isActive: 0,
//               image:
//               'https://www.lifewire.com/thmb/nABgUWcLKd6QW8g-0mRjYl2Vjeo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-fix-it-when-whatsapp-images-and-videos-arent-showing-in-gallery-cd3fbdebb44d4e659b7f867ac0541884.jpg',
//           },
//           {
//               name: 'Kufre Call',
//               title: 'Worker',
//               department: 'Choir',
//               email: 'kufre@example.com',
//               role: 'Single',
//               date: '2010-01-14',
//               isActive: 1,
//               image:
//               'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
//           },
//           // More souls...
//       ]

//   const { data } = useDemoData({
//     dataSet: souls,
//     visibleFields: VISIBLE_FIELDS,
//     rowLength: 100,
//   });


//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       {/* <DataGrid {...data} slots={{ toolbar: GridToolbar }} /> */}
//     <DataGrid
//         {...data}
//         slots={{
//           toolbar: GridToolbar,
//         }}
//         filterModel={filterModel}
//         onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
//       />
//     </div>
//   );
// }






// import * as React from 'react';
// import { DataGrid, GridRowId, GridPaginationModel } from '@mui/x-data-grid';
// import { createFakeServer } from '@mui/x-data-grid-generator';

// const PAGE_SIZE = 5;

// const SERVER_OPTIONS = {
//   useCursorPagination: true,
// };

// const { useQuery, ...data } = createFakeServer({}, SERVER_OPTIONS);

// export default function PaginationDataGrid() {
//   const mapPageToNextCursor = React.useRef<{ [page: number]: GridRowId }>({});

//   const [paginationModel, setPaginationModel] = React.useState({
//     page: 0,
//     pageSize: PAGE_SIZE,
//   });

//   const queryOptions = React.useMemo(
//     () => ({
//       cursor: mapPageToNextCursor.current[paginationModel.page - 1],
//       pageSize: paginationModel.pageSize,
//     }),
//     [paginationModel],
//   );
//   const { isLoading, rows, pageInfo } = useQuery(queryOptions);

//   const handlePaginationModelChange = (newPaginationModel: GridPaginationModel) => {
//     // We have the cursor, we can allow the page transition.
//     if (
//       newPaginationModel.page === 0 ||
//       mapPageToNextCursor.current[newPaginationModel.page - 1]
//     ) {
//       setPaginationModel(newPaginationModel);
//     }
//   };

//   React.useEffect(() => {
//     if (!isLoading && pageInfo?.nextCursor) {
//       // We add nextCursor when available
//       mapPageToNextCursor.current[paginationModel.page] = pageInfo?.nextCursor;
//     }
//   }, [paginationModel.page, isLoading, pageInfo?.nextCursor]);

//   // Some API clients return undefined while loading
//   // Following lines are here to prevent `rowCountState` from being undefined during the loading
//   const [rowCountState, setRowCountState] = React.useState(
//     pageInfo?.totalRowCount || 0,
//   );
//   React.useEffect(() => {
//     setRowCountState((prevRowCountState) =>
//       pageInfo?.totalRowCount !== undefined
//         ? pageInfo?.totalRowCount
//         : prevRowCountState,
//     );
//   }, [pageInfo?.totalRowCount, setRowCountState]);

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         {...data}
//         pageSizeOptions={[PAGE_SIZE]}
//         rowCount={rowCountState}
//         paginationMode="server"
//         onPaginationModelChange={handlePaginationModelChange}
//         paginationModel={paginationModel}
//         loading={isLoading}
//       />
//     </div>
//   );
// }



import * as React from 'react';
import {
  DataGridPremium,
  GridToolbarContainer,
  GridToolbarExport,
  GridColDef,
  GridRowsProp,
} from '@mui/x-data-grid-premium';

// const rows: GridRowsProp = [
//   {
//     jobTitle: 'Head of Human Resources',
//     recruitmentDate: new Date(2020, 8, 12),
//     contract: 'full time',
//     id: 0,
//   },
//   {
//     jobTitle: 'Head of Sales',
//     recruitmentDate: new Date(2017, 3, 4),
//     contract: 'full time',
//     id: 1,
//   },
//   {
//     jobTitle: 'Sales Person',
//     recruitmentDate: new Date(2020, 11, 20),
//     contract: 'full time',
//     id: 2,
//   },
//   {
//     jobTitle: 'Sales Person',
//     recruitmentDate: new Date(2020, 10, 14),
//     contract: 'part time',
//     id: 3,
//   },
//   {
//     jobTitle: 'Sales Person',
//     recruitmentDate: new Date(2017, 10, 29),
//     contract: 'part time',
//     id: 4,
//   },
//   {
//     jobTitle: 'Sales Person',
//     recruitmentDate: new Date(2020, 7, 21),
//     contract: 'full time',
//     id: 5,
//   },
//   {
//     jobTitle: 'Sales Person',
//     recruitmentDate: new Date(2020, 7, 20),
//     contract: 'intern',
//     id: 6,
//   },
//   {
//     jobTitle: 'Sales Person',
//     recruitmentDate: new Date(2019, 6, 28),
//     contract: 'full time',
//     id: 7,
//   },
//   {
//     jobTitle: 'Head of Engineering',
//     recruitmentDate: new Date(2016, 3, 14),
//     contract: 'full time',
//     id: 8,
//   },
//   {
//     jobTitle: 'Tech lead front',
//     recruitmentDate: new Date(2016, 5, 17),
//     contract: 'full time',
//     id: 9,
//   },
//   {
//     jobTitle: 'Front-end developer',
//     recruitmentDate: new Date(2019, 11, 7),
//     contract: 'full time',
//     id: 10,
//   },
//   {
//     jobTitle: 'Tech lead devops',
//     recruitmentDate: new Date(2021, 7, 1),
//     contract: 'full time',
//     id: 11,
//   },
//   {
//     jobTitle: 'Tech lead back',
//     recruitmentDate: new Date(2017, 0, 12),
//     contract: 'full time',
//     id: 12,
//   },
//   {
//     jobTitle: 'Back-end developer',
//     recruitmentDate: new Date(2019, 2, 22),
//     contract: 'intern',
//     id: 13,
//   },
//   {
//     jobTitle: 'Back-end developer',
//     recruitmentDate: new Date(2018, 4, 19),
//     contract: 'part time',
//     id: 14,
//   },
// ];

// const columns: GridColDef[] = [
//   { field: 'jobTitle', headerName: 'Job Title', width: 200 },
//   {
//     field: 'recruitmentDate',
//     headerName: 'Recruitment Date',
//     type: 'date',
//     width: 150,
//   },
//   {
//     field: 'contract',
//     headerName: 'Contract Type',
//     type: 'singleSelect',
//     valueOptions: ['full time', 'part time', 'intern'],
//     width: 150,
//   },
// ];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

interface PaginationProps {
  data: GridRowsProp;
  headers: GridColDef[];
  isLoading?: boolean;
}
export default function PaginationDataGrid({ data, headers, isLoading }: PaginationProps) {
  return (
    <div style={{ height: 320, width: '100%' }}>
      <DataGrid
        rows={data || []}
        columns={headers || []}
        slots={{
          toolbar: CustomToolbar,
        }}
        loading={isLoading}
        pagination
        autoPageSize
      />

      {/* <DataGrid
        columns={headers || []}
        rows={data || []}
        // {...data}
        // rowCount={rowCountState}
        // loading={true}
        pageSizeOptions={[2]}
        // paginationModel={paginationModel}
        paginationMode="server"        // onPaginationModelChange={setPaginationModel}
      /> */}
    </div>
  );
}