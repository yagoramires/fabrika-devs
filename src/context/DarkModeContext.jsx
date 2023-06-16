import { useContext, createContext, useState, useLayoutEffect } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState();

  useLayoutEffect(() => {
    const str = localStorage.getItem('darkmode');
    if (str === 'true') {
      setDarkMode(true);
    } else if (str === 'false ') {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
