import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { logout } from './store/authSlice';
import { BrowserRouter, Outlet } from 'react-router';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentuser()
      .then((userData) => {
        if (userData) {
          dispatch({ userData })
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-green-50">
      <div className="w-full block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  ) : null


}

export default App
