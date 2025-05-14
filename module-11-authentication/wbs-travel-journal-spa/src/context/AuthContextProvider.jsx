import { createContext, useEffect, useState } from 'react';
import { me, signOut } from '../data/auth';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log('User: ', user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await me();
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  const logOut = async () => {
    try {
      await signOut(); //Cookie will be deleted
      setUser(null); //User data will be deleted
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    user,
    setUser,
    logOut,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
