// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Facebook, Linkedin, Twitter } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error: authError } = useSelector((state) => state.auth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setError('');
    dispatch(loginUser({ email, password }));
  };

  const handleMagicLinkLogin = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setError('');
    try {
      // Implement magic link functionality using the proxy API
      const response = await fetch('/api/proxy?endpoint=auth/magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to send magic link');
      }
      
      setMagicLinkSent(true);
    } catch (error) {
      setError(error.message || 'Failed to send magic link. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Static background with dotted lines */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Top right curve */}
          <path 
            d="M600,0 Q750,150 850,300" 
            fill="none" 
            stroke="#6366F1" 
            strokeWidth="2" 
            strokeDasharray="6 6" 
            className="opacity-30"
          />
          
          {/* Bottom left curve */}
          <path 
            d="M0,400 Q150,500 250,650" 
            fill="none" 
            stroke="#6366F1" 
            strokeWidth="2" 
            strokeDasharray="6 6" 
            className="opacity-30"
          />
          
          {/* Middle right curve */}
          <path 
            d="M800,200 Q650,300 700,500" 
            fill="none" 
            stroke="#6366F1" 
            strokeWidth="2" 
            strokeDasharray="6 6" 
            className="opacity-30"
          />
        </svg>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md z-10">
        <h2 className="text-2xl font-medium text-center mb-6">Login to ReferralHub</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {magicLinkSent && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            Magic link has been sent to your email. Please check your inbox.
          </div>
        )}
        
        {/* Google/Microsoft Login Button */}
        <button 
          className="w-full py-2 px-4 border border-gray-300 rounded-md flex justify-center items-center gap-2 mb-4 hover:bg-gray-50 transition-colors"
          onClick={() => console.log("Google/Microsoft login")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span>Continue with Google/Microsoft</span>
        </button>

        <div className="relative my-4">
          <p className="text-center text-sm font-medium text-gray-500 bg-white px-2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">Magic Link Login</p>
          <hr className="border-gray-300" />
        </div>

        {/* Magic Link Form */}
        <form onSubmit={handleMagicLinkLogin} className="mb-4">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading && !magicLinkSent}
            className="w-full py-2 px-4 rounded-md text-white font-medium transition-all duration-200 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
          >
            {loading && !magicLinkSent ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>

        <div className="relative my-4">
          <p className="text-center text-sm font-medium text-gray-500 bg-white px-2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">or</p>
          <hr className="border-gray-300" />
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="robert.fox@example.com"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="ml-2 text-sm text-gray-600">Remember Me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            disabled={loading && magicLinkSent}
            className="w-full py-2 px-4 rounded-md text-white font-medium transition-all duration-200 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="relative my-4">
          <p className="text-center text-sm font-medium text-gray-500 bg-white px-2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">or</p>
          <hr className="border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button 
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
            onClick={() => console.log("Google login")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          </button>
          <button 
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 text-blue-600"
            onClick={() => console.log("Facebook login")}
          >
            <Facebook size={20} />
          </button>
          <button 
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 text-blue-400"
            onClick={() => console.log("Twitter login")}
          >
            <Twitter size={20} />
          </button>
          <button 
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 text-blue-700"
            onClick={() => console.log("LinkedIn login")}
          >
            <Linkedin size={20} />
          </button>
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;