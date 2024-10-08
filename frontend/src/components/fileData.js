import React, { useState, useEffect } from 'react';
import { Table, Alert, Spinner } from 'react-bootstrap';
import { getFileData } from '../services/apiService';

function FileData({ selectedFile }) {
  const [fileData, setFileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFileData = async () => {
      if (!selectedFile) return;

      try {
        setLoading(true);
        const data = await getFileData(selectedFile);
        setFileData(data);
      } catch (error) {
        setError(error.message);
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
      <h2>{selectedFile}</h2>
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