import React from "react";

import { CatExpense, Category } from "@/app/types/CatExpense";
import OperationStatus from "@/app/types/operationStatus";

export type CatExpenseStoreType = {
  expenses: CatExpense[];
  winningCategories: Category[];
  addExpenseStatus: OperationStatus;
  addExpenseErrorMessage: string | null;
  deleteExpenseStatus: OperationStatus;
  expensesMarkedForDeletion: Set<string>;
  deleteExpenseErrorMessage: string | null;
  fetchExpenseStatus: OperationStatus;
  fetchExpenseErrorMessage: string | null;
};

export type CatExpenseActionCreatorType =
  | { type: "fetchRequested" }
  | { type: "fetchSuccess"; payload: { expenses: CatExpense[] } }
  | { type: "fetchError"; payload: { errorMessage: string } }
  | { type: "addRequested" }
  | { type: "addSuccess"; payload: { expense: CatExpense } }
  | { type: "addError"; payload: { errorMessage: string } }
  | { type: "markForDeletion"; payload: { id: string } }
  | { type: "unmarkForDeletion"; payload: { id: string } }
  | { type: "deleteRequested" }
  | { type: "deleteSuccess" }
  | { type: "deleteError"; payload: { errorMessage: string } };

export function initialState(): CatExpenseStoreType {
  return {
    expenses: [],
    winningCategories: [],
    addExpenseStatus: "success",
    addExpenseErrorMessage: null,
    deleteExpenseStatus: "success",
    expensesMarkedForDeletion: new Set(),
    deleteExpenseErrorMessage: null,
    fetchExpenseStatus: "success",
    fetchExpenseErrorMessage: null,
  };
}

function calculateWinningCategory(expenses: CatExpense[]): Category[] {
  if (expenses.length === 0) return [];
  const tally = {
    Food: 0,
    Accessory: 0,
    Furniture: 0,
  };
  for (const exp of expenses) {
    tally[exp.category] += exp.amount;
  }
  const numberToCategories: Record<number, Category[]> = {};
  for (const [cat, amount] of Object.entries(tally)) {
    const current = numberToCategories[amount];
    if (!current) {
      numberToCategories[amount] = [];
    }
    numberToCategories[amount].push(cat as Category);
  }
  return Object.entries(numberToCategories).sort(
    ([amountA], [amountB]): number => {
      return parseFloat(amountB) - parseFloat(amountA);
    },
  )[0][1];
}

const catExpenseReducer: React.Reducer<
  CatExpenseStoreType,
  CatExpenseActionCreatorType
> = function catExpenseReducer(
  state,
  action: CatExpenseActionCreatorType,
): CatExpenseStoreType {
  switch (action.type) {
    case "fetchRequested":
      return {
        ...state,
        fetchExpenseStatus: "loading",
        fetchExpenseErrorMessage: null,
      };
    case "fetchSuccess":
      return {
        ...state,
        fetchExpenseStatus: "success",
        expenses: action.payload.expenses,
        winningCategories: calculateWinningCategory(action.payload.expenses),
      };
    case "fetchError":
      return {
        ...state,
        fetchExpenseStatus: "error",
        fetchExpenseErrorMessage: action.payload.errorMessage,
      };
    case "addRequested":
      return {
        ...state,
        addExpenseStatus: "loading",
        addExpenseErrorMessage: null,
      };
    case "addSuccess":
      const postAdd = [...state.expenses, action.payload.expense];
      return {
        ...state,
        addExpenseStatus: "success",
        expenses: postAdd,
        winningCategories: calculateWinningCategory(postAdd),
      };
    case "addError":
      return {
        ...state,
        addExpenseStatus: "error",
        addExpenseErrorMessage: action.payload.errorMessage,
      };
    case "markForDeletion": {
      const id = action.payload.id;
      if (
        state.deleteExpenseStatus === "loading" ||
        state.expenses.find((e) => e.id === id) === undefined
      ) {
        return state;
      }
      const s = new Set(Array.from(state.expensesMarkedForDeletion));
      s.add(id);
      return {
        ...state,
        expensesMarkedForDeletion: s,
      };
    }
    case "unmarkForDeletion": {
      const id = action.payload.id;
      if (
        state.deleteExpenseStatus === "loading" ||
        state.expenses.find((e) => e.id === action.payload.id) === undefined ||
        !state.expensesMarkedForDeletion.has(id)
      ) {
        return state;
      }
      const s = new Set(Array.from(state.expensesMarkedForDeletion));
      s.delete(id);
      return {
        ...state,
        expensesMarkedForDeletion: s,
      };
    }
    case "deleteRequested":
      return {
        ...state,
        deleteExpenseStatus: "loading",
        deleteExpenseErrorMessage: null,
      };
    case "deleteSuccess":
      const newExpenses = [];
      for (const expense of state.expenses) {
        if (state.expensesMarkedForDeletion.has(expense.id)) {
          continue;
        }
        newExpenses.push(expense);
      }
      return {
        ...state,
        deleteExpenseStatus: "success",
        expensesMarkedForDeletion: new Set(),
        expenses: newExpenses,
        winningCategories: calculateWinningCategory(newExpenses),
      };
    case "deleteError":
      return {
        ...state,
        deleteExpenseStatus: "error",
        deleteExpenseErrorMessage: action.payload!.errorMessage,
      };
    default:
      return state;
  }
};

export default catExpenseReducer;
