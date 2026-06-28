import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Package, PlusCircle, ShoppingCart } from 'lucide-react';

const Layout = () => {
  const navigate = useNavigate();
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Products', icon: Package, path: '/products' },
    { label: 'Add Product', icon: PlusCircle, path: '/add-product' },
    { label: 'Orders', icon: ShoppingCart, path: '/orders' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    navigate('/login', { replace: true });
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand-lockup">
          <span className="brand-mark">NK</span>
          <div>
            <h1>NEEVKART</h1>
            <p>Admin</p>
          </div>
        </div>
        
        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `admin-nav-link ${isActive ? 'active' : ''}`
              }
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button onClick={handleLogout} className="logout-button">
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p className="eyebrow">Store Control</p>
            <h2>Admin Portal</h2>
          </div>
          <div className="admin-avatar" title="Admin">
              A
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
