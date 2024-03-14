import React from 'react';

import styles from '../styles.module.css';
import { Configuration, FactsApi } from '@/app/lib';

function RandomFact() {
  const [f, sf] = React.useState<string>('');

  React.useEffect(() => {
    const abort = new AbortController();
    const signal = abort.signal;

    const fetchFact = async () => {
      const randomClient = new FactsApi(
        new Configuration({ basePath: 'https://catfact.ninja' })
      );
      try {
        const fact = await randomClient.getRandomFact(undefined, { signal });
        sf(fact.fact || '');
      } catch (e) {
        console.warn('error fetching random fact', e)
      }
    };
    fetchFact();
    return () => abort.abort();
  }, []);
  return (
    <div className={styles.randomFactWrapper}>
      <span className={styles.randomFactTitle}>Random cat fact:</span>
      <span className={styles.randomFact}>{f}</span>
    </div>

  )
}

export default RandomFact;
