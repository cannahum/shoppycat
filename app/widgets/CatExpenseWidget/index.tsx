import React from 'react';

import styles from './styles.module.css'
import { useCatExpenseContext } from './context';
import Table from './components/Table';
import { CatExpenseCreateParameters } from '@/app/types/CatExpense';
import AddCatExpenseForm from './components/AddCatExpenseForm';
import Loader from '@/app/components/Loader';

type Resolver = CatExpenseCreateParameters | null;
type ResolverFunc = (value: Resolver | PromiseLike<Resolver>) => void;

export default function CatExpenseWidget(): JSX.Element {
  const { catExpenseStore: {
    fetchExpenseStatus,
    addExpenseStatus,
    deleteExpenseStatus,
  }, addCatExpense, deleteMarkedCatExpenses } = useCatExpenseContext();
  const addCatExpenseDialog = React.useRef<HTMLDialogElement | null>(null);
  const [showAddCatExpenseForm, setShowAddCatExpenseForm] = React.useState(false);
  const addCatExpenseResolver = React.useRef<ResolverFunc | null>(null);

  const isLoading = React.useMemo(() =>
    fetchExpenseStatus === 'loading' ||
    addExpenseStatus === 'loading' ||
    deleteExpenseStatus === 'loading',
    [fetchExpenseStatus, addExpenseStatus, deleteExpenseStatus]);

  React.useEffect(() => {
    if (showAddCatExpenseForm) {
      addCatExpenseDialog.current?.showModal();
    } else {
      addCatExpenseDialog.current?.close();
    }
  }, [showAddCatExpenseForm]);

  async function submitCatExpenseForm(params: CatExpenseCreateParameters): Promise<void> {
    if (addCatExpenseResolver.current !== null) {
      await addCatExpense(params);
      addCatExpenseResolver.current(params);
    }
    setShowAddCatExpenseForm(false);
  }

  function forceExitDialog() {
    addCatExpenseResolver.current !== null && addCatExpenseResolver.current(null);
    addCatExpenseResolver.current = null;
    setShowAddCatExpenseForm(false);
  }

  function promptUserWithCatExpenseForm(): Promise<Resolver> {
    setShowAddCatExpenseForm(true);
    return new Promise<CatExpenseCreateParameters | null>(r => {
      addCatExpenseResolver.current = r;
    })
  }

  async function onAddExpenseClicked(e: React.MouseEvent) {
    e.preventDefault();
    await promptUserWithCatExpenseForm();
  }

  function onDeleteExpenseClicked(e: React.MouseEvent) {
    e.preventDefault();
    deleteMarkedCatExpenses();
  }

  return (
    <>
      <dialog ref={addCatExpenseDialog} onCancel={forceExitDialog}>
        {showAddCatExpenseForm && <AddCatExpenseForm submitCatExpenseForm={submitCatExpenseForm} />}
      </dialog>
      <div className={styles.wrapper}>
        <div className={styles.controlPanel}>
          <button onClick={onAddExpenseClicked}>Add Expense</button>
          <button onClick={onDeleteExpenseClicked}>Delete Expense</button>
        </div>
        {isLoading ? <Loader /> : <Table />}
      </div>
    </>
  )
}
