import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from '../context/AuthContextProvider';

const MainLayout = () => {
  return (
    <div className='container mx-auto'>
      <ToastContainer position='bottom-left' autoClose={1500} theme='colored' />
      <AuthContextProvider>
        <Navbar />
        <Outlet />
      </AuthContextProvider>
    </div>
  );
};

export default MainLayout;
