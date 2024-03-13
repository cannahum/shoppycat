import React from 'react';
import reducer, { CatExpenseActionCreatorType, CatExpenseStoreType, initialState } from './store';
import CatExpense from '@/app/types/CatExpense';

const CatExpenseContext = React.createContext({
  catExpenseStore: {},
  fetchCatExpenses: () => { },
  addCatExpense: (_: CatExpense) => { },
  deleteCatExpense: (_: CatExpense) => { },
});

type CatExpenseContextProviderProps = {
  children: React.ReactNode;
  // ...
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

  function deleteCatExpense(exp: CatExpense) {

  }

  return <CatExpenseContext.Provider value={{
    catExpenseStore,
    fetchCatExpenses,
    addCatExpense,
    deleteCatExpense
  }}>{children}</CatExpenseContext.Provider>
}

export default CatExpenseContextProvider;
