import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import MemberCenter from "./pages/MemberCenter/MemberCenter";
import Login from "./components/member/Login";
import ShoppingCart from "./pages/ShoppingCart/shopping-cart/ShoppingCart";
import ShoppingList from "./pages/ShoppingCart/ShoppingList/ShoppingList";

// 測試元件區
import DefaultStudentCard from "./components/DefaultStudentCard";
import StarGroup from "./components/StarGroup";

function App() {
  let [showLogin, setShowLogin] = useState(false);

  // 開啟Login Container
  const handleLoginClick = (e) => {
    e.stopPropagation();
    setShowLogin(true);
  };

  // 點擊任意處關閉login container
  useEffect(() => {
    window.addEventListener("click", (e) => {
      setShowLogin(false);
    });
  }, []);

  return (
    <Router>
      <Navbar handleLoginClick={handleLoginClick} />
      {showLogin && <Login />}
      <Switch>
        <Route path="/" exact>
          <h1>home Test</h1>
          <DefaultStudentCard />
          <StarGroup percent={96} allScore={50} />
        </Route>
        <Route path="/ShoppingCart" exact>
          <ShoppingCart/>
        </Route>
        <Route path="/memberCenter" exact>
          <MemberCenter />
        </Route>
        <Route path="/ShoppingList" exact>
          <ShoppingList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
