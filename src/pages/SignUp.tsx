import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TesseractBackground } from '../components/TesseractBackground';

const SignupPage = () => {
  const { signUp, signInWithGoogle, signInWithGithub } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password should be at least 6 characters');
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.name);
      navigate('/', { replace: true });
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <TesseractBackground />

      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl relative z-10 border">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/auth/login" className="text-blue-600 hover:text-blue-500">
              sign in to your account
            </Link>
          </p>
        </div>

        {/* SIGNUP FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>

        {/* OAUTH SIGNUP */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Or sign up with
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={async () => {
              try {
                await signInWithGithub();
              } catch (err: any) {
                console.error(err);
                alert(err.message || 'GitHub signup failed');
              }
            }}
            className="w-full py-2 border rounded-md hover:bg-black hover:text-white"
          >
            GitHub
          </button>

          <button
            type="button"
            onClick={async () => {
              try {
                await signInWithGoogle();
              } catch (err: any) {
                console.error(err);
                alert(err.message || 'Google signup failed');
              }
            }}
            className="w-full py-2 border rounded-md hover:bg-black hover:text-white"
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;