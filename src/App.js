import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Productdetails from './components/Productlist/Productlist';
import Functionalprod from './components/product/product';
import Navbar from './components/navbar/navbar'
import { Route, Switch } from 'react-router';

function App() {
  return (
    <div className="container">
      <Navbar />        
      <Switch>
       <Route path="/" >
       <Productdetails />
       </Route>
       </Switch>
      
    
    </div>
    
  );
}

export default App;
