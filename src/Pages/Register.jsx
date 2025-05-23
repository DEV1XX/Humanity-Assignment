import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Facebook, Linkedin, Twitter } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!fullName || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    const userData = {
      email: email,
      password: password,
      role: 'BusinessOwner', // Default role, can be made dynamic if needed
      full_name: fullName,
      phone: phone || undefined // Only include if provided
    };

    try {
      const response = await fetch('https://cors-anywhere.herokuapp.com/http://34.10.166.233/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error response
        throw new Error(data.detail || 'Registration failed');
      }

      // Registration successful
      console.log('Registration successful', data);
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      {/* SVG Background container - with z-index-0 to keep it in the back */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <svg width="1440" height="452" viewBox="0 0 1440 452" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-1 397.997C129.254 453.548 220.379 463.406 359.5 436.997C519.764 406.575 720 225.997 720 225.997C720 225.997 920.236 45.4197 1080.5 14.9974C1219.62 -11.4115 1310.75 -1.55335 1441 53.9974" stroke="#305AFF" stroke-opacity="0.65" stroke-dasharray="6 6"/>
        </svg>
        <svg width="1440" height="452" viewBox="0 0 1440 452" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-1 397.997C129.254 453.548 220.379 463.406 359.5 436.997C519.764 406.575 720 225.997 720 225.997C720 225.997 920.236 45.4197 1080.5 14.9974C1219.62 -11.4115 1310.75 -1.55335 1441 53.9974" stroke="#305AFF" stroke-opacity="0.65" stroke-dasharray="6 6"/>
        </svg>
      </div>
      
      {/* Form - with z-index-10 to ensure it's on top */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md z-10 relative">
        <h2 className="text-2xl font-medium text-center mb-6">Register for ReferralHub</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleRegister}>
          {/* Full Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Id</label>
            <input
              type="email"
              placeholder="robert.fox@example.com"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* Phone Number Field (Optional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          
          {/* Create Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Create Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
          
          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter password"
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-md text-white font-medium transition-all duration-200 bg-gradient-to-r from-[rgba(48,90,255,0.8)] to-[#B5D2FF] hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4 disabled:opacity-70"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="relative my-4">
          <p className="text-center text-sm font-medium text-gray-500 bg-white px-2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">or</p>
          <hr className="border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          </button>
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 text-blue-600">
            <Facebook size={20} />
          </button>
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 text-blue-400">
            <Twitter size={20} />
          </button>
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 text-blue-700">
            <Linkedin size={20} />
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;