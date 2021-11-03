import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import MemberCenter from "./pages/MemberCenter/MemberCenter";
import ShoppingCart from "./pages/ShoppingCart/shopping-cart/ShoppingCart";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
      <Route path="/" exact>
        </Route>
        <Route path="/ShoppingCart" exact>
          <ShoppingCart/>
        </Route>
        <Route path="/memberCenter" exact>
          <MemberCenter />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
