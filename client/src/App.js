import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import MemberCenter from "./pages/MemberCenter/MemberCenter";
import DefaultStudentCard from "./components/DefaultStudentCard";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <h1>home</h1>
          <DefaultStudentCard />
        </Route>
        <Route path="/memberCenter" exact>
          <MemberCenter />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
