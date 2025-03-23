import './App.css';
import Header from './component/Layout/Header';
import UserPage from './component/User';
import HomePage from './component/Home';
import TaskPage from './component/Task';
import AdminPage from './component/Admin';
import LoginPage from './component/Login';
import Notification from './component/Notification';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/task" element={<TaskPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/notification" element={<Notification />} />
        </Routes>

      </AuthProvider>
    </Router>
  );
}



export default App;
