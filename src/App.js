import './App.css';
import MountainDetails from './MountainDetails';
import {Switch, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './MainPage';
import mountainNames from './MountainNames';
import hikingTripNames from './HikingTripNames';
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {

  const mtnNames = mountainNames();
  const hikingNames = hikingTripNames();
  
  return (
      <BrowserRouter>
        <Switch>
          <div >
            <Route exact path='/' component={props => <MainPage mountainNames={mountainNames} includeHeaders={true} title={""}/>}></Route>
            <Route exact path='/mt_adams_trip' component={props => <MainPage mountainNames={hikingTripNames} includeHeaders={false} title={"Mt Adams Trip"}/>}></Route>
            {mtnNames.map((mtn, i) => (
              <Route exact path={"/"+mtn["name"]} component={props => <MountainDetails mountain={mtn} backLink={"/"}/>}></Route>
            ))}
            {hikingNames.map((mtn, i) => (
              <Route exact path={"/"+mtn["name"]} component={props => <MountainDetails mountain={mtn} backLink={"/mt_adams_trip"}/>}></Route>
            ))}
          </div>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
