import React from 'react'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation.js'
import Main from './components/Main.js'
import ItemsList from './components/ItemsList.js'
import NotFound from './components/NotFound.js'

function App() {
  return (
    <Router>
      <div>
        <Navigation />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/items" element={<ItemsList />} />
          <Route element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
