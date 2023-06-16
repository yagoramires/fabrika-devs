import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

export const useUploadDocument = () => {
  // Message states
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [progress, setProgress] = useState(null);

  // Loading States
  const [fileLoading, setFileLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [profileImageLoading, setProfilImageLoading] = useState(false);

  // Path States
  const [filePath, setFilePath] = useState('');
  const [videoPath, setVideoPath] = useState('');
  const [profileImagePath, setProfileImagePath] = useState('');

  // Name States
  const [fileName, setFileName] = useState('');
  const [videoName, setVideoName] = useState('');
  const [profileImageName, setProfileImageName] = useState('');

  // Cleanup (Evita o memory leak)
  const [canceled, setCanceled] = useState(false);
  const checkCanceled = () => {
    if (canceled) {
      return;
    }
  };

  // Função que envia o arquivo para a Storage do Firebase
  const uploadDocument = (collection, file, user = null) => {
    checkCanceled();
    if (collection === 'files') {
      setFileLoading(true);
    } else if (collection === 'videos') {
      setVideoLoading(true);
    } else if (collection === 'usersProfileImage') {
      setProfilImageLoading(true);
    }

    // Se for vazio, retorna um erro
    if (file === null) {
      setError('Envie um arquivo!');
      if (collection === 'files') {
        setFileLoading(false);
      } else if (collection === 'videos') {
        setVideoLoading(false);
      } else if (collection === 'usersProfileImage') {
        setProfilImageLoading(false);
      }
      return;
    }

    // Método do FB para acessar a storage
    const storage = getStorage();
    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    let generateName;
    if (user) {
      generateName = `${collection}/${user}/${Date.now()}${v4()}`;
    } else {
      generateName = `${collection}/${Date.now()}${v4()}`;
    }
    // Referencia da Storage, passando a coleção e o nome do arquivo que será inserido
    const storageRef = ref(storage, generateName);
    // Método do FB para Enviar o arquivo, passando a referencia e o arquivo
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Observa mudanças no estado, erros e a finalização do upload
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Pega o progresso do upload, incluindo o numero de bytes enviados e o total enviado

        const progressStatus =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(`Progresso: ${progressStatus} % completo`);
        switch (snapshot.state) {
          case 'paused':
            setMessage('Envio pausado');
            break;

          default:
            setMessage('Enviando ...');
            break;
        }
      },
      (e) => {
        // Lista completa de erros
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (e.code) {
          case 'storage/unauthorized':
            setError('O usuário não tem autorização para acessar o objeto.');
            if (collection === 'files') {
              setFileLoading(false);
            } else if (collection === 'videos') {
              setVideoLoading(false);
            } else if (collection === 'usersProfileImage') {
              setProfilImageLoading(false);
            }
            break;
          case 'storage/canceled':
            setError('O usuário cancelou o upload');
            if (collection === 'files') {
              setFileLoading(false);
            } else if (collection === 'videos') {
              setVideoLoading(false);
            } else if (collection === 'usersProfileImage') {
              setProfilImageLoading(false);
            }
            break;
          default:
            setError('Ocorreu um erro, tente novamente.');
            if (collection === 'files') {
              setFileLoading(false);
            } else if (collection === 'videos') {
              setVideoLoading(false);
            } else if (collection === 'usersProfileImage') {
              setProfilImageLoading(false);
            }
            break;
        }
      },
      async () => {
        // Upload completo, agora pegamos a URL
        const res = await getDownloadURL(uploadTask.snapshot.ref);

        if (collection === 'files') {
          setFilePath(res);
          setFileName(generateName);
        }
        if (collection === 'videos') {
          setVideoPath(res);
          setVideoName(generateName);
        }
        if (collection === 'usersProfileImage') {
          setProfileImagePath(res);
          setProfileImageName(generateName);
        }

        if (collection === 'files') {
          setFileLoading(false);
        } else if (collection === 'videos') {
          setVideoLoading(false);
        } else if (collection === 'usersProfileImage') {
          setProfilImageLoading(false);
        }
      }
    );
  };

  // Limpar Paths
  const clearPaths = () => {
    setFilePath('');
    setVideoPath('');
    setProfileImagePath('');
  };

  // Ao sair da fução irá executar o cleanup
  useEffect(() => {
    return () => {
      setCanceled(true);
    };
  }, []);

  return {
    uploadDocument,
    clearPaths,
    error,
    message,
    progress,
    fileLoading,
    videoLoading,
    filePath,
    videoPath,
    fileName,
    videoName,
    profileImageLoading,
    profileImagePath,
    profileImageName,
  };
};
