import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  //   where,
} from 'firebase/firestore';
import db from '../firebase/config';

export const useFetchDocuments = (docCollection, search = null) => {
  // Documents States
  const [documents, setDocuments] = useState(null);

  // Message states
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Cleanup (Evita o memory leak)
  const [canceled, setCanceled] = useState(false);

  // Ao sair da fução irá executar o cleanup
  useEffect(() => {
    async function loadData() {
      if (canceled) {
        return;
      }
      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;
        if (docCollection === 'videos') {
          q = await query(collectionRef, orderBy('category', 'asc'));
        } else {
          q = await query(collectionRef, orderBy('createdAt', 'desc'));
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    }

    loadData();
  }, [docCollection, search, canceled]);

  useEffect(() => {
    return () => {
      setCanceled(true);
    };
  }, []);

  return { documents, loading, error };
};
