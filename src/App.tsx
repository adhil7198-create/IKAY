import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SplashScreen from './components/common/SplashScreen';
import AnnouncementBar from './components/common/AnnouncementBar';

import AuthModal from './components/auth/AuthModal';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard.tsx'));
const AdminProducts = lazy(() => import('./pages/admin/Products.tsx'));
const AdminCustomers = lazy(() => import('./pages/admin/Customers.tsx'));

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Profile = lazy(() => import('./pages/Profile'));
const Cart = lazy(() => import('./pages/Cart'));
const Orders = lazy(() => import('./pages/Orders'));

const AppContent: React.FC = () => {
  const { role } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <>
          <AnnouncementBar />
          <Navbar onAuthOpen={() => setIsAuthModalOpen(true)} />
          <main className="flex-grow">
            <Suspense fallback={
              <div className="flex items-center justify-center h-screen">
                <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />

                {/* Admin-only Routes */}
                {role === 'admin' && (
                  <>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/customers" element={<AdminCustomers />} />
                  </>
                )}
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
