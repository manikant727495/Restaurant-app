import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./component/Home";
import RestaurantState from "./component/Context/Restaurants/RestaurantState";

function App() {
  return (
    <RestaurantState>
        <Router>
            <Routes>
                <Route path = "/" element = {<Home/>} />
            </Routes>
        </Router>
      </RestaurantState>
  );
}

export default App;
