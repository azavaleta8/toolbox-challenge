import React, { useState, useEffect } from 'react';
import { ListGroup, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

function FileList({ onFileSelect }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://toolbox-challenge.onrender.com/api/files/list');
        setFiles(response.data.files);
        setError(null);
      } catch (error) {
        console.error('Error fetching file list:', error);
        setError('Failed to load file list. Please try again later.');
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