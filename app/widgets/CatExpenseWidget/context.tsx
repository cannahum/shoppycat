import React from 'react';

import { CatExpenseCreateParameters } from '@/app/types/CatExpense';
import reducer, { CatExpenseActionCreatorType, CatExpenseStoreType, initialState } from './store';

type CatExpenseContextType = {
  catExpenseStore: CatExpenseStoreType,
  fetchCatExpenses: () => void;
  addCatExpense: (_: CatExpenseCreateParameters) => Promise<void>;
  markCatExpenseForDeletion: (id: string) => void;
  unmarkCatExpenseForDeletion: (id: string) => void;
  deleteMarkedCatExpenses: () => Promise<void>;
}

const CatExpenseContext = React.createContext<CatExpenseContextType>({
  catExpenseStore: {} as CatExpenseStoreType,
  fetchCatExpenses: () => { },
  addCatExpense: (_: CatExpenseCreateParameters) => Promise.resolve(),
  markCatExpenseForDeletion: (_: string) => { },
  unmarkCatExpenseForDeletion: (_: string) => { },
  deleteMarkedCatExpenses: () => Promise.resolve(),
});

type CatExpenseContextProviderProps = {
  children: React.ReactNode;
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

  async function addCatExpense(exp: CatExpenseCreateParameters): Promise<void> {
    dispatch({
      type: 'addRequested',
    })
    // mimic an API or DB interaction
    return new Promise(r => {
      setTimeout(() => {
        dispatch({
          type: 'addSuccess',
          payload: {
            expense: {
              ...exp,
              id: crypto.randomUUID(),
            }
          }
        });
        r();
      }, 1000);
    })
  }

  function markCatExpenseForDeletion(id: string) {
    dispatch({
      type: 'markForDeletion',
      payload: {
        id,
      }
    })
  }

  function unmarkCatExpenseForDeletion(id: string) {
    dispatch({
      type: 'unmarkForDeletion',
      payload: {
        id,
      }
    })
  }

  async function deleteMarkedCatExpenses(): Promise<void> {
    // mimic an API or DB interaction
    dispatch({
      type: 'deleteRequested',
    })
    return new Promise(r => {
      setTimeout(() => {
        dispatch({
          type: 'deleteSuccess',
        });
        r();
      }, 1000);
    });
  }

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
