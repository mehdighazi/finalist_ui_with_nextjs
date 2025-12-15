import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
import * as module from '../api/dataHandler'
export default  function DataTable(props) {
  
  
    //get data from server via api 
  /* var resultRows =  module.getDataFromServer('http://2.186.112.117:3957','get',{})
   try {
    resultRows(async function (data, status) {
      //setResults(data)
      console.log(data)
    })
   } catch (error) {
    console.log(error)
   }*/
   
    
  return (
    <div style={{ height: 400, width: '100%' }}>
        <h1>{}</h1><DataGrid
        style={{border:"0px"}}
      slots={{ toolbar: GridToolbar }}
        rows={props.rows}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },

        }}
        onSelectionChange={(newSelection) => {
            setSelection(newSelection.rows);
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}