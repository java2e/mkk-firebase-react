import logo from './logo.svg';
import './App.css';
import Login from './firebaseAuth/Login';
import 'primeflex/primeflex.css'; 
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Index from './firebaseStore/Index';
import Data from './firebaseStore/Data';

function App() {
  return (
    <div className="App">
   <Data />
    </div>
  );
}

export default App;
