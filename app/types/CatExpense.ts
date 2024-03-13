type Category = "Food" | "Furniture" | "Accessory";

export type CatExpenseCreateParameters = {
  itemName: string;
  category: Category;
  amount: number;
};

export type CatExpense = CatExpenseCreateParameters & {
  id: string;
};
