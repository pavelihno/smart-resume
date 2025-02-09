import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Base from './components/Base';

function App() {
    return (
        <Base>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
        </Base>
    );
}

export default App;