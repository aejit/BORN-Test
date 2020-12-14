// import logo from './logo.svg';
import './App.css';
import  Homepage  from './component/homepage';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
  <div>
    <Router>
    <Route exact path="/" component={Homepage} />
    </Router>
  </div>

  );
}

export default App;
