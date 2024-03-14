import React, { ChangeEventHandler } from 'react';

import { CatExpense } from '@/app/types/CatExpense';
import { useCatExpenseContext } from '../context';
import styles from '../styles.module.css';

type ExpenseProps = {
  expense: CatExpense;
  toggleCheckbox: ChangeEventHandler;
  isCategoryWinner: boolean;
}
function Expense({ expense: ex, toggleCheckbox, isCategoryWinner }: ExpenseProps): JSX.Element {
  const { catExpenseStore: { expensesMarkedForDeletion } } = useCatExpenseContext();
  const isChecked = React.useMemo(() => expensesMarkedForDeletion.has(ex.id), [ex, expensesMarkedForDeletion])

  return (
    <tr className={isCategoryWinner ? styles.categoryWinner : ''}>
      <td>
        <input type="checkbox"
          key={Math.random()}
          onChange={toggleCheckbox}
          checked={isChecked} />
      </td>
      <td>{ex.itemName}</td>
      <td>{ex.category}</td>
      <td>{ex.amount}</td>
    </tr>
  )
}

export default Expense;
