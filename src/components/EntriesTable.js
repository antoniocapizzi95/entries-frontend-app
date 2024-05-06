import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchEntryById, deleteEntry } from '../services/api';

function EntriesTable({ entries, onDelete }) {
  const [open, setOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (entry) => {
    fetchEntryById(entry.id)
      .then(data => {
        setSelectedEntry(data);
        setOpen(true);
      })
      .catch(error => console.error('Error fetching entry details:', error));
  };

  const handleClose = () => setOpen(false);

  const handleDelete = (entryId) => {
    deleteEntry(entryId)
      .then(() => {
        onDelete(entryId);
        console.log('Entry deleted successfully');
      })
      .catch(error => console.error('Error deleting entry:', error));
  };

  const handleEdit = (entryId) => {
    navigate(`/edit-entry/${entryId}`);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Hostname</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.id}</TableCell>
                <TableCell>{entry.application_hostname}</TableCell>
                <TableCell>{entry.timestamp}</TableCell>
                <TableCell>{entry.type}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleOpen(entry)}>
                    Details
                  </Button>
                  <Button onClick={() => handleEdit(entry.id)}>
                    Edit
                  </Button>
                  <Button color="secondary" onClick={() => handleDelete(entry.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="entry-details-title"
        aria-describedby="entry-details-description"
      >
        <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20 }}>
          <h2 id="entry-details-title">{selectedEntry?.applicationHostname}</h2>
          <p id="entry-details-description">User: {selectedEntry?.user}</p>
          <p>Country: {selectedEntry?.country}</p>
          <p>IP: {selectedEntry?.ip}</p>
          <p>Device: {selectedEntry?.device}</p>
          <p>Tags: {selectedEntry?.tags?.map(tag => `${tag.title} - ${tag.description}`).join(', ')}</p>
          <p>Is Dangerous: {selectedEntry?.isDangerous ? 'Yes' : 'No'}</p>
        </Box>
      </Modal>
    </>
  );
}

export default EntriesTable;