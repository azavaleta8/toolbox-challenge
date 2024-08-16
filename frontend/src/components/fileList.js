import React from 'react';
import { ListGroup, Alert, Spinner } from 'react-bootstrap';

function FileList({ files, onFileSelect, loading, error }) {
  if (loading) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h2>Available Files</h2>
      {files.length === 0 ? (
        <Alert variant="info">No files match your search.</Alert>
      ) : (
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
      )}
    </div>
  );
}

export default FileList;