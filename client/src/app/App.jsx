import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import Header from '../widgets/header/index';
import BottomNavigation from '../widgets/board/index';

function Layout({ children }) {
  const location = useLocation();
  const hideHeader = location.pathname === '/authentication';
  const hideBottomNav = location.pathname === '/authentication';
  
  return (
    <div className="App">
      {!hideHeader && <Header />}
      <main className={!hideBottomNav ? "pb-20" : ""}>
        {children}
      </main>
      {!hideBottomNav && <BottomNavigation />}
    </div>
  );
}

function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authentication" element={<AuthPage />} />
        <Route path="/contacts" element={<div>Контакты</div>} />
        <Route path="/profile" element={<div>Профиль</div>} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;