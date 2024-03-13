import React from 'react';

import { CatExpense } from '@/app/types/CatExpense';
import styles from '../styles.module.css';
import { useCatExpenseContext } from '../context';

type TableProps = {};

const Table: React.FunctionComponent<TableProps> = function Table(props) {
  const { catExpenseStore: store } = useCatExpenseContext();

  function toggleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    // implement me
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
          <tr key={ex.id}>
            <td><input type="checkbox" onChange={toggleCheckbox} /></td>
            <td>{ex.itemName}</td>
            <td>{ex.category}</td>
            <td>{ex.amount}</td>
          </tr>

        ))}
      </tbody>
    </table>
  )
}

export default Table;
