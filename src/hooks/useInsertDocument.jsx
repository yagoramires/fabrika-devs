import { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import db from '../firebase/config';

export const useInsertDocument = (docCollection) => {
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

  const insertDocument = async (document) => {
    checkCanceled();
    setLoading(true);

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };
      await addDoc(collection(db, docCollection), newDocument);
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

  return { insertDocument, loading, error };
};
