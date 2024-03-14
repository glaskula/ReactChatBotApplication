import React from 'react';
import Chatbot from './components/Chatbot';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Add this line to import App.css
// In App.js or another top-level component
import './fonts.css'; // The path should point to your fonts.css file


function App() {
  return (
    <div className="App">
      <Chatbot />
    </div>
  );
}

export default App;
