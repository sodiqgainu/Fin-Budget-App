import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBudgetStore = create(
  persist(
  (set) =>({

    // GLOBAL VARIABLES

     budget: 1500,
description: "",
amount: "",
category: "Food",
expenses: [],
errors: {},

// ACTIONS

  setCategory : (newCat) => set({category : newCat}),
  setErrors : (newErrors) => set({errors : newErrors}),
  changeBudget : (newBudget) => set({budget: newBudget}),
  setDescription: (text) => set({ description: text }),
setAmount: (num) => set({ amount: num }),

  handleDelete : (delId) => set((state) => ({
    expenses : state.expenses.filter((item) =>  item.id !== delId)
  })),

    addExpense: () => set((state) => {
    let validatorError = {};


    // Checks the store's own active variable states directly
    if (!state.description.trim()) {
      validatorError.description = 'Please provide a description';
    }
    if (!state.amount || parseFloat(state.amount) <= 0) {
      validatorError.amount = 'Please enter a valid cost';
    }

     if(!state.category){
        validatorError.category = "Please choose a category"
    }


    if (Object.keys(validatorError).length > 0) {
      return { errors: validatorError };
    }

   
      const newExpense = {
      id: Date.now(),
      name: state.description,
      cost: parseFloat(state.amount),
      category: state.category,
      dates: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    return {
      expenses: [newExpense, ...state.expenses],
      errors: {},       // Clears the error log on success
      description: "",  // Instantly blanks out the text field state
      amount: ""        // Instantly blanks out the number field state
    };
  })

}),

{
   name: "simple-budget-storage", 
}
)

) 
