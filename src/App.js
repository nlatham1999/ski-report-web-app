import logo from './logo.svg';
import './App.css';
import MountainDetails from './MountainDetails';
import { NavLink, Switch, Route, BrowserRouter } from 'react-router-dom';
import './MountainDetails';

const App = () => {

  const mtnNames = mountainNames();
  
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={MainPage}></Route>
          {mtnNames.map((mtn, i) => (
            <Route exact path={"/"+mtn["name"]} component={props => <MountainDetails mountainName={mtn["name"]}/>}></Route>
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
    {"name": "lookout", "lat": 0, "lng": 0},
    {"name": "schweitzer", "lat": 0, "lng": 0},
    {"name": "silver_mountain", "lat": 0, "lng": 0},
  ]
}



export default App;
