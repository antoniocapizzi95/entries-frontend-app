import React, { useState, useEffect } from 'react';
import EntriesTable from '../components/EntriesTable';
import { Button } from '@mui/material';
import { fetchEntries } from '../services/api';

function HomePage() {
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const onDelete = (deletedEntryId) => {
    const updatedEntries = entries.filter(entry => entry.id !== deletedEntryId);
    setEntries(updatedEntries);
  };

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const result = await fetchEntries(page, limit);
        setEntries(result.data);
        setTotal(result.total);
      } catch (error) {
        console.error('Error loading entries:', error);
      }
    };

    loadEntries();
  }, [page]);

  return (
    <div>
      <h1>Entries</h1>
      <EntriesTable entries={entries} onDelete={onDelete} />
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</Button>
      <Button onClick={() => setPage(page + 1)} disabled={entries.length === total}>Next</Button>
    </div>
  );
}

export default HomePage;