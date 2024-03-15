import React from 'react';

import styles from '../styles.module.css';
import { Configuration, FactsApi } from '@/app/lib/catfact';
import Loader from '@/app/components/Loader';

function RandomFact() {
  const [loading, setLoading] = React.useState(false);
  const [f, sf] = React.useState<string>('');

  React.useEffect(() => {
    const abort = new AbortController();
    const signal = abort.signal;

    const fetchFact = async () => {
      setLoading(true);
      const randomClient = new FactsApi(
        new Configuration({ basePath: 'https://catfact.ninja' })
      );
      try {
        const fact = await randomClient.getRandomFact(undefined, { signal });
        sf(fact.fact || '');
      } catch (e) {
        console.warn('error fetching random fact', e)
      } finally {
        setLoading(false);
      }
    };
    fetchFact();
    return () => abort.abort();
  }, []);
  return (
    <div className={styles.randomFactWrapper}>
      <span className={styles.randomFactTitle}>Random cat fact:</span>
      {loading ? (<Loader />) : (
        <span className={styles.randomFact}>{f}</span>

      )}
    </div>

  )
}

export default RandomFact;
