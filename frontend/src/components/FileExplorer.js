import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import FileList from './fileList';
import FileData from './fileData';
import { getFilesList } from '../services/apiService';

function FileExplorer({ searchTerm }) {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const fetchedFiles = await getFilesList();
        setFiles(fetchedFiles);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const filteredFiles = files.filter(file => 
    file.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Row>
      <Col md={3}>
        <FileList 
          files={filteredFiles}
          onFileSelect={setSelectedFile}
          loading={loading}
          error={error}
        />
      </Col>
      <Col md={9}>
        <FileData selectedFile={selectedFile} />
      </Col>
    </Row>
  );
}

export default FileExplorer;