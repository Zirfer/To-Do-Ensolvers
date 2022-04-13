import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation.js';
import Main from './components/Main.js';
import ItemsList from './components/ItemsList.js';
import FoldersList from './components/FolderList.js';
import NotFound from './components/NotFound.js';
//
import './App.css'


function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div>
          <Navigation />
        </div>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/items" element={<ItemsList />} >
            <Route path="/items/viewFolder/:idFolder" element={<ItemsList />} />
          </Route>
          <Route path="/folders" element={<FoldersList />} />
          <Route element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
