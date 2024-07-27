import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Login from '../views/login/login';
import Panel from '../views/main_block/panel';
import RecPass from '../views/login/rec_pass';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/recuperar' element={<RecPass />} />
          <Route path='/panel' element={<Panel />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
