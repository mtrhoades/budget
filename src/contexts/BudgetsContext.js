import React, { useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetsContext = React.createContext()

export const useBudgets = () => {
    return useContext({ BudgetsContext })
}

// budget:
// {
//     id:
//     name:
//     max:
// }

// expense:

//     id:
//     budgetId:
//     amount:
//     description:
// }

export const BudgetsProvider = ( { children } ) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);

    const getBugetExpenses = (budgetId) => {
        return expenses.filter(expense => expense.id === budgetId)
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
                getBugetExpenses,
                addExpense,
                addBudget,
                deleteExpense,
                deleteBudget
            }}>{children}</BudgetsContext.Provider>
        )
}
