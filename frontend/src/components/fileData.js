import React, { useState, useEffect } from 'react';
import { Table, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

function FileData({ selectedFile }) {
  const [fileData, setFileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFileData = async () => {
      if (!selectedFile) return;

      try {
        setLoading(true);
        const response = await axios.get(`https://toolbox-challenge.onrender.com/api/files/data?fileName=${selectedFile}`);
        setFileData(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching file data:', error);
        setError('Failed to load file data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFileData();
  }, [selectedFile]);

  if (!selectedFile) {
    return <Alert variant="info">Please select a file to view its data.</Alert>;
  }

  if (loading) {
    return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h2>File Data: {selectedFile}</h2>
      {fileData.length === 0 ? (
        <Alert variant="warning">No data available for this file.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {fileData.map((file) => 
              file.lines.map((line, lineIndex) => (
                <tr key={`${file.file}-${lineIndex}`}>
                  <td>{line.text}</td>
                  <td>{line.number}</td>
                  <td>{line.hex}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default FileData;