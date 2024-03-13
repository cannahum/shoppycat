import React from "react";

import CatExpense from "@/app/types/CatExpense";
import OperationStatus from "@/app/types/operationStatus";

export type CatExpenseStoreType = {
  expenses: CatExpense[];
  addExpenseStatus: OperationStatus;
  addExpenseErrorMessage: string | null;
  deleteExpenseStatus: OperationStatus;
  expenseBeingDeleted: CatExpense | null;
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
  | { type: "deleteRequested"; payload: { expense: CatExpense } }
  | { type: "deleteSuccess" }
  | { type: "deleteError"; payload: { errorMessage: string } };

export function initialState(): CatExpenseStoreType {
  return {
    expenses: [],
    addExpenseStatus: "success",
    addExpenseErrorMessage: null,
    deleteExpenseStatus: "success",
    expenseBeingDeleted: null,
    deleteExpenseErrorMessage: null,
    fetchExpenseStatus: "success",
    fetchExpenseErrorMessage: null,
  };
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
      return {
        ...state,
        addExpenseStatus: "success",
        expenses: [...state.expenses, action.payload.expense],
      };
    case "addError":
      return {
        ...state,
        addExpenseStatus: "error",
        addExpenseErrorMessage: action.payload.errorMessage,
      };
    case "deleteRequested":
      return {
        ...state,
        deleteExpenseStatus: "loading",
        expenseBeingDeleted: action.payload.expense,
        deleteExpenseErrorMessage: null,
      };
    case "deleteSuccess":
      const newExpenses = [...state.expenses];
      const ebd = state.expenseBeingDeleted!;
      const indexOfExpenseBeingDeleted = newExpenses.findIndex(
        (e: CatExpense): boolean =>
          e.amount === ebd.amount &&
          e.category === ebd.category &&
          e.itemName === ebd.itemName,
      );
      if (indexOfExpenseBeingDeleted === -1) return state;
      return {
        ...state,
        deleteExpenseStatus: "success",
        expenseBeingDeleted: null,
        expenses: [
          ...newExpenses.slice(0, indexOfExpenseBeingDeleted),
          ...newExpenses.slice(indexOfExpenseBeingDeleted + 1),
        ],
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
