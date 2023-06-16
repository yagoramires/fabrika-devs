// Icons
import { BsPlusLg } from 'react-icons/bs';

// Hooks
import { useState } from 'react';
import { useFetchDocuments } from '../../../hooks/useFetchDocuments';

// Components
import AddMail from '../../../components/AddModal/AddMail/AddMail';
import Mails from '../../../components/Lists/Mails/Mails';
import UsersList from '../../../components/Lists/Users/Users';

const Users = ({ darkMode }) => {
  const { documents: emails } = useFetchDocuments('mailslist');

  const [active, setActive] = useState(false);

  return (
    <div
      className={`p-4 flex flex-col heightCalc ${
        darkMode ? 'bg-cDkBlack' : 'bg-cWhite'
      }`}>
      <button
        type='button'
        onClick={() => setActive(!active)}
        className='cursor-pointer bg-cGreen text-cWhite px-8 w-40 py-2  shadow-md my-4 font-bold rounded-3xl flex items-center justify-between text-2xl self-end'>
        Novo <BsPlusLg className='text-xl font-bold' />
      </button>

      <div>
        <Mails mails={emails} darkMode={darkMode} />
      </div>
      <div>
        <UsersList darkMode={darkMode} />
      </div>

      <div
        className={`${
          active
            ? 'absolute w-full h-[100vh] bg-cBlackTransp transp top-0 left-0'
            : 'hidden'
        }`}>
        <AddMail setActive={setActive} mails={emails} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Users;
