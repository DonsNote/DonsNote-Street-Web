import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <Routes>
      {/* Routes that should have the Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>

      {/* Route without the Navbar */}
      <Route path="/" element={<WelcomePage />} />
    </Routes>
  );
}

export default App;
