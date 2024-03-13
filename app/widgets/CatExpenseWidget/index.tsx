'use client'

import React from 'react';
import styles from './styles.module.css'
import CatExpenseContextProvider from './context';

export default function CatExpenseWidget(): JSX.Element {
  function toggleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    // implement me
  }

  function onAddExpenseClicked(e: React.MouseEvent) {
    e.preventDefault();
    // implement me
  }

  function onDeleteExpenseClicked(e: React.MouseEvent) {
    e.preventDefault();
    // implement me
  }

  return (
    <CatExpenseContextProvider>
      <div className={styles.wrapper}>
        <div className={styles.controlPanel}>
          <button onClick={onAddExpenseClicked}>Add Expense</button>
          <button onClick={onDeleteExpenseClicked}>Delete Expense</button>
        </div>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th />
              <th>Item</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            <tr>
              <td><input type="checkbox" onChange={toggleCheckbox} /></td>
              <td>Cat food</td>
              <td>Food</td>
              <td>Amount</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CatExpenseContextProvider>
  )
}
