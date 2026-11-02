import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import UserSwitchBar from './components/common/UserSwitchBar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CartDrawer from './components/cart/CartDrawer';
import ReservationModal from './components/reservations/ReservationModal';
import ParkingModal from './components/parking/ParkingModal';
import AuthModal from './components/auth/AuthModal';
import CreateReviewModal from './components/reviews/CreateReviewModal';
import RoleGuard from './components/common/RoleGuard';

import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import TablesPage from './pages/TablesPage';
import KitchenPage from './pages/KitchenPage';
import TrackingPage from './pages/TrackingPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isParkingOpen, setIsParkingOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 font-sans">
              
              {/* Quick RBAC Role Selector Banner (Semana 10) */}
              <UserSwitchBar />

              {/* Top Navigation */}
              <Navbar
                onOpenAuth={() => setIsAuthOpen(true)}
                onOpenReservation={() => setIsReservationOpen(true)}
                onOpenParking={() => setIsParkingOpen(true)}
              />

              {/* Main App Routes */}
              <main className="flex-1">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <HomePage
                        onOpenReservation={() => setIsReservationOpen(true)}
                        onOpenCreateReview={() => setIsReviewOpen(true)}
                      />
                    }
                  />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/mesas"
                    element={
                      <RoleGuard allowedRoles={['ADMIN', 'MESERO']}>
                        <TablesPage />
                      </RoleGuard>
                    }
                  />
                  <Route
                    path="/cocina"
                    element={
                      <RoleGuard allowedRoles={['ADMIN', 'CHEF']}>
                        <KitchenPage />
                      </RoleGuard>
                    }
                  />
                  <Route path="/tracking" element={<TrackingPage />} />
                  <Route
                    path="/admin"
                    element={
                      <RoleGuard allowedRoles={['ADMIN']}>
                        <AdminPage />
                      </RoleGuard>
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>

              {/* Global Modals & Drawers */}
              <CartDrawer />
              
              <ReservationModal
                isOpen={isReservationOpen}
                onClose={() => setIsReservationOpen(false)}
              />

              <ParkingModal
                isOpen={isParkingOpen}
                onClose={() => setIsParkingOpen(false)}
              />

              <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
              />

              <CreateReviewModal
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
              />

              {/* Footer */}
              <Footer />

            </div>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

