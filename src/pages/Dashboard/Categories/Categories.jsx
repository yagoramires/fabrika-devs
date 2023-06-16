// Icons
import { BsPlusLg } from 'react-icons/bs';

// Hooks
import { useState } from 'react';
import { useFetchDocuments } from '../../../hooks/useFetchDocuments';

// Components
import AddCategory from '../../../components/AddModal/AddCategory/AddCategory';
import EditCategory from '../../../components/EditModal/EditCategory/EditCategory';
import CategoriesList from '../../../components/Lists/Categories/Categories';

const Categories = ({ darkMode }) => {
  const { documents: categories } = useFetchDocuments('categories');

  const [activeAdd, setActiveAdd] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);

  const [category, setCategory] = useState({});

  if (categories === null) {
    return <p> Carregando ...</p>;
  }

  return (
    <div
      className={`p-4 flex flex-col heightCalc ${
        darkMode ? 'bg-cDkBlack' : 'bg-cWhite'
      }`}>
      <button
        type='button'
        onClick={() => setActiveAdd(!activeAdd)}
        className='cursor-pointer bg-cGreen text-cWhite px-8 w-40 py-2  shadow-md my-4 font-bold rounded-3xl flex items-center justify-between text-2xl self-end '>
        Nova <BsPlusLg className='text-xl font-bold' />
      </button>

      <div
        className={`${
          activeAdd
            ? 'absolute w-full h-[100vh] bg-cBlackTransp transp top-0 left-0'
            : 'hidden'
        }`}>
        <AddCategory
          setActive={setActiveAdd}
          categories={categories}
          darkMode={darkMode}
        />
      </div>
      <div
        className={`${
          activeEdit
            ? 'absolute w-full h-[100vh] bg-cBlackTransp transp top-0 left-0'
            : 'hidden'
        }`}>
        <EditCategory
          setActive={setActiveEdit}
          category={category}
          darkMode={darkMode}
        />
      </div>

      <CategoriesList
        categories={categories}
        setActive={setActiveEdit}
        setCategory={setCategory}
        darkMode={darkMode}
      />
    </div>
  );
};

export default Categories;
