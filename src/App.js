import './App.css';
import MainPage from './Pages/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeamPanel from './Pages/TeamPanel';
function App() {
  return (
    <div className="App">
      <Router>
                        <Routes>
                            <Route path='/' element={<MainPage />} />
                            <Route path='/Dashboard' element={<TeamPanel />} />
                            </Routes>
                            </Router>
    </div>
  );
}

export default App;
