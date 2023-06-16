/* eslint-disable no-nested-ternary */
// Router
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth
import { onAuthStateChanged } from 'firebase/auth';

// Hooks
import { useState, useLayoutEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useFetchDocuments } from './hooks/useFetchDocuments';

// Context
import { AuthProvider } from './context/AuthContext';
import { useDarkMode } from './context/DarkModeContext';

// Components
import Header from './components/Header/Header';

// Pages
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import Profile from './pages/Profile/Profile';
import Content from './pages/Content/Content';
import Panel from './pages/Dashboard/Panel/Panel';
import Admins from './pages/Dashboard/Admins/Admins';
import Users from './pages/Dashboard/Users/Users';
import Categories from './pages/Dashboard/Categories/Categories';
import Videos from './pages/Dashboard/Videos/Videos';
import NotFound from './pages/NotFound/NotFound';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';

function App() {
  const [user, setUser] = useState(undefined);

  const [admin, setAdmin] = useState(false);
  const { auth } = useAuth();

  useLayoutEffect(() => {
    onAuthStateChanged(auth, async (userParams) => {
      setUser(userParams);
    });
  }, [auth]);

  const { documents: users } = useFetchDocuments('users');

  useLayoutEffect(() => {
    if (user && users) {
      const check = users.filter((usr) => usr.id === user.uid);
      if (check[0].admin === true) {
        setAdmin(true);
      }
    }
  }, [users]);

  const { darkMode, setDarkMode } = useDarkMode();

  const loadingUser = user === undefined;

  if (loadingUser) {
    return <p>Carregando ...</p>;
  }

  return (
    <div className='App'>
      <AuthProvider value={{ user }}>
        <Header
          admin={admin}
          user={user}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <Routes>
          {!user && <Route path='/' element={<Login darkMode={darkMode} />} />}

          {user && (
            <Route
              path='/'
              element={
                admin ? (
                  <Panel user={user} darkMode={darkMode} />
                ) : (
                  <Content user={user} darkMode={darkMode} />
                )
              }
            />
          )}

          <Route
            path='/register'
            element={
              !user ? <Register darkMode={darkMode} /> : <Navigate to='/' />
            }
          />

          <Route
            path='/forgot-password'
            element={
              !user ? (
                <ForgotPassword darkMode={darkMode} />
              ) : (
                <Navigate to='/' />
              )
            }
          />

          <Route
            path='/profile'
            element={
              user ? (
                <Profile user={user} darkMode={darkMode} />
              ) : (
                <Navigate to='/' />
              )
            }
          />

          <Route
            path='/admins'
            element={
              user && admin ? (
                <Admins darkMode={darkMode} />
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route
            path='/users'
            element={
              user && admin ? (
                <Users darkMode={darkMode} />
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route
            path='/categories'
            element={
              user && admin ? (
                <Categories darkMode={darkMode} />
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route
            path='/videos'
            element={
              user && admin ? (
                <Videos darkMode={darkMode} />
              ) : (
                <Navigate to='/' />
              )
            }
          />

          <Route path='/*' element={<NotFound darkMode={darkMode} />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
