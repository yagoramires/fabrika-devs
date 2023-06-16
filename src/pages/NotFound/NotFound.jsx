import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({ darkMode }) => {
  return (
    <div
      className={`flex flex-col gap-10 items-center justify-center heightCalc min-w-full ${
        darkMode ? 'bg-cDkBlack' : ''
      }`}>
      <h1 className='font-bold text-8xl text-cGreen'>404</h1>
      <p className={` ${darkMode ? 'text-cWhite' : ''}`}>
        Página não encontrada, volte para o{' '}
        <Link to='/' className='font-bold text-cGreen'>
          início
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
