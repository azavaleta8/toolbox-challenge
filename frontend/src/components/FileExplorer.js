import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import FileList from './FileList';
import FileData from './FileData';

function FileExplorer() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <Row>
      <Col md={3}>
        <FileList onFileSelect={setSelectedFile} />
      </Col>
      <Col md={9}>
        <FileData selectedFile={selectedFile} />
      </Col>
    </Row>
  );
}

export default FileExplorer;