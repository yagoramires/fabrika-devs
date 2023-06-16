import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase/config';

export const useFetchDocument = (docCollection, id) => {
  // Documents States
  const [document, setDocument] = useState(null);

  // Message states
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Cleanup (Evita o memory leak)
  const [canceled, setCanceled] = useState(false);

  // Ao sair da fução irá executar o cleanup
  useEffect(() => {
    async function loadDocument() {
      if (canceled) {
        return;
      }
      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id);

        const docSnapshot = await getDoc(docRef);

        setDocument(docSnapshot.data());

        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    }

    loadDocument();
  }, [docCollection, canceled]);

  useEffect(() => {
    return () => {
      setCanceled(true);
    };
  }, []);

  return { document, loading, error };
};
