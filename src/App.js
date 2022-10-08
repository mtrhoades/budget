// imports and dependencies
import './App.css';
import Container from 'react-bootstrap/Container'
import { Stack, Button } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import AddBudgetModal from './components/AddBudgetModal';

// functional component
function App() {
// vanilla js section


// jsx section
  return (
    <div>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Ariel & Matt's Budget</h1>
          <Button variant="primary">Add Budget</Button>
          <Button variant="outline-primary">Add Expense</Button>
        </Stack>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start"
          }}>

          <BudgetCard
            name="Entertainment"
            amount={200}
            max={1000}
            gray
          />

        </div>

      </Container>
      <AddBudgetModal show />
    </div>
  );
}

// export functional component
export default App;
