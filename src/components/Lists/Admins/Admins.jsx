// Icons
import { CgRemove } from 'react-icons/cg';
import { useEffect, useState } from 'react';

// Hooks
import { useFetchDocuments } from '../../../hooks/useFetchDocuments';
import { useUpdateDocument } from '../../../hooks/useUpdateDocument';

const Admins = ({ darkMode }) => {
  // Fetch de todos os usuários
  const { documents: allUsers, loading } = useFetchDocuments('users');
  const { updateDocument } = useUpdateDocument('users');

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (allUsers) {
      const filter = allUsers.filter((user) => user.admin === true);
      setUsers(filter);
    }
  }, [allUsers]);

  const removeAdmin = (id) => {
    updateDocument(id, { admin: false });
  };

  if (loading) {
    return <p> carregando ...</p>;
  }

  return (
    <div className='w-full md:max-w-7xl mx-auto mt-8'>
      {message && <p className='error mb-8'>{message}</p>}

      <h1
        className={`text-xl font-bold my-4 ${
          darkMode ? 'text-cWhite' : 'text-cGreen'
        }`}>
        Administradores
      </h1>

      {users &&
        users.length > 0 &&
        users.map((user) => (
          <div
            key={user.id}
            className={`flex justify-between items-center p-4 mb-2 rounded-md ${
              darkMode ? 'bg-cLtBlack' : 'bg-cDkWhite'
            }`}>
            <p
              className={`w-1/2 ${darkMode ? 'text-cWhite' : 'text-cDkBlack'}`}>
              {user.name}
            </p>
            <p
              className={`w-1/2 ${darkMode ? 'text-cWhite' : 'text-cDkBlack'}`}>
              {user.email}
            </p>
            <div className='flex gap-4 w-1/4 justify-end'>
              {users.length === 1 && (
                <button
                  type='button'
                  className='text-cDkBlack'
                  onClick={() =>
                    setMessage(
                      'Não é possivel remover todos os administradores, por favor adicione mais um para remover este.'
                    )
                  }>
                  <CgRemove />
                </button>
              )}
              {users.length > 1 && (
                <button
                  type='button'
                  className='text-cRed'
                  onClick={() => removeAdmin(user.id)}>
                  <CgRemove />
                </button>
              )}
            </div>
          </div>
        ))}
      {users && users.length === 0 && (
        <p className='w-full mt-20 text-center text-lg'>
          Nenhum administrador cadastrado.
        </p>
      )}
    </div>
  );
};

export default Admins;
