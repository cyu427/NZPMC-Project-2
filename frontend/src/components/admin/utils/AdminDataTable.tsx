import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

interface DataTableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  height: number;
  width: number;
}

const paginationModel = { page: 0, pageSize: 10 };

export default function AdminDataTable({columns, rows, height, width}: DataTableProps) {
  return (
    <Paper sx={{ height, width }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[ 10 ]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}