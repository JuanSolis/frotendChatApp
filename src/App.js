import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from './components/Login';
import Lobby from './components/Lobby';



function App() {
  return (
  <Router>
    <Switch>
      <Route exact path="/">
        <Login/>
      </Route>
      
      <Route path="/lobby">
      
        <Lobby/>

      </Route>
     
    </Switch>
    
  </Router>
  );
}

export default App;
