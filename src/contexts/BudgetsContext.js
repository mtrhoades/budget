import React, { useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export const useBudgets = () => {
    return useContext(BudgetsContext)
}
// ^ this line of code is exported as a function called, useBudgets, and is to use this entire context file of BudgetsContext.js, as it was created a useContext file on line 7 with React.createContext()

export const BudgetsProvider = ( { children } ) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);

    const getBudgetExpenses = (budgetId) => {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    const addExpense = ({ description, amount, budgetId }) => {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
        })
    }

    const addBudget = ({ name, max }) => {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }

    const deleteExpense = ( { id } ) => {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    const deleteBudget = ( { id } ) => {
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }


        return (
            <BudgetsContext.Provider value={{
                budgets,
                expenses,
                getBudgetExpenses,
                addExpense,
                addBudget,
                deleteExpense,
                deleteBudget
            }}>{children}</BudgetsContext.Provider>
        )
}
