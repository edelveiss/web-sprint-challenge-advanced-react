import React, { useState } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { usePinkMode } from "./hooks/usePinkMode";
import PlantList from "./components/PlantList";
import ShoppingCart from "./components/ShoppingCart";
import CheckoutForm from "./components/CheckoutForm";

import "./App.css";

function App() {
  // array of plants that have been added to the cart
  const [cart, setCart] = useState([]);
  const [text, setText] = useState("");
  const [pinkMode, setPinkMode] = usePinkMode(false);

  const toggleMode = (e) => {
    e.preventDefault();
    setPinkMode(!pinkMode);
  };

  // add a plant to the cart
  const addToCart = (plant) => {
    setCart([...cart, plant]);
  };

  // remove a plant from the cart
  const removeFromCart = (plant) => {
    setCart(cart.filter((p) => p.id !== plant.id));
  };
  const handleTextChanges = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <Router>
        <nav className="container">
          <div className="dark-mode__toggle">
            <div
              onClick={toggleMode}
              className={pinkMode ? "toggle toggled" : "toggle"}
            />
          </div>

          <h1>
            React Plants <span role="img">🌿</span>
          </h1>
          <div>
            <input
              id="searchInput"
              style={{ width: " 100%", height: "2.5rem", fontSize: "1rem" }}
              type="text"
              placeholder="Search by plant name"
              value={text}
              onChange={handleTextChanges}
              name="text"
            ></input>
          </div>

          <ul className="steps">
            <li>
              <NavLink exact to="/">
                Plants
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                Cart
                <span className="cart-badge">
                  {cart.length > 0 && cart.length}
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Route
          exact
          path="/"
          render={() => (
            <PlantList
              addToCart={addToCart}
              text={text}
              handleChanges={handleTextChanges}
            />
          )}
        />
        <Route
          path="/cart"
          render={(props) => (
            <ShoppingCart
              {...props}
              cart={cart}
              removeFromCart={removeFromCart}
            />
          )}
        />
        <Route path="/checkout" component={CheckoutForm} />
      </Router>
    </div>
  );
}

export default App;
