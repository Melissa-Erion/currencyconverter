import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Converter from "./components/Converter";
import Footer from "./components/Footer";

// Import CSS files for styling
import "./App.css";
import "./css/Header.css";
import "./css/Converter.css";
import "./css/Currencyinfo.css";
import "./css/Footer.css";

const App = () => {
  return (
    <Router basename="/currencyconverterapp">
      <div>
        <Header />
        <Route path="/" exact component={Home} />
        <Footer />
      </div>
    </Router>
  );
};

const Home = () => (
  <div>
    <h2 className="heading">Currency Converter</h2>

    <Converter />
  </div>
);

export default App;
