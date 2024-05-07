import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormGroup, FormControlLabel, FormControl, InputLabel, Select, MenuItem, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { updateEntry, createEntry } from '../services/api';

function EntryForm({ initialData }) {
  const [entry, setEntry] = useState({
    ...initialData,
    tags: initialData?.tags || []
  });
  const [newTagTitle, setNewTagTitle] = useState('');
  const [newTagDescription, setNewTagDescription] = useState('');
  const [newTagColor, setNewTagColor] = useState('#000000')
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (initialData) {
        await updateEntry(initialData.id, entry);
        alert('Entry updated!');
      } else {
        await createEntry(entry);
        alert('Entry created!');
      }
      // Return to homepage
      navigate('/');
    } catch (err) {
      alert('Error updating entry');
      console.error(err);
    }
  };

  const handleChange = (prop) => (event) => {
    const value = prop === 'isDangerous' ? event.target.checked : event.target.value;
    setEntry({ ...entry, [prop]: value });
  };

  const handleAddTag = () => {
    if (newTagTitle && !entry.tags.find(tag => tag.title === newTagTitle)) {
      const updatedTags = [...entry.tags, { title: newTagTitle, description: newTagDescription, color: newTagColor }];
      setEntry({ ...entry, tags: updatedTags });
      setNewTagTitle('');
      setNewTagDescription('');
      setNewTagColor('#000000');
    }
  };

  const handleDeleteTag = (tagTitle) => {
    const updatedTags = entry.tags.filter(tag => tag.title !== tagTitle);
    setEntry({ ...entry, tags: updatedTags });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Application Hostname" value={entry.application_hostname || ''} onChange={handleChange('application_hostname')} required fullWidth margin="normal" />

      <FormControl fullWidth required>
        <InputLabel>Type</InputLabel>
        <Select
          value={entry.type || ''}
          label="Type"
          onChange={handleChange('type')}
        >
          <MenuItem value={"WEB"}>WEB</MenuItem>
          <MenuItem value={"MOBILE"}>MOBILE</MenuItem>
        </Select>
      </FormControl>

      <TextField label="User" value={entry.user || ''} onChange={handleChange('user')} fullWidth required margin="normal" />
      <TextField label="IP" value={entry.ip || ''} onChange={handleChange('ip')} fullWidth margin="normal" />
      <TextField label="Device" value={entry.device || ''} onChange={handleChange('device')} fullWidth margin="normal" />
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={entry.isDangerous || false} onChange={handleChange('isDangerous')} />} label="Is Dangerous" />
      </FormGroup>

      <Box display="flex" gap={2} mb={2}>
        <TextField label="New Tag Title" value={newTagTitle} onChange={e => setNewTagTitle(e.target.value)} fullWidth />
        <TextField label="Tag Description" value={newTagDescription} onChange={e => setNewTagDescription(e.target.value)} fullWidth />
        <TextField
          label="Tag Color"
          type="color"
          value={newTagColor}
          onChange={e => setNewTagColor(e.target.value)}
          fullWidth
          InputProps={{ inputProps: { style: { height: 20 } } }} 
        />
      </Box>
      <Button onClick={handleAddTag} variant="contained">Add Tag</Button>
      <List>
        {entry.tags.map((tag, index) => (
          <ListItem key={index}>
            <ListItemText primary={tag.title} secondary={`Description: ${tag.description}, Color: ${tag.color}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTag(tag.title)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Button type="submit" color="primary" variant="contained">Submit</Button>
    </form>
  );
}

export default EntryForm;