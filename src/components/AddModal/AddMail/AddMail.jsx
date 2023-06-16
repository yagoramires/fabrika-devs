// Icons
import { BiX } from 'react-icons/bi';

// Hooks
import { useEffect, useState } from 'react';
import { useInsertDocument } from '../../../hooks/useInsertDocument';

const AddMail = ({ setActive, mails, darkMode }) => {
  const { insertDocument } = useInsertDocument('mailslist');

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mails) {
      const allMails = mails.filter((mail) => mail === email);

      if (allMails.length > 0) {
        setError('E-mail já cadastrado!');
        return;
      }
    }

    if (email === '') {
      setError('Insira uma e-mail!');
      return;
    }

    const data = {
      order: mails.length + 1,
      email: email.toLowerCase(),
    };

    if (email !== '') {
      insertDocument(data);
    }

    setEmail('');
    setActive(false);
  };

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

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
        className={`flex justify-between items-center  w-full mx-auto text-2xl font-bold ${
          darkMode ? 'text-cWhite' : 'text-cGreen'
        }`}>
        <h1 className=' text-center'>Adicionar e-mail</h1>
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
          Novo usuário:
        </span>
        <input
          type='email'
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
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

export default AddMail;
