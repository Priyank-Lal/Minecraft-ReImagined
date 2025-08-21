import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import HomePage from './pages/HomePage';
import EditionDetail from './pages/EditionDetail';
import LoadingScreen from './components/LoadingScreen';

function App() {
  return (
    <Router>
      <div className="relative">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edition/:editionId" element={<EditionDetail />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;