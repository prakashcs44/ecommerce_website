import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  
  
  {
    field: 'amount',
    headerName: 'amount',
    type: 'number',
    width: 110,
    editable: false,
  },
  {
    field: 'status',
    headerName: 'status',
    width: 110,
    editable: false,
  },
  {
    field:"items_qty",
    headerName:"items_qty",
    width:110,
    editable:false,
  }
  
];


const rows = orders?.map((order)=>{
    return {
        id:order?._id,
        status:order?.orderStatus,
        items_qty:order?.orderItems.length,
        amount:order?.totalPrice
    }
})



export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
