import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import AdminPage from './dashboards/AdminPage';
import CandidatePage from './dashboards/CandidatePage';
import GuestPage from './dashboards/GuestPage';
import ManagerPage from './dashboards/ManagerPage';
import LoginComponent from './LoginComponent';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import UserManagementPage from './pages/UserManagementPage';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute
import { LoginProvider } from './LoginContext';
import JobAddPage from './dashboards/JobAddPage'; // Import JobAddPage
import JobDetailPage from './dashboards/JobDetailPage';
import JobListingsPage from './dashboards/JobListingsPage'; // Import JobListingsPage
import ApplyPage from './dashboards/ApplyPage'; // Import ApplyPage ApplyPage from './dash/ApplyPage'; // Import ApplyPage
import GuestJobPage from './dashboards/GuestJobPage'; // Import GuestJobPage

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <HeaderComponent />
        <LoginComponent />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<PrivateRoute element={<AdminPage />} role="Administrator" />} />
          <Route path="/candidate" element={<PrivateRoute element={<CandidatePage />} role="Candidate" />} />
          <Route path="/search-jobs" element={<JobListingsPage />} />
          <Route path="/apply/:jobId" element={<ApplyPage />} />
          <Route path="/guest" element={<GuestPage />} />
          <Route path="/guest/:jobId" element={<GuestJobPage />} />
          <Route path="/manager" element={<PrivateRoute element={<ManagerPage />} role="Hiring_Manager" />} />
          <Route path="/jobs/:jobId" element={<JobDetailPage />} />
          <Route path="/manager/create-job" element={<JobAddPage />} />
          <Route path="/usermanagement" element={<PrivateRoute element={<UserManagementPage />} role="Administrator" />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
