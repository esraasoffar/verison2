import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const VALID_CREDENTIALS = [
  { username: "testuser", password: "password123" },
  { username: "admin", password: "admin123" },
  { username: "freshman", password: "fresh2024" },
  { username: "sophomore", password: "soph2024" },
  { username: "junior", password: "junior2024" },
  { username: "senior", password: "senior2024" },
  { username: "transfer", password: "transfer2024" },
  { username: "parttime", password: "part2024" },
  { username: "honors", password: "honors2024" }
];

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const isValid = VALID_CREDENTIALS.some(
      cred => cred.username === username && cred.password === password
    );

    if (isValid) {
      login(username);
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#EDF6F9] flex flex-col">
      <header className="bg-[#006D77] text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap size={32} />
            <div className="text-sm">
              <div className="font-bold">ÓBUDAI EGYETEM</div>
              <div className="text-xs">ELEKTRONIKUS ÉS DIGITÁLIS</div>
              <div className="text-xs">TANANYAGOK IRODA</div>
            </div>
          </div>
          <nav className="flex space-x-6">
            <Link to="/" className="text-white hover:text-[#83C5BE] transition-colors">
              Home
            </Link>
            <Link to="/login" className="text-[#FFDDD2] hover:text-white transition-colors">
              Login
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-center gap-2">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:border-transparent"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006D77] focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#006D77] text-white py-2 px-4 rounded-md hover:bg-[#005a63] transition-colors duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;