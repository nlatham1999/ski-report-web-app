import logo from './logo.svg';
import './App.css';
import MountainDetails from './MountainDetails';
import { NavLink, Switch, Route, BrowserRouter } from 'react-router-dom';
import axios from "axios";
import MainPage from './MainPage';
import mountainNames from './MountainNames';

const App = () => {

  const mtnNames = mountainNames();
  
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={MainPage}></Route>
          {mtnNames.map((mtn, i) => (
            <Route exact path={"/"+mtn["name"]} component={props => <MountainDetails mountain={mtn}/>}></Route>
          ))}
        </Switch>
      </BrowserRouter>
  );
}

export default App;
