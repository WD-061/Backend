import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import CreatePost from './pages/CreatePost';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Post from './pages/Post';
import Register from './pages/Register';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='post/:id' element={<Post />} />
        <Route element={<ProtectedLayout />}>
          <Route path='create' element={<CreatePost />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
