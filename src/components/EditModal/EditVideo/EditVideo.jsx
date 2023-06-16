/* eslint-disable no-else-return */
// Icons
import { BiX } from 'react-icons/bi';

// Hooks
import { useEffect, useState } from 'react';
import { useUpdateDocument } from '../../../hooks/useUpdateDocument';
import { useFetchDocuments } from '../../../hooks/useFetchDocuments';

// Context
import { useAuthValue } from '../../../context/AuthContext';

const EditVideo = ({ setActive, video, darkMode }) => {
  // Form States
  const [newCategory, setNewCategory] = useState('html');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState('');

  // Messages States
  const [error, setError] = useState('');

  // Pega os dados do usuário para inserir no objeto
  const { user } = useAuthValue();

  // Pega as categorias
  const { documents: categories } = useFetchDocuments('categories');

  // Hook de inserir documento no banco de dados
  const {
    updateDocument,
    error: updateError,
    loading: updateLoading,
  } = useUpdateDocument('videos');

  // Função de envio do form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida os campos
    if (newCategory === '' && title === '' && description === '') {
      setError('Por favor preencha todos os campos.');
      return;
    } else if (newCategory === '') {
      setError('Por escolha uma categoria.');
      return;
    } else if (title === '') {
      setError('Por envie um título.');
      return;
    } else if (description === '') {
      setError('Por envie uma descrição.');
      return;
    }

    // Cria o objeto que será inserido no banco de dados
    const data = {
      order,
      category: newCategory,
      title,
      description,
      createdBy: user.uid,
      userEmail: user.email,
    };

    updateDocument(video.id, data);

    setDescription('');
    setTitle('');
    setError('');

    setActive(false);
  };

  // Preenche os dados dos inputs com o video atual
  useEffect(() => {
    if (video) {
      setOrder(video.order);
      setNewCategory(video.category);
      setTitle(video.title);
      setDescription(video.description);
    }
  }, [video]);

  // Se houver algum erro ou mensagem no upload, atualiza o state com o erro ou msg do upload
  useEffect(() => {
    if (updateError) {
      setError(updateError);
    }
  }, [updateError]);

  // Remove o erro da tela em 3s
  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${darkMode ? 'bg-cLtBlack' : 'bg-cWhite'}`}>
      <div
        className={`flex justify-between items-center  w-full mx-auto text-2xl font-bold ${
          darkMode ? 'text-cWhite' : 'text-cGreen'
        }`}>
        <h1 className='text-center'>Editar vídeo</h1>
        <BiX
          className='text-3xl cursor-pointer'
          onClick={() => setActive(false)}
        />
      </div>
      <label htmlFor='category' className='form-label'>
        <span
          className={`w-full font-bold ${
            darkMode ? 'text-cWhite' : 'text-cGreen '
          }`}>
          Categoria:
        </span>
        <select
          name='category'
          className={`form-input ${
            darkMode ? 'bg-cDkBlack text-cWhite' : 'bg-cDkWhite text-cDkBlack'
          }`}
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}>
          {categories &&
            categories
              .sort((a, b) => a.order - b.order)
              .map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
        </select>
      </label>
      <label htmlFor='title' className='form-label'>
        <span
          className={`w-full font-bold ${
            darkMode ? 'text-cWhite' : 'text-cGreen '
          }`}>
          Título:
        </span>
        <input
          type='text'
          name='title'
          value={title || ''}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Digite o título do seu vídeo'
          className={`form-input ${
            darkMode ? 'bg-cDkBlack text-cWhite' : 'bg-cDkWhite text-cDkBlack'
          }`}
          autoComplete='on'
        />
      </label>
      <label htmlFor='description' className='form-label '>
        <span
          className={`w-full font-bold ${
            darkMode ? 'text-cWhite' : 'text-cGreen '
          }`}>
          Descrição:
        </span>
        <textarea
          type='text'
          name='description'
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Digite a descrição do seu vídeo'
          className={`form-input resize-none h-24 ${
            darkMode ? 'bg-cDkBlack text-cWhite' : 'bg-cDkWhite text-cDkBlack'
          }`}
          autoComplete='on'
        />
      </label>
      <label htmlFor='order' className='form-label '>
        <span
          className={`w-full font-bold ${
            darkMode ? 'text-cWhite' : 'text-cGreen '
          }`}>
          Ordem:
        </span>
        <input
          type='number'
          name='order'
          value={order || ''}
          onChange={(e) => setOrder(e.target.value)}
          placeholder='Digite a ordem desejada do seu vídeo'
          className={`form-input ${
            darkMode ? 'bg-cDkBlack text-cWhite' : 'bg-cDkWhite text-cDkBlack'
          }`}
          autoComplete='on'
        />
      </label>

      {!updateLoading && (
        <input type='submit' value='Alterar' className='btn' />
      )}
      {updateLoading && (
        <input
          type='submit'
          value='Alterando...'
          className='btn bg-cDkGray'
          disabled
        />
      )}
    </form>
  );
};

export default EditVideo;
