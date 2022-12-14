import logo from './logo.svg';
import './App.css';
import Login from './firebaseAuth/Login';
import 'primeflex/primeflex.css'; 
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Data from './firebaseStore/Data';
import Index from './firebaseDatabase/Index';
import FileIO from './firebaseStorage/FileIO';

function App() {
  return (
    <div className="App">
      <FileIO />
    </div>
  );
}

export default App;
