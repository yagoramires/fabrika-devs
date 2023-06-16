// Icons
import { BiX } from 'react-icons/bi';

// Hooks
import React, { useEffect, useState } from 'react';
import { useUpdateDocument } from '../../../hooks/useUpdateDocument';

const EditCategory = ({ setActive, category, darkMode }) => {
  const { updateDocument } = useUpdateDocument('categories');

  const [newCategory, setNewCategory] = useState('');
  const [order, setOrder] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      order,
      name: newCategory.toUpperCase(),
    };

    if (newCategory === '') {
      setError('Insira uma categoria!');
      return;
    }

    if (newCategory !== '') {
      updateDocument(category.id, data);
    }

    setNewCategory('');
    setActive(false);
  };

  useEffect(() => {
    if (category) {
      setNewCategory(category.name);
      setOrder(category.order);
    }
  }, [category]);

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
      className={`form  mt-60 md:mt-0 max-w-[90%] md:w-[90%] md:max-w-5xl mx-auto rounded-md ${
        darkMode ? 'bg-cLtBlack' : 'bg-cWhite'
      }`}>
      <div
        className={`flex justify-between items-center  w-full mx-auto text-2xl  font-bold ${
          darkMode ? 'text-cWhite' : 'text-cGreen '
        }`}>
        <h1 className=' text-center'>Editar categoria</h1>
        <BiX
          className='text-3xl cursor-pointer'
          onClick={() => setActive(false)}
        />
      </div>
      <label htmlFor='newCategory' className='form-label'>
        <span
          className={`w-full font-bold ${
            darkMode ? 'text-cWhite' : 'text-cGreen'
          }`}>
          Nome da categoria:
        </span>
        <input
          type='text'
          name='newCategory'
          value={newCategory || ''}
          onChange={(e) => setNewCategory(e.target.value)}
          className={`form-input ${
            darkMode ? 'bg-cDkBlack text-cWhite' : 'bg-cDkWhite text-cDkBlack'
          }`}
        />
      </label>
      <label htmlFor='order' className='form-label'>
        <span
          className={`w-full font-bold ${
            darkMode ? 'text-cWhite' : 'text-cGreen'
          }`}>
          Ordem:
        </span>
        <input
          type='text'
          name='order'
          value={order || ''}
          onChange={(e) => setOrder(e.target.value)}
          className={`form-input ${
            darkMode ? 'bg-cDkBlack text-cWhite' : 'bg-cDkWhite text-cDkBlack'
          }`}
        />
      </label>
      <input type='submit' value='Adicionar' className='btn' />
      {error && <p className='error'>{error}</p>}
    </form>
  );
};

export default EditCategory;
