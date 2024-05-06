import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EntryForm from '../components/EntryForm';
import { fetchEntryById } from '../services/api';

function EditEntryPage() {
  const { entryId } = useParams();
  const [entryData, setEntryData] = useState(null);

  useEffect(() => {
    const loadEntryData = async () => {
      try {
        const data = await fetchEntryById(entryId);
        setEntryData(data);
      } catch(error) {
        console.error('Failed to fetch entry', error);
      }
    };
    loadEntryData();
  }, [entryId]);

  return (
    <div>
      <h1>Edit Entry</h1>
      {entryData && <EntryForm initialData={entryData} />}
    </div>
  );
}

export default EditEntryPage;