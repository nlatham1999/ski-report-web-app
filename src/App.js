import logo from './logo.svg';
import './App.css';
import MountainDetails from './MountainDetails';
import { NavLink, Switch, Route, BrowserRouter } from 'react-router-dom';
import axios from "axios";
import MainPage from './MainPage';
import mountainNames from './MountainNames';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const mtnNames = mountainNames();
  
  return (
      <BrowserRouter>
        <Switch>
          <div style={{backgroundColor: "#e0e0e0"}}>
            <Route exact path='/' component={MainPage}></Route>
            {mtnNames.map((mtn, i) => (
              <Route exact path={"/"+mtn["name"]} component={props => <MountainDetails mountain={mtn}/>}></Route>
            ))}
          </div>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
