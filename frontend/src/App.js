// src/App.js
import React, { useState } from 'react';
import { Container, Navbar, Nav, Form, FormControl, Row, Col } from 'react-bootstrap';
import FileExplorer from './components/FileExplorer';
import AllFilesData from './components/AllFilesData';

function App() {
  const [currentView, setCurrentView] = useState('explorer');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>File Data Viewer</Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid className="mt-4">
        <Row className="align-items-center mb-3">
          <Col>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link 
                  active={currentView === 'explorer'} 
                  onClick={() => setCurrentView('explorer')}
                >
                  File Explorer
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={currentView === 'allData'} 
                  onClick={() => setCurrentView('allData')}
                >
                  All Files Data
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs="auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search files"
                className="mr-sm-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form>
          </Col>
        </Row>
        {currentView === 'explorer' 
          ? <FileExplorer searchTerm={searchTerm} /> 
          : <AllFilesData searchTerm={searchTerm} />
        }
      </Container>
    </>
  );
}

export default App;