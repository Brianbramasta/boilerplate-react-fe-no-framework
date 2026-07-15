import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '@/features/auth';

export default function ProtectedOutlet() {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
}
