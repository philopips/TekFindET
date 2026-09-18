import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Mail,
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Store
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminLoginProps {
  onBackToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToStore }) => {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, error, clearError } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setFormMessage(null);

    if (!email.trim() || !password) {
      setFormMessage('Please enter both email and password.');
      return;
    }

    if (password.length < 6) {
      setFormMessage('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (err: any) {
      // Error is handled in AuthContext and state
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    clearError();
    setFormMessage(null);
    setSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      // Error handled in AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          type="button"
          onClick={onBackToStore}
          className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 px-3.5 py-2 rounded-xl transition-all active:scale-95 cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Brand & Badge */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <img
              src="/app-icon.png"
              alt="TekFind"
              className="w-14 h-14 rounded-2xl object-cover shadow-lg ring-2 ring-yellow-400/40"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/30 px-3.5 py-1.5 rounded-full text-yellow-300 text-xs font-black tracking-wide uppercase shadow-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>TekFind Admin Portal</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {mode === 'login' ? 'Admin Access & Store Manager' : 'Create Admin Account'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Sign in with Firebase Authentication to manage electronic products, pricing, and shop inventory.
          </p>
        </div>

        <div className="mt-8 bg-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl animate-fade-in">
          {/* Mode Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-2xl mb-6 border border-slate-800/50">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                clearError();
                setFormMessage(null);
              }}
              className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-yellow-400 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                clearError();
                setFormMessage(null);
              }}
              className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-yellow-400 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Register Admin
            </button>
          </div>

          {/* Error Alert */}
          {(error || formMessage) && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{formMessage || error}</span>
            </div>
          )}

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-all disabled:opacity-50 active:scale-98 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-3 text-slate-500 font-medium tracking-wider">
                Or with Email
              </span>
            </div>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tekfind.et"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 transition-all outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 transition-all outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {mode === 'register' && (
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Must be at least 6 characters long.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-slate-950 font-black text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-yellow-400/25 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] cursor-pointer"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
              ) : mode === 'login' ? (
                <>
                  <Lock className="w-4 h-4 text-slate-950" />
                  <span>Sign In as Admin</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>Create Admin Account</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Notice */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center text-xs text-slate-500 space-y-1">
            <p>
              Protected by Firebase Authentication & Firestore Security Rules.
            </p>
            <p className="text-[11px] text-slate-600">
              Only authenticated administrators can manage shop products and prices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
