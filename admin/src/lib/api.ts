export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const getAdminToken = () => localStorage.getItem('adminToken');

export const getAuthHeaders = () => {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getImageUrl = (src?: string) => {
  if (!src) return '';
  if (/^https?:\/\//i.test(src) || src.startsWith('data:')) return src;
  return `${API_BASE_URL}${src.startsWith('/') ? src : `/${src}`}`;
};
