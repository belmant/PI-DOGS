import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage"
import Home from "./components/Home/Home"
// import DogCreate from "./components/DogCreate"
// import Detail from "./components/Detail"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component={LandingPage}/>
        <Route path = '/home' component={Home}/>
        {/* <Route path = '/dog' component={DogCreate}/>
        <Route path = '/dogs/:id' component ={Detail}/> */}
      </Switch>
      <h1> </h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
