import React from 'react';

import { CatExpense, CatExpenseCreateParameters } from '@/app/types/CatExpense';
import reducer, { CatExpenseActionCreatorType, CatExpenseStoreType, initialState } from './store';

type CatExpenseContextType = {
  catExpenseStore: CatExpenseStoreType,
  fetchCatExpenses: () => void;
  addCatExpense: (_: CatExpenseCreateParameters) => void;
  markCatExpenseForDeletion: (id: string) => void;
  unmarkCatExpenseForDeletion: (id: string) => void;
  deleteMarkedCatExpenses: () => void;
}

const CatExpenseContext = React.createContext<CatExpenseContextType>({
  catExpenseStore: {} as CatExpenseStoreType,
  fetchCatExpenses: () => { },
  addCatExpense: (_: CatExpenseCreateParameters) => { },
  markCatExpenseForDeletion: (_: string) => { },
  unmarkCatExpenseForDeletion: (_: string) => { },
  deleteMarkedCatExpenses: () => { },
});

type CatExpenseContextProviderProps = {
  children: React.ReactNode;
  // ...
}

export function useCatExpenseContext() {
  const s = React.useContext(CatExpenseContext);
  if (s === undefined) {
    throw new Error('useCatExpenseContext has been used outside of CatExpenseContextProvider');
  }
  return s;
}

const CatExpenseContextProvider: React.FunctionComponent<CatExpenseContextProviderProps> = function CatExpenseContextProvider({ children }): JSX.Element {
  const [catExpenseStore, dispatch] = React.useReducer<React.Reducer<CatExpenseStoreType, CatExpenseActionCreatorType>>(reducer, initialState())

  function fetchCatExpenses() {
    dispatch({
      type: 'fetchRequested'
    });
  }

  function addCatExpense(exp: CatExpense) {

  }

  function markCatExpenseForDeletion(id: string) { }

  function unmarkCatExpenseForDeletion(id: string) { }

  function deleteMarkedCatExpenses() { }

  return <CatExpenseContext.Provider value={{
    catExpenseStore,
    fetchCatExpenses,
    addCatExpense,
    markCatExpenseForDeletion,
    unmarkCatExpenseForDeletion,
    deleteMarkedCatExpenses,
  }}>{children}</CatExpenseContext.Provider>
}

export default CatExpenseContextProvider;
