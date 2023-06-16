// Icons
import { BiX } from 'react-icons/bi';

// Hooks
import React, { useEffect, useState } from 'react';
import { useInsertDocument } from '../../../hooks/useInsertDocument';

const AddCategory = ({ setActive, categories, darkMode }) => {
  const { insertDocument } = useInsertDocument('categories');

  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      order: categories.length + 1,
      name: newCategory.toUpperCase(),
    };

    if (categories) {
      const filter = categories.filter(
        (category) => category.name === newCategory
      );

      if (filter.length >= 1) {
        setError('Categoria já existe!');
        return;
      }
    }

    if (newCategory === '') {
      setError('Insira uma categoria!');
      return;
    }

    if (newCategory !== '') {
      insertDocument(data);
    }

    setNewCategory('');
    setActive(false);
  };

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
      className={`form mt-60 md:mt-0 max-w-[90%] md:w-[90%] md:max-w-5xl mx-auto rounded-md ${
        darkMode ? 'bg-cLtBlack' : 'bg-cWhite'
      }`}>
      <div
        className={`flex justify-between items-center  w-full mx-auto text-2xl  font-bold ${
          darkMode ? 'text-cWhite' : 'text-cGreen '
        }`}>
        <h1 className='text-center'>Adicionar categoria</h1>
        <BiX
          className='text-3xl cursor-pointer'
          onClick={() => setActive(false)}
        />
      </div>
      <label htmlFor='newCategory' className='form-label'>
        <span
          className={`w-full font-bold ${
            darkMode ? 'text-cWhite' : 'text-cGreen '
          }`}>
          Nova categoria:
        </span>
        <input
          type='text'
          value={newCategory || ''}
          onChange={(e) => setNewCategory(e.target.value)}
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

export default AddCategory;
