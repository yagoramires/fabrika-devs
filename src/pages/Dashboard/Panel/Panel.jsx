// Links
import { Link } from 'react-router-dom';

// Icons
import { CgFolder, CgPlayButtonR, CgUserList } from 'react-icons/cg';
import { RiAdminLine } from 'react-icons/ri';

const Panel = ({ darkMode }) => {
  return (
    <nav
      className={`w-full p-8 flex flex-col gap-4 heightCalc ${
        darkMode ? 'bg-cDkBlack' : 'bg-cWhite'
      }`}>
      <Link
        to='/admins'
        className={`flex text-xl items-center gap-4 p-8 rounded-lg text-cWhite font-bold shadow-lg hover:bg-cLtBlue transition-all duration-300 ${
          darkMode ? 'bg-cLtBlack' : 'bg-cGreen'
        }`}>
        <RiAdminLine className='text-2xl' />
        Administradores
      </Link>
      <Link
        to='/users'
        className={`flex text-xl items-center gap-4 p-8 rounded-lg text-cWhite font-bold shadow-lg hover:bg-cLtBlue transition-all duration-300 ${
          darkMode ? 'bg-cLtBlack' : 'bg-cGreen'
        }`}>
        <CgUserList className='text-2xl' />
        Usuários
      </Link>
      <Link
        to='/categories'
        className={`flex text-xl items-center gap-4 p-8 rounded-lg text-cWhite font-bold shadow-lg hover:bg-cLtBlue transition-all duration-300 ${
          darkMode ? 'bg-cLtBlack' : 'bg-cGreen'
        }`}>
        <CgFolder className='text-2xl' />
        Categorias
      </Link>
      <Link
        to='/videos'
        className={`flex text-xl items-center gap-4 p-8 rounded-lg text-cWhite font-bold shadow-lg hover:bg-cLtBlue transition-all duration-300 ${
          darkMode ? 'bg-cLtBlack' : 'bg-cGreen'
        }`}>
        <CgPlayButtonR className='text-2xl' />
        Vídeos
      </Link>
    </nav>
  );
};

export default Panel;
