import React, { useState, useCallback } from 'react';
import { Box, Button, Dialog, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import StandardButton from '../buttons/StandardButton';
import JoinedEventDialog from './JoinedEventDialog';
import { useQuery } from '@tanstack/react-query';
import { useGetAllStudent } from '../../../services/student/useGetAllStudents';
import { useSearch } from './useSearch';
import { SearchInputs } from './SearchInput';
import { useGetEventsStudentsJoined } from '../../../services/events/useGetEventsStudentJoined';
import StudentJoinedEventDialog from './StudentJoinedEventDialog';

const PAGINATION_MODEL = { page: 0, pageSize: 20 };
const DATA_GRID_SX = { 
  border: 0,
  '& .headerColours': {
    backgroundColor: '#285DE5',
    color: 'white',
    fontSize: 16,
  }  
};

interface StudentTableProps {
    allStudents;
}

const StudentTable: React.FC<StudentTableProps> = ({ allStudents }) => {
  
  const [studentJoinedEventDialogOpen, setStudentJoinedEventDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleViewStudentJoinedEventDialog = useCallback((id: string) => {
    setSelectedUserId(id);
    setStudentJoinedEventDialogOpen(true);
  }, []);

  const handleCloseDialog = () => {
    setStudentJoinedEventDialogOpen(false);
    setSelectedUserId(null);
  };

    const { searchTerm, setSearchTerm, searchField, setSearchField, filteredRows } = useSearch(allStudents);

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First name', headerClassName: 'headerColours', width: 210 },
    { field: 'lastName', headerName: 'Last name', headerClassName: 'headerColours', width: 210 },
    { field: 'email', headerName: 'Email', headerClassName: 'headerColours', width: 315 },
    { field: 'school', headerName: 'School', headerClassName: 'headerColours', width: 315 },
    { 
      field: 'view', 
      headerName: 'Joined Events', 
      headerClassName: 'headerColours',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Button
                variant="contained"
                color="primary"
                onClick={() => handleViewStudentJoinedEventDialog(params.row.id)}
              >
                View
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <SearchInputs
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchField={searchField}
        setSearchField={setSearchField}
      />
      <Paper sx={{ height: 800, width: '1200px'}}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{ pagination: { paginationModel: PAGINATION_MODEL } }}
          sx={DATA_GRID_SX}
        />
      </Paper>
      <Dialog open={studentJoinedEventDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="lg">
        <StudentJoinedEventDialog onClose={handleCloseDialog} studentId={selectedUserId!} /> 
        </Dialog>
    </Box>
  );
};

export default StudentTable;


