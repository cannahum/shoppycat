import React from 'react';

import Loader from '@/app/components/Loader';
import { CatExpenseCreateParameters } from '@/app/types/CatExpense';
import AddCatExpenseForm from './components/AddCatExpenseForm';
import CatExpenseTable from './components/Table';
import CatExpenseContextProvider, { useCatExpenseContext } from './context';
import styles from './styles.module.css'

type Resolver = CatExpenseCreateParameters | null;
type ResolverFunc = (value: Resolver | PromiseLike<Resolver>) => void;

function CatExpenseWidget(): JSX.Element {
  const { catExpenseStore: {
    fetchExpenseStatus,
    addExpenseStatus,
    deleteExpenseStatus,
  }, fetchCatExpenses, addCatExpense, deleteMarkedCatExpenses } = useCatExpenseContext();
  const addCatExpenseDialog = React.useRef<HTMLDialogElement | null>(null);
  const [showAddCatExpenseForm, setShowAddCatExpenseForm] = React.useState(false);
  const addCatExpenseResolver = React.useRef<ResolverFunc | null>(null);

  const isLoading = React.useMemo(() =>
    fetchExpenseStatus === 'loading' ||
    addExpenseStatus === 'loading' ||
    deleteExpenseStatus === 'loading',
    [fetchExpenseStatus, addExpenseStatus, deleteExpenseStatus]);

  React.useEffect(() => {
    fetchCatExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (showAddCatExpenseForm) {
      addCatExpenseDialog.current?.showModal();
    } else {
      addCatExpenseDialog.current?.close();
    }
  }, [showAddCatExpenseForm]);

  async function _submitCatExpenseForm(params: CatExpenseCreateParameters): Promise<void> {
    if (addCatExpenseResolver.current !== null) {
      await addCatExpense(params);
      addCatExpenseResolver.current(params);
    }
    setShowAddCatExpenseForm(false);
  }

  function _forceExitDialog() {
    addCatExpenseResolver.current !== null && addCatExpenseResolver.current(null);
    addCatExpenseResolver.current = null;
    setShowAddCatExpenseForm(false);
  }

  function _promptUserWithCatExpenseForm(): Promise<Resolver> {
    setShowAddCatExpenseForm(true);
    return new Promise<CatExpenseCreateParameters | null>(r => {
      addCatExpenseResolver.current = r;
    })
  }

  async function onAddExpenseClicked(e: React.MouseEvent) {
    e.preventDefault();
    await _promptUserWithCatExpenseForm();
  }

  function onDeleteExpenseClicked(e: React.MouseEvent) {
    e.preventDefault();
    deleteMarkedCatExpenses();
  }

  return (
    <>
      <dialog ref={addCatExpenseDialog} onCancel={_forceExitDialog}>
        {showAddCatExpenseForm && <AddCatExpenseForm submitCatExpenseForm={_submitCatExpenseForm} />}
      </dialog>
      <div className={styles.wrapper}>
        <div className={styles.controlPanel}>
          <button onClick={onAddExpenseClicked}>Add Expense</button>
          <button onClick={onDeleteExpenseClicked}>Delete Expense</button>
        </div>
        {isLoading ? <Loader /> : <CatExpenseTable />}
      </div>
    </>
  )
}

export default function CatExpenseWidgetWrapper(): JSX.Element {
  return (
    <CatExpenseContextProvider>
      <CatExpenseWidget />
    </CatExpenseContextProvider>
  )
}
