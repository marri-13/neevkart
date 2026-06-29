import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock, LogIn, User } from 'lucide-react';
import { API_BASE_URL, getAdminToken } from '../lib/api';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (getAdminToken()) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, { username, password });
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminName', res.data.admin?.name || 'Admin');
      navigate('/', { replace: true });
    } catch (loginError: any) {
      setError(loginError.response?.data?.message || 'Unable to login. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-brand">
          <span>NK</span>
        </div>
        <div>
          <p className="eyebrow">Neevkart Admin</p>
          <h1>Sign in to manage your store</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            <span>Username</span>
            <div className="field-with-icon">
              <User size={18} />
              <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" />
            </div>
          </label>

          <label>
            <span>Password</span>
            <div className="field-with-icon">
              <Lock size={18} />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
            </div>
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" disabled={loading} className="primary-action">
            <LogIn size={18} />
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
