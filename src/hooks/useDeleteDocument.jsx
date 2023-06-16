import { useState, useEffect } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';

import db from '../firebase/config';

export const useDeleteDocument = (docCollection) => {
  // Message states
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Cleanup (Evita o memory leak)
  const [canceled, setCanceled] = useState(false);
  const checkCanceled = () => {
    if (canceled) {
      return;
    }
  };

  const deleteVideo = async (id, videoName, fileName = null) => {
    checkCanceled();
    setLoading(true);

    try {
      // Remover da FireStore
      await deleteDoc(doc(db, docCollection, id));

      // Remover da Storage
      const storage = getStorage();
      const videoRef = ref(storage, videoName);
      await deleteObject(videoRef);
      if (fileName !== null) {
        const fileRef = ref(storage, fileName);
        await deleteObject(fileRef);
      }
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const deleteDocument = async (id) => {
    checkCanceled();
    setLoading(true);

    try {
      // Remover da FireStore
      await deleteDoc(doc(db, docCollection, id));
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    checkCanceled();
    setLoading(true);

    try {
      // Remover da FireStore
      await deleteDoc(doc(db, docCollection, id));
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  // Ao sair da fução irá executar o cleanup
  useEffect(() => {
    return () => {
      setCanceled(true);
    };
  }, []);

  return { deleteDocument, deleteVideo, deleteUser, loading, error };
};
