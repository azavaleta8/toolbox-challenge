import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FileList from './components/fileList';
import FileData from './components/fileData';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">File Data Viewer</h1>
      <Row>
        <Col md={3}>
          <FileList onFileSelect={setSelectedFile} />
        </Col>
        <Col md={9}>
          <FileData selectedFile={selectedFile} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
