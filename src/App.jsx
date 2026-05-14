import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Links from './Links';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/links" element={<Links />} />
      </Routes>
    </Router>
  );
}

export default App;
