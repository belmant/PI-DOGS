import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage"
import Home from "./components/Home/Home"
import Detail from "./components/Detail/Detail"
import DogCreate from "./components/DogCreate/DogCreate"

// import Detail from "./components/Detail"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component={LandingPage}/>
        <Route exact path = '/home' component={Home}/>
        <Route exact path = '/dogs/:id' component ={Detail}/>
        <Route exact path = '/dogs' component ={DogCreate}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
