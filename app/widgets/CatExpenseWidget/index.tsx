'use client'

import React from 'react';

import styles from './styles.module.css'
import CatExpenseContextProvider, { useCatExpenseContext } from './context';
import Table from './components/Table';
import { CatExpenseCreateParameters } from '@/app/types/CatExpense';
import AddCatExpenseForm from './components/AddCatExpenseForm';

type Resolver = CatExpenseCreateParameters | null;
type ResolverFunc = (value: Resolver | PromiseLike<Resolver>) => Promise<void>;

export default function CatExpenseWidget(): JSX.Element {
  const { addCatExpense, deleteMarkedCatExpenses } = useCatExpenseContext();
  const addCatExpenseDialog = React.useRef<HTMLDialogElement | null>(null);
  const [showAddCatExpenseForm, setShowAddCatExpenseForm] = React.useState(false);
  const addCatExpenseResolver = React.useRef<ResolverFunc | null>(null);

  React.useEffect(() => {
    if (showAddCatExpenseForm) {
      addCatExpenseDialog.current?.showModal();
    } else {
      addCatExpenseDialog.current?.close();
    }
  }, [showAddCatExpenseForm]);

  async function submitCatExpenseForm(params: CatExpenseCreateParameters) {
    if (addCatExpenseResolver.current !== null) {
      await addCatExpenseResolver.current(params)
      addCatExpenseResolver.current = null;
    }
    setShowAddCatExpenseForm(false);
  }

  function forceExitDialog() {
    addCatExpenseResolver.current = null;
  }

  function promptUserWithCatExpenseForm(): Promise<Resolver> {
    setShowAddCatExpenseForm(true);
    return new Promise<CatExpenseCreateParameters | null>(r => {
      addCatExpenseResolver.current = r;
    })
  }

  async function onAddExpenseClicked(e: React.MouseEvent) {
    e.preventDefault();
    const proposedCatExpense = await promptUserWithCatExpenseForm();
    if (proposedCatExpense !== null) {
      addCatExpense(proposedCatExpense);
    }
  }

  function onDeleteExpenseClicked(e: React.MouseEvent) {
    e.preventDefault();
    deleteMarkedCatExpenses();
  }

  return (
    <CatExpenseContextProvider>
      <dialog ref={addCatExpenseDialog} onCancel={forceExitDialog}>
        {showAddCatExpenseForm && <AddCatExpenseForm submitCatExpenseForm={submitCatExpenseForm} />}
      </dialog>
      <div className={styles.wrapper}>
        <div className={styles.controlPanel}>
          <button onClick={onAddExpenseClicked}>Add Expense</button>
          <button onClick={onDeleteExpenseClicked}>Delete Expense</button>
        </div>
        <Table />
      </div>
    </CatExpenseContextProvider>
  )
}
