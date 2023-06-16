/* eslint-disable import/order */
/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import db from '../firebase/config';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  signOut,
  updatePassword,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';

import { setDoc, doc, Timestamp } from 'firebase/firestore';

import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  const auth = getAuth();
  auth.languageCode = 'pt-BR';
  const actionCodeSettings = {
    url: 'http://fabricadevs.com.br',
  };

  // Cleanup
  const [cancelled, setCancelled] = useState(false);

  const checkCancelled = () => {
    if (cancelled) {
      // eslint-disable-next-line no-useless-return
      return;
    }
  };

  // Register
  const createUser = async (data) => {
    checkCancelled();
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const newUser = {
        admin: false,
        name: data.displayName,
        email: data.email,
        createdAt: Timestamp.now(),
      };

      // Aiciona o usuario ao banco de dados com o mesmo UID da Auth
      await setDoc(doc(db, 'users', user.uid), newUser);
      await user.sendEmailVerification();
      setLoading(false);
    } catch (e) {
      let systemErrorMsg;

      if (e.message.includes('Password')) {
        systemErrorMsg = 'A senha precisa ter pelo menos 6 caracteres.';
      } else if (e.message.includes('email-already')) {
        systemErrorMsg = 'E-mail já cadastrado.';
      } else {
        systemErrorMsg = 'Ocorreu um erro, tente novamente mais tarde.';
      }
      setError(systemErrorMsg);
      setLoading(false);
    }
  };

  // Login
  const login = async (user) => {
    checkCancelled();
    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      setLoading(false);
      window.location.reload();
    } catch (e) {
      let systemErrorMsg;

      if (e.message.includes('wrong-password')) {
        systemErrorMsg = 'Senha incorreta.';
      } else if (e.message.includes('user-not-found')) {
        systemErrorMsg = 'Usuário não cadastrado.';
      } else {
        systemErrorMsg = 'Ocorreu um erro, tente novamente mais tarde.';
      }
      setError(systemErrorMsg);
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    checkCancelled();
    signOut(auth);
  };

  // Update User

  const updateUserImage = async (user, profileImage) => {
    checkCancelled();
    setLoading(true);

    try {
      await updateProfile(user, { photoURL: profileImage });
    } catch (e) {
      if (e.message.includes('login')) {
        setError(
          'Autenticação expirada, faça login novamente para poder alterar a imagem.'
        );
      } else {
        setError('Ocorreu um erro, tente novamente mais tarde.');
      }
      setLoading(false);
    }
  };

  const updateUserPassword = async (user, userPassword) => {
    checkCancelled();
    setLoading(true);

    try {
      await updatePassword(user, userPassword);
    } catch (e) {
      if (e.message.includes('login')) {
        setError(
          'Autenticação expirada, faça login novamente para poder alterar a senha.'
        );
      } else {
        setError('Ocorreu um erro, tente novamente mais tarde.');
      }
      setLoading(false);
    }
  };

  // Delete User
  const removeUser = async (userId) => {
    checkCancelled();
    setLoading(true);

    try {
      // const user =
      // deleteUser(user);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    checkCancelled();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setMessage(
        'E-mail de recuperação enviado com sucesso! Por favor, verifique a caixa de entrada ou spam.'
      );
      setLoading(false);
    } catch (e) {
      let systemErrorMsg;

      if (e.message.includes('user-not-found')) {
        systemErrorMsg = 'Usuário não encontrado.';
      } else {
        systemErrorMsg = 'Ocorreu um erro, tente novamente mais tarde.';
      }
      setError(systemErrorMsg);
      setLoading(false);
    }
  };

  const verifyEmail = async (user) => {
    setLoading(true);

    try {
      await sendEmailVerification(user, actionCodeSettings);
      setMessage(
        'E-mail de validação reenviado com sucesso. Por favor verifique sua caixa de entrada ou spam.'
      );
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    message,
    login,
    logout,
    updateUserPassword,
    updateUserImage,
    removeUser,
    resetPassword,
    verifyEmail,
  };
};
