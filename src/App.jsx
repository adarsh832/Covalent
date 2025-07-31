import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import CustomCursor from './components/CustomCursor';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PostProject from './pages/PostProject';
import BrowseProjects from './pages/BrowseProjects';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import ManageProjects from './pages/ManageProjects';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <CustomCursor />
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/post-project" element={<ProtectedRoute><PostProject /></ProtectedRoute>} />
              <Route path="/find-projects" element={<ProtectedRoute><BrowseProjects /></ProtectedRoute>} />
              <Route path="/browse-projects" element={<ProtectedRoute><BrowseProjects /></ProtectedRoute>} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/manage-projects" element={<ProtectedRoute><ManageProjects /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
