import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials, RegisterPayload } from '../../domain/entities/User';
import { Login } from '../../domain/usecases/Login';
import { Register } from '../../domain/usecases/Register';
import { VerifyOtp } from '../../domain/usecases/VerifyOtp';
import { RequestPasswordReset } from '../../domain/usecases/RequestPasswordReset';
import { Logout } from '../../domain/usecases/Logout';
import { AuthRepositoryImpl } from '../../data/repositories/AuthRepository';
import { setAuthTokens, removeAuthTokens, isAuthenticated } from '@/services/api';
import { useAuthStore } from '../stores/useAuthStore';

export const UseAuth = () => {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const session = await Login(AuthRepositoryImpl)(credentials);
      setAuthTokens(session.accessToken, session.refreshToken);
      setUser(session.user);
      navigate('/');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal masuk. Periksa email/password Anda.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: RegisterPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const session = await Register(AuthRepositoryImpl)(payload);
      setAuthTokens(session.accessToken, session.refreshToken);
      setUser(session.user);
      navigate('/');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mendaftar.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (code: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await VerifyOtp(AuthRepositoryImpl)(code);
      navigate('/');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kode OTP tidak valid.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await RequestPasswordReset(AuthRepositoryImpl)(email);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengirim link reset password.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await Logout(AuthRepositoryImpl)();
    } catch {
      // token akan tetap dihapus di local meskipun call logout ke server gagal
    } finally {
      removeAuthTokens();
      setUser(null);
      setLoading(false);
      navigate('/signin');
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    verifyOtp,
    requestPasswordReset,
    logout,
    isAuthenticated,
  };
};
