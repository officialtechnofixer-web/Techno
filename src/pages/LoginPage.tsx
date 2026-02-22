import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TesseractBackground } from '../components/TesseractBackground';


const LoginPage = () => {
  const { signInWithGithub, signInWithGoogle, signIn } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });

  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Only email login is supported by Firebase by default
      // Phone authentication requires additional setup
      await signIn(formData.email, formData.password);
      navigate('/', { replace: true });
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Login failed');
    }
  };

  // --- UPDATED GOOGLE SIGN IN LOGIC FOR LOGIN PAGE ---
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Navigation is handled by AuthContext
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Google login failed');
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub();
      // Navigation is handled by AuthContext
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'GitHub login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ minHeight: '100vh' }}>
      <TesseractBackground />
      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl relative z-10 border border-gray-100 m-4">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">
                  Sign in with {loginMethod === 'email' ? 'phone number' : 'email'}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setLoginMethod(loginMethod === 'email' ? 'phone' : 'email')}
                className="text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
              >
                {loginMethod === 'email'
                  ? 'Use phone number instead'
                  : 'Use email instead'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white py-8 px-6 shadow-xl rounded-xl sm:px-10">
          <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
            {loginMethod === 'email' ? (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <div className="mt-1">
                  <div className="flex rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm pl-10">
                      +91
                    </span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="12345 67890"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => alert("Password reset functionality is currently disabled.")}
                  className="font-medium text-blue-600 hover:text-blue-500 bg-transparent border-none p-0 cursor-pointer"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <button
                  type="button"
                  onClick={handleGithubSignIn}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-black hover:text-white transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.16 20 14.416 20 10c0-5.523-4.477-10-10-10z" />
                    </svg>
                    <span className="ml-2 group-hover:text-white">GitHub</span>
                  </span>
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-black hover:text-white transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        className="group-hover:fill-[#4285F4] transition-colors duration-300"
                      />
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <path
                        d="M12.48 10.92v3.28h4.16c-.17 1.04-1.24 3.027-4.16 3.027-1.32 0-2.44-.44-3.28-1.2l-1.92 1.853c.96.92 2.4 1.52 4.2 1.52 3.92 0 6.64-2.76 6.64-6.64 0-.4-.04-.8-.12-1.16H12.48z"
                        className="group-hover:fill-[#34A853] transition-colors duration-300"
                      />
                      <path
                        d="M12.48 10.92v3.28h4.16c-.17 1.04-1.24 3.027-4.16 3.027-1.32 0-2.44-.44-3.28-1.2l-1.92 1.853c.96.92 2.4 1.52 4.2 1.52 3.92 0 6.64-2.76 6.64-6.64 0-.4-.04-.8-.12-1.16H12.48z"
                        fill="currentColor"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <path
                        d="M12.48 10.92v3.28h4.16c-.17 1.04-1.24 3.027-4.16 3.027-1.32 0-2.44-.44-3.28-1.2l-1.92 1.853c.96.92 2.4 1.52 4.2 1.52 3.92 0 6.64-2.76 6.64-6.64 0-.4-.04-.8-.12-1.16H12.48z"
                        className="group-hover:fill-[#FBBC05] transition-colors duration-300"
                      />
                      <path
                        d="M12.48 10.92v3.28h4.16c-.17 1.04-1.24 3.027-4.16 3.027-1.32 0-2.44-.44-3.28-1.2l-1.92 1.853c.96.92 2.4 1.52 4.2 1.52 3.92 0 6.64-2.76 6.64-6.64 0-.4-.04-.8-.12-1.16H12.48z"
                        fill="currentColor"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <path
                        d="M12.48 10.92v3.28h4.16c-.17 1.04-1.24 3.027-4.16 3.027-1.32 0-2.44-.44-3.28-1.2l-1.92 1.853c.96.92 2.4 1.52 4.2 1.52 3.92 0 6.64-2.76 6.64-6.64 0-.4-.04-.8-.12-1.16H12.48z"
                        className="group-hover:fill-[#EA4335] transition-colors duration-300"
                      />
                      <path
                        d="M12.48 10.92v3.28h4.16c-.17 1.04-1.24 3.027-4.16 3.027-1.32 0-2.44-.44-3.28-1.2l-1.92 1.853c.96.92 2.4 1.52 4.2 1.52 3.92 0 6.64-2.76 6.64-6.64 0-.4-.04-.8-.12-1.16H12.48z"
                        fill="currentColor"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </svg>
                    <span className="ml-2 group-hover:text-white">Google</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;