// Routes
import { Link } from 'react-router-dom';

// Hooks
import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useFetchDocuments } from '../../../hooks/useFetchDocuments';

const Register = ({ darkMode }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const { documents: users } = useFetchDocuments('mailslist');

  const { createUser, error: authError, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      displayName,
      email,
      password,
    };

    const validateMail = users.filter((usr) => usr.email === email);
    if (validateMail.length === 0) {
      setError('Seu e-mail não está incluido na lista de usuários permitidos');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas precisam ser iguais.');
      return;
    }

    await createUser(user);
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    window.location.reload();
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }, [error]);

  return (
    <div
      className={`heightCalc flex flex-col items-center justify-center w-full p-4 ${
        darkMode ? 'bg-cDkBlack' : 'bg-cWhite'
      }`}>
      <form
        onSubmit={handleSubmit}
        className={`form ${darkMode ? 'bg-cLtBlack' : 'bg-cDkWhite'}`}>
        <h1
          className={`text-2xl text-center mb-5 font-bold ${
            darkMode ? 'text-cWhite' : 'text-cGreen'
          }`}>
          Cadastre-se para acessar o conteúdo
        </h1>

        <label htmlFor='displayName' className='form-label'>
          <span
            className={`font-bold  ${
              darkMode ? 'text-cWhite' : 'text-cGreen'
            }`}>
            Nome:
          </span>
          <input
            type='text'
            name='displayName'
            required
            value={displayName || ''}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder='Digite seu nome'
            className={`form-input ${
              darkMode ? 'bg-cDkBlack text-cWhite' : 'bg-cWhite text-cDkBlack'
            }`}
            autoComplete='on'
          />
        </label>
        <label htmlFor='email' className='form-label'>
          <span
            className={`font-bold  ${
              darkMode ? 'text-cWhite' : 'text-cGreen'
            }`}>
            E-mail:
          </span>
          <input
            type='email'
            name='email'
            required
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Digite seu e-mail'
            className={`form-input ${
              darkMode ? 'bg-cDkBlack text-cWhite' : 'bg-cWhite text-cDkBlack'
            }`}
            autoComplete='on'
          />
        </label>
        <label htmlFor='password' className='form-label'>
          <span
            className={`font-bold  ${
              darkMode ? 'text-cWhite' : 'text-cGreen'
            }`}>
            Senha:
          </span>
          <input
            type='password'
            name='password'
            required
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Digite sua senha'
            className={`form-input ${
              darkMode ? 'bg-cDkBlack text-cWhite' : 'bg-cWhite text-cDkBlack'
            }`}
            autoComplete='on'
          />
        </label>
        <label htmlFor='confirmPassword' className='form-label'>
          <span
            className={`font-bold  ${
              darkMode ? 'text-cWhite' : 'text-cGreen'
            }`}>
            Confirmação de senha:
          </span>

          <input
            type='password'
            name='confirmPassword'
            required
            value={confirmPassword || ''}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirme sua senha'
            className={`form-input ${
              darkMode ? 'bg-cDkBlack text-cWhite' : 'bg-cWhite text-cDkBlack'
            }`}
            autoComplete='on'
          />
        </label>
        {loading && (
          <input
            type='submit'
            value='Registrando...'
            className='btn btn-disabled md:mt-8'
            disabled
          />
        )}
        {!loading && (
          <input type='submit' value='Registrar' className='btn md:mt-8' />
        )}
        {error && <p className='error'>{error}</p>}
        <p
          className={`flex gap-4 ${
            darkMode ? 'text-cWhite' : 'text-cLtBlack'
          }`}>
          Já possui uma conta?
          <Link to='/' className='text-cGreen font-bold hover:text-cCian'>
            Entre
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
