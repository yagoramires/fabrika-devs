// Icons
import { HiUser } from 'react-icons/hi';

// Hooks
import { useEffect, useState } from 'react';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useAuth } from '../../hooks/useAuth';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useUploadDocument } from '../../hooks/useUploadDocument';

const Profile = ({ user, darkMode }) => {
  const { document: userProfile } = useFetchDocument('users', user.uid);
  const { updateUserPassword, error: authError, updateUserImage } = useAuth();
  const { updateDocument, response } = useUpdateDocument('users');
  const {
    uploadDocument,
    // clearPaths,
    // error: uploadError,
    // message: uploadMessage,
    profileImageLoading,
    profileImageName,
    profileImagePath,
  } = useUploadDocument();

  const [userImage, setUserImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleProfileImageUpload = async () => {
    uploadDocument('usersProfileImage', userImage, user.uid);
  };

  useEffect(() => {
    if (userProfile) {
      if (userProfile.name) {
        setUserName(userProfile.name);
      }
      if (user.photoURL) {
        setUserImage(user.photoURL);
      }
      if (user.email) {
        setUserEmail(user.email);
      }
    }
  }, [userProfile]);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Por favor, insira senhas iguais.');
      return;
    }

    if (previewImage !== '' && profileImagePath === '') {
      setError('Por favor, faça o envio da imagem.');
      return;
    }

    const data = {
      name: userName,
      imageName: profileImageName,
    };

    updateDocument(user.uid, data);

    if (profileImagePath !== '') {
      updateUserImage(user, profileImagePath);
    }

    if (password === confirmPassword) {
      updateUserPassword(user, password);
    }

    // setMessage('Dados atualizados com sucesso.');
    // eslint-disable-next-line no-alert
    alert('Dados atualizados com sucesso.');

    setUserImage('');
    setUserName('');
    setUserEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    window.location.reload();
  };

  // Remove o erro da tela em 3s
  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  }, [error]);

  return (
    <div
      className={`w-full heightCalc  ${
        darkMode ? 'bg-cDkBlack' : 'bg-cWhite'
      }`}>
      <form
        onSubmit={handleSubmit}
        className='max-w-5xl mx-auto flex flex-col gap-4 items-center rounded-md p-4'>
        {previewImage && (
          <img
            src={URL.createObjectURL(previewImage)}
            alt='Preview'
            className='w-32 h-32 md:w-44 md:h-44 rounded-full shadow-md'
          />
        )}
        {userImage && !previewImage && (
          <img
            src={userImage}
            alt={userName}
            className='w-32 h-32 md:w-44 md:h-44 rounded-full shadow-md'
          />
        )}
        {!userImage && !previewImage && (
          <div className='w-32 h-32 md:w-44 md:h-44 rounded-full shadow-md flex justify-center items-center bg-cLtGray text-cDkGray'>
            <HiUser size={50} />
          </div>
        )}
        <label className='form-label' htmlFor='username'>
          <span
            className={`w-full font-bold ${
              darkMode ? 'text-cWhite' : 'text-cGreen '
            }`}>
            Nome:
          </span>
          <input
            className={`form-input ${
              darkMode ? 'bg-cLtBlack text-cWhite' : 'bg-cDkWhite text-cDkBlack'
            }`}
            name='username'
            type='text'
            value={userName || ''}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete='on'
          />
        </label>
        <label className='form-label' htmlFor='image'>
          <span
            className={`w-full font-bold ${
              darkMode ? 'text-cWhite' : 'text-cGreen '
            }`}>
            Foto de perfil:
          </span>
          <div className='flex items-center'>
            <input
              type='file'
              name='file'
              accept='image/*'
              id='inputFile'
              onChange={(e) => {
                setPreviewImage(e.target.files[0]);
                setUserImage(e.target.files[0]);
              }}
              className={`form-input text-sm max-w-full ${
                darkMode ? 'text-cWhite' : 'text-cLtBlack'
              }`}
              disabled={profileImagePath !== '' && userImage !== null}
            />
            {profileImagePath === '' && (
              <button
                type='button'
                onClick={handleProfileImageUpload}
                className={`text-left px-2 py-1 font-bold ml-10 b-1 ${
                  profileImageLoading
                    ? 'bg-cDkWhite'
                    : 'bg-cGreen hover:bg-cCian transition'
                } rounded-3xl text-cWhite shadow-md `}>
                {!profileImageLoading && 'Enviar'}
                {profileImageLoading && 'Enviando...'}
              </button>
            )}
          </div>
        </label>

        <label className='form-label' htmlFor='email'>
          <span
            className={`w-full font-bold ${
              darkMode ? 'text-cWhite' : 'text-cGreen '
            }`}>
            E-mail:
          </span>
          <input
            className={`form-input ${
              darkMode ? 'bg-cDkWhite' : 'bg-cLtBlack text-cWhite'
            }`}
            name='email'
            type='email'
            value={userEmail || ''}
            disabled
          />
        </label>
        <label className='form-label' htmlFor='password'>
          <span
            className={`w-full font-bold ${
              darkMode ? 'text-cWhite' : 'text-cGreen '
            }`}>
            Alterar senha:
          </span>
          <input
            className={`form-input ${
              darkMode ? 'bg-cLtBlack text-cWhite' : 'bg-cDkWhite text-cDkBlack'
            }`}
            name='password'
            type='password'
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='on'
          />
        </label>
        <label className='form-label' htmlFor='confirmPassword'>
          <span
            className={`w-full font-bold ${
              darkMode ? 'text-cWhite' : 'text-cGreen '
            }`}>
            Confirmar senha:
          </span>
          <input
            className={`form-input ${
              darkMode ? 'bg-cLtBlack text-cWhite' : 'bg-cDkWhite text-cDkBlack'
            }`}
            name='confirmPassword'
            type='password'
            value={confirmPassword || ''}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete='on'
          />
        </label>

        {!response.loading && !profileImageLoading && (
          <input type='submit' value='Atualizar dados' className='btn  mt-8' />
        )}
        {response.loading ||
          (profileImageLoading && (
            <input
              className='btn bg-cDkGray'
              type='submit'
              value='Atualizando'
              disabled
            />
          ))}
        {error && <p className='error'>{error}</p>}
        {/* {message && <p className='success'>{message}</p>} */}
      </form>
    </div>
  );
};

export default Profile;
