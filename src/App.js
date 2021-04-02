import logo from './logo.svg';
import './App.css';
import MountainDetails from './MountainDetails';
import { NavLink, Switch, Route, BrowserRouter } from 'react-router-dom';
import axios from "axios";
import './MountainDetails';

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

const MainPage = () => {
  return (
    <div>
      Main Page
    </div>
  );
}

function mountainNames () {
  return [
    {"name": "lookout", "lat": 47.45611828584227, "lng": -115.69710169853091},
    {"name": "schweitzer", "lat": 48.36820376316482, "lng": -116.62277628870922},
    {"name": "silver_mountain", "lat": 47.49906915722505, "lng": -116.11885721016526},
  ]
}



export default App;
