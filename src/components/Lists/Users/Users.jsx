// Icons
import { CgRemove } from 'react-icons/cg';
import { useEffect, useState } from 'react';
import { RiAdminLine } from 'react-icons/ri';

// Hooks
import { useFetchDocuments } from '../../../hooks/useFetchDocuments';
import { useUpdateDocument } from '../../../hooks/useUpdateDocument';
import { useDeleteDocument } from '../../../hooks/useDeleteDocument';
import { useAuth } from '../../../hooks/useAuth';

const Users = ({ darkMode }) => {
  // Fetch de todos os usuários
  const { documents: allUsers, loading } = useFetchDocuments('users');
  const { updateDocument } = useUpdateDocument('users');

  const [users, setUsers] = useState([]);

  // Função de deletar documentos
  const { deleteDocument } = useDeleteDocument('users');
  const { removeUser } = useAuth();

  const handleDelete = (id) => {
    removeUser(id);
    deleteDocument(id);
  };

  useEffect(() => {
    if (allUsers) {
      const filter = allUsers.filter((user) => user.admin === false);
      setUsers(filter);
    }
  }, [allUsers]);

  const makeAdmin = (id) => {
    updateDocument(id, { admin: true });
  };

  if (loading) {
    return <p> carregando ...</p>;
  }

  return (
    <div className='w-full md:max-w-7xl mx-auto mt-8'>
      <h1
        className={`text-xl font-bold my-4 ${
          darkMode ? 'text-cWhite' : 'text-cGreen'
        }`}>
        Usuários Cadastrados
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
              className={`max-w-[20%] text-[.8rem] md:text-[1rem] ${
                darkMode ? 'text-cWhite' : 'text-cDkBlack'
              }`}>
              {user.name}
            </p>
            <p
              className={`w-full text-[.7rem] text-center md:text-[1rem] md:text-left ${
                darkMode ? 'text-cWhite' : 'text-cDkBlack'
              }`}>
              {user.email}
            </p>
            <div className='flex flex-col md:flex-row gap-4 max-w-1/10 justify-end'>
              <button
                type='button'
                className='text-cGreen'
                onClick={() => makeAdmin(user.id)}>
                <RiAdminLine />
              </button>
              <button
                type='button'
                className='text-cRed'
                onClick={() => handleDelete(user.id)}>
                <CgRemove />
              </button>
            </div>
          </div>
        ))}
      {users && users.length === 0 && (
        <p className='w-full  text-center text-lg mt-20'>
          Nenhum usuário cadastrado.
        </p>
      )}
    </div>
  );
};

export default Users;
