import { useState, useMemo } from 'react';

interface Row {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    school: string;
}

export const useSearch = (initialRows: Row[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState<string>('all');

  const filteredRows = useMemo(() => {
    if (!searchTerm) return initialRows;

    const searchTermLower = searchTerm.toLowerCase();
    return initialRows.filter(row => {
      const fullName = `${row.firstName || ''} ${row.lastName || ''}`.toLowerCase();
      const reverseFullName = `${row.lastName || ''} ${row.firstName || ''}`.toLowerCase();
    
      switch (searchField) {
        case 'firstName':
          return row.firstName?.toLowerCase().includes(searchTermLower);
        case 'lastName':
          return row.lastName?.toLowerCase().includes(searchTermLower);
        case 'fullName':
          return fullName.includes(searchTermLower) || reverseFullName.includes(searchTermLower);
        case 'email':
          return row.email?.toLowerCase().includes(searchTermLower);
        case 'school':
          return row.school?.toLowerCase().includes(searchTermLower);
        case 'all':
        default:
          return (
            row.firstName?.toLowerCase().includes(searchTermLower) ||
            row.lastName?.toLowerCase().includes(searchTermLower) ||
            fullName.includes(searchTermLower) ||
            reverseFullName.includes(searchTermLower) ||
            row.email?.toLowerCase().includes(searchTermLower) ||
            row.school?.toLowerCase().includes(searchTermLower)
          );
      }
    });
  }, [initialRows, searchTerm, searchField]);

  return { searchTerm, setSearchTerm, searchField, setSearchField, filteredRows };
};

