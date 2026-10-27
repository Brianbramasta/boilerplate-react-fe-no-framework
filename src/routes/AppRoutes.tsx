import { Routes, Route } from 'react-router';
import AppLayout from '../layout/AppLayout';
import ProtectedOutlet from './ProtectedOutlet';
import NotFound from '@/pages/OtherPage/NotFound';
import ReferenceUiPage from '@/pages/ReferenceUiPage';
import { KaryawanPage } from '@/features/karyawan';
import { SignInPage, SignUpPage, VerifyOtpPage, ResetPasswordPage } from '@/features/auth';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public auth routes (di luar dashboard chrome) */}
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/verify-otp" element={<VerifyOtpPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/karyawan-demo" element={<KaryawanPage />} />
      <Route path="/" element={<KaryawanPage />} />

      {/* Protected routes: cek auth dulu, baru mount dashboard chrome (AppLayout) */}
      <Route element={<ProtectedOutlet />}>
        <Route element={<AppLayout />}>
          
          
          <Route path="/reference-ui" element={<ReferenceUiPage />} />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
