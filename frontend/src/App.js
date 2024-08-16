import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import FileExplorer from './components/FileExplorer';
import AllFilesData from './components/AllFilesData';

function App() {
  const [currentView, setCurrentView] = useState('explorer');

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>File Data Viewer</Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid className="mt-4">
        <Nav variant="tabs" className="mb-3">
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
        {currentView === 'explorer' ? <FileExplorer /> : <AllFilesData />}
      </Container>
    </>
  );
}

export default App;