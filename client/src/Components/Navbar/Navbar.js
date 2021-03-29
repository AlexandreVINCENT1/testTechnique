import {Components} from "react";
import './Navbar.css';

export default class Navbar extends Components {

    #parts = []
    constructor(props) {
        super(props);
        this.#configure();
    }

    #configure(parts) {
        for(let i in parts)
            this.#parts.push(<li>i</li>);
    }

    render() {
        return(
            <nav className="Navbar"><ul>{this.#parts}</ul></nav>
        )
    }
};