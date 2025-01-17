import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface SearchInputsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchField: string;
  setSearchField: (field: string) => void;
}

export const SearchInputs: React.FC<SearchInputsProps> = ({
  searchTerm,
  setSearchTerm,
  searchField,
  setSearchField
}) => (
  <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
    <FormControl sx={{ width: 200 }} fullWidth>
      <InputLabel>Search By</InputLabel>
      <Select
        value={searchField}
        label="Search By"
        onChange={(e: SelectChangeEvent) => setSearchField(e.target.value)}
      >
        <MenuItem value="all">All Fields</MenuItem>
        <MenuItem value="firstName">First Name</MenuItem>
        <MenuItem value="lastName">Last Name</MenuItem>
        <MenuItem value="fullName">Full Name</MenuItem>
        <MenuItem value="email">Email</MenuItem>
        <MenuItem value="school">School</MenuItem>
      </Select>
    </FormControl>
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder={`Search ${searchField === 'all' ? 'all fields' : searchField}`}
      sx={{ flexGrow: 1 }}
    />
  </Box>
);

