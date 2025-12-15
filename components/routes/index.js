import { useRoutes, Navigate } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const token = localStorage.getItem('token');
 
    
  return useRoutes([
    // وقتی فقط "/" باز بشه، بره به "/site"
  {
    path: '/',
    element: token
      ? <Navigate to="/app/user/profile" replace />
      : <Navigate to="/splash" replace />
  },

    // مسیرهای اصلی
    MainRoutes,

    // مسیرهای لاگین و رجیستر
    AuthenticationRoutes
  ]);
}
