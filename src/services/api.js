import config from '../config';

// Fetch all entries with pagination
export const fetchEntries = async (page, limit) => {
  try {
    const response = await fetch(`${config.BACKEND_BASE_URL}/entries?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch entries:', error);
    throw error;
  }
};

// Fetch a single entry
export const fetchEntryById = async (id) => {
  try {
    const response = await fetch(`${config.BACKEND_BASE_URL}/entries/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch entry:', error);
    throw error;
  }
};

// Create a new entry
export const createEntry = async (entryData) => {
  try {
    const response = await fetch(`${config.BACKEND_BASE_URL}/entries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entryData)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Failed to create entry:', error);
    throw error;
  }
};

// Update an entry
export const updateEntry = async (id, entryData) => {
  try {
    const response = await fetch(`${config.BACKEND_BASE_URL}/entries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entryData)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Failed to update entry:', error);
    throw error;
  }
};

// Delete an entry
export const deleteEntry = async (id) => {
  try {
    const response = await fetch(`${config.BACKEND_BASE_URL}/entries/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Failed to delete entry:', error);
    throw error;
  }
};