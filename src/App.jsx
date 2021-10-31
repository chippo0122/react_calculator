
import Panel from './components/Panel'
import Background from './components/Background'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Background />
      <div className="container h-100 d-flex align-items-center">
        <Panel />
      </div>
    </div>
  );
}

export default App;
