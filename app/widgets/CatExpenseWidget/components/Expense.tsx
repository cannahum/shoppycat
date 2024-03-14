import { CatExpense } from '@/app/types/CatExpense';
import React, { ChangeEventHandler } from 'react';
import { useCatExpenseContext } from '../context';

type ExpenseProps = {
  expense: CatExpense;
  toggleCheckbox: ChangeEventHandler;
}
function Expense({ expense: ex, toggleCheckbox }: ExpenseProps): JSX.Element {
  const { catExpenseStore: { expensesMarkedForDeletion } } = useCatExpenseContext();
  const isChecked = React.useMemo(() => expensesMarkedForDeletion.has(ex.id), [ex, expensesMarkedForDeletion])

  React.useEffect(() => {
    console.log('this expense is checked: ', isChecked);
  }, [isChecked]);

  return (
    <tr>
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
