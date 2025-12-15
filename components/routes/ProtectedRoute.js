import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // یا هر کلید دیگه‌ای که برای ورود داری

  if (!token) {
    // اگر لاگین نکرده → بفرست به splash
    return <Navigate to="/splash" replace />;
  }

  // اگر لاگین کرده → نمایش بده
  return children;
};

export default ProtectedRoute;
