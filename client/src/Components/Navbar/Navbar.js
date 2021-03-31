import { Component } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';


/**
 * Ce composant gère la navbar affichée avec
 * ses différents liens
 */

export default class Navbar extends Component {

    #parts = [];

    constructor(props) {
        super();
        this.configure(props.parts);
    }

    configure(parts) {
        for(let i of parts) {
            if (parts[0] === i)
                this.#parts.push(<Link to="/" key={i}><li>{i}</li></Link>);
            else
                this.#parts.push(<Link to={"/" + i} key={i}><li>{i}</li></Link>);
        }
    }

    render() {
        return(
            <nav className="Navbar"><ul>{this.#parts}</ul></nav>
        )
    }
};