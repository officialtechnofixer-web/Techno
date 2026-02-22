import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TesseractBackground } from '../components/TesseractBackground';

const LoginPage: React.FC = () => {
  const { signIn, signInWithGoogle, signInWithGithub } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Google sign-in failed');
    }
    setLoading(false);
  };

  const handleGithubLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGithub();
      navigate('/');
    } catch (err) {
      setError('GitHub sign-in failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <TesseractBackground />

      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl z-10">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/auth/signup" className="text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}

        {/* EMAIL LOGIN */}
        <form className="mt-6 space-y-4" onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* OAUTH */}
        <div className="mt-6">
          <div className="text-center text-sm text-gray-500 mb-3">
            Or continue with
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleGithubLogin}
              className="py-2 border rounded-md hover:bg-black hover:text-white transition"
            >
              GitHub
            </button>

            <button
              onClick={handleGoogleLogin}
              className="py-2 border rounded-md hover:bg-black hover:text-white transition"
            >
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
