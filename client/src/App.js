import { Component } from "react";
import { BrowserRouter as Router, Switch,Route} from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Pages/Home";
import Book from "./Components/Pages/Book";
import PageNotFound from "./Components/Pages/404";


/**
 * Ce composant correspond à l'application web elle-même
 */

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Router>
                <div className="App">
                    <div className="bg">
                        <Navbar parts={["Home", "Book"]}/>
                        <div className="shape">
                          <svg viewBox="0 0 500 100" preserveAspectRatio="none" style={{height: "100%", width: "100%"}}>
                              <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{stroke: "none", fill: "#f1f2f6"}}></path>
                          </svg>
                        </div>
                    </div>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/book" exact component={Book}/>
                        <Route component={PageNotFound}/>
                    </Switch>
                </div>
            </Router>
        )
    }
};