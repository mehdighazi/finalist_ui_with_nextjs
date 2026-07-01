/* eslint-disable no-console */
// material-ui
import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
// project imports
import MainCard from '@/components/ui-component/cards/MainCard';
import Table from '@/components/ui-component/Table.js'
import Button from '@mui/material/Button';

// ==============================|| SAMPLE PAGE ||============================== //
const columns= [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'نام', width: 130 },
    { field: 'lastName', headerName: 'خانوادگی', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    /*  valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,*/
    },
    {
      headerClassName: 'header',
      headerAlign: 'center',
      field: "action",
      headerName: "عملیات",
      sortable: false,
      renderCell: (params) => {
        const onClick = () => {
        
          const fields = params.api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== "__check__" && !!c);
          const thisRow={};
      
          fields.forEach((f) => {
           
            thisRow[f]=params.row.id;
           // thisRow[f] = params.getValue(params.id, f);
          });
      
        
          return '/user/detail/'+thisRow['id'];
        };
        const backLink=onClick();
       
        return <Button href={backLink} ><span style={{color:"rgb(0, 153, 255)"}}>ویرایش</span> </Button>;
      }
    }
  ];
  
  const rows = [
    { id: 1, lastName: 'حسنی', firstName: 'فرزاد', age: 35 },
    { id: 2, lastName: 'لنیستر', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
const SamplePage = () => (<>
    <MainCard title="Sample Card">
        <Table rows={rows} columns={columns}/>
    </MainCard>
    </>
);

export default SamplePage;
