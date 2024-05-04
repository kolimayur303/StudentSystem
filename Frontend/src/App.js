// Import necessary modules and components
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cruddata from './cruddata';
import Studedit from './studedit';
import Studcreate from './studcreate';

// Define the main App component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cruddata />} />
          <Route path="/studdata/:studid" element={<Studedit />} />
          <Route path="/studadd" element={<Studcreate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as default
export default App;
