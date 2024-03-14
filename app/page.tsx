'use client';

import styles from "./page.module.css";
import CatExpenseWidget from "./widgets/CatExpenseWidget";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Created by Can (a.k.a. Jon) for <code>EarnIn</code>
        </p>
        <div>
          <a
            href="https://github.com/cannahum/shoppycat"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit the GitHub Repository
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <CatExpenseWidget />
      </div>
    </main>
  );
}
