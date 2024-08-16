import React, { useState, useEffect } from 'react';
import { ListGroup, Alert, Spinner } from 'react-bootstrap';
import { getFilesList } from '../services/apiService';

function FileList({ onFileSelect }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const fetchedFiles = await getFilesList();
        setFiles(fetchedFiles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h2>Available Files</h2>
      <ListGroup>
        {files.map((file, index) => (
          <ListGroup.Item 
            key={index} 
            action 
            onClick={() => onFileSelect(file)}
          >
            {file}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default FileList;
