// imports and dependencies
import './App.css';
import Container from 'react-bootstrap/Container'
import { Stack, Button } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import { useState } from 'react';
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from './contexts/BudgetsContext'

// functional component
function App() {
// vanilla js section
const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

const { budgets, getBudgetExpenses } = useBudgets();

const openAddExpenseModal = (budgetId) => {
  setShowAddExpenseModal(true)
  setAddExpenseModalBudgetId(budgetId)
}

// jsx section
  return (
    <div>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Ariel & Matt's Budget</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
            gap: "2rem",
            alignItems: "flex-start"
          }}>

          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total,  expense) => total + expense.amount, 0)
            
            return (
              <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            />
            )
          })}
        </div>

      </Container>

      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />

      <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={() => setShowAddExpenseModal(false)} />

    </div>
  );
}

// export functional component
export default App;
