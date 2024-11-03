import Todos from './components/Todos.js';
import Card from './components/Card.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Card>
        <Todos />
      </Card>
    </div>
  );
}

export default App;
