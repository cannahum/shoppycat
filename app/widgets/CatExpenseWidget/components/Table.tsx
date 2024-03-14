import React, { ChangeEventHandler } from 'react';

import { CatExpense } from '@/app/types/CatExpense';
import styles from '../styles.module.css';
import { useCatExpenseContext } from '../context';
import Expense from './Expense';

type TableProps = {};

const Table: React.FunctionComponent<TableProps> = function Table() {
  const { catExpenseStore: store, markCatExpenseForDeletion, unmarkCatExpenseForDeletion } = useCatExpenseContext();

  function toggleCheckbox(id: string): ChangeEventHandler {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.nativeEvent.preventDefault();
      if (e.currentTarget.checked) {
        markCatExpenseForDeletion(id)
      } else {
        unmarkCatExpenseForDeletion(id)
      }
    }
  }

  return (
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
        {store.expenses.map((ex: CatExpense) => (
          <Expense expense={ex} key={ex.id} toggleCheckbox={toggleCheckbox(ex.id)} />
        ))}
      </tbody>
    </table>
  )
}

export default Table;
