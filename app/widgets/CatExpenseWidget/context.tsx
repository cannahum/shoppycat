import React from 'react';

import { CatExpenseCreateParameters } from '@/app/types/CatExpense';
import reducer, { CatExpenseActionCreatorType, CatExpenseStoreType, initialState } from './store';

const API_DURATION = 1000;
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

  function fetchCatExpenses(): Promise<void> {
    dispatch({
      type: 'fetchRequested'
    });
    return new Promise((r) => {
      setTimeout(() => {
        dispatch({
          type: 'fetchSuccess',
          payload: {
            expenses: [
              {
                id: crypto.randomUUID(),
                amount: 10,
                category: 'Food',
                itemName: 'Whiskers Cat food'
              },
              {
                id: crypto.randomUUID(),
                amount: 500,
                category: 'Furniture',
                itemName: 'Self cleaning cat Litter box',
              },
              {
                id: crypto.randomUUID(),
                amount: 1000,
                category: 'Accessory',
                itemName: 'Diamond Cat collar'
              },
            ]
          }
        });
        r();
      }, API_DURATION)
    })
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
      }, API_DURATION);
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
      }, API_DURATION);
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
