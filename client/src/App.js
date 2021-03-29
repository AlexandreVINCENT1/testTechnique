import {Components} from "react";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";

export default class App extends Components {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div className="App"><Navbar parts={["home", "notification"]} /></div>
        )
    }
};